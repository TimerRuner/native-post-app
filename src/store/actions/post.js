import * as FileSystem from "expo-file-system"

import { DB } from "../../db"
import { ADD_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED } from "../types"

export const loadPosts = () => {
    return async (dispatch) => {
        const posts = await DB.getPosts()
        dispatch({
            type: LOAD_POSTS,
            payload: posts,
        })
    }
}

export const toggleBooked = (post) => async (dispatch) => {
    await DB.updatePost(post)

    dispatch({
        type: TOGGLE_BOOKED,
        payload: post.id,
    })
}

export const removePost = (id) => async (dispatch) => {
    await DB.removePost(id)
    dispatch({
        type: REMOVE_POST,
        payload: id,
    })
}

export const addPost = (post) => async (dispatch) => {
    //? Переносимо картинку із тимчасового сховища в сховище на телефоні
    const fileName = post.img.split("/").pop()
    const newPath = FileSystem.documentDirectory + fileName

    try {
        await FileSystem.moveAsync({
            to: newPath,
            from: post.img,
        })
    } catch (error) {
        console.log(error)
    }

    const payload = {
        ...post,
        img: newPath,
    }

    //? передаємо пост в базу даних і отримуємо id
    const id = await DB.createPost(payload)

    payload.id = id

    dispatch({
        type: ADD_POST,
        payload,
    })
}
