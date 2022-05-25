import React, { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Button,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native"
import { THEME } from "../theme"
import { addPost } from "../store/actions/post"
import { PhotoPicker } from "../components/PhotoPicker"

export const CreateScreen = ({ navigation }) => {
    const [text, setText] = useState("")
    const dispatch = useDispatch()
    const imgRef = useRef() //? локальний стейт, не викликаючий ререндер

    const createSaveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text: text,
            img: imgRef.current,
            booked: false,
        }
        dispatch(addPost(post))
        setText("")
        imgRef.current = null
        navigation.navigate("Main")
    }

    const photoPickHandler = (uri) => {
        imgRef.current = uri
    }

    return (
        <ScrollView style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <>
                    <Text style={styles.title}>Create new post</Text>
                    <TextInput
                        style={styles.textarea}
                        placeholder="Enter post text"
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <PhotoPicker onPick={photoPickHandler} />
                    <Button
                        title="Create"
                        color={THEME.MAIN_COLOR}
                        onPress={createSaveHandler}
                        disabled={!text}
                    />
                </>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "open-regular",
        marginVertical: 10,
    },
    textarea: {
        padding: 10,
        marginBottom: 10,
    },
})
