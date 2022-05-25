import React, { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    ScrollView,
    Alert,
} from "react-native"

import { THEME } from "../theme"
import { removePost, toggleBooked } from "../store/actions/post"

export const PostScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const postId = route.params.postId

    const post = useSelector((state) =>
        state.post.allPosts.find((p) => p.id === postId)
    )

    //? динамічно передаємо значення стейту в нашу сторінку
    const booked = useSelector((state) =>
        state.post.bookedPosts.some((post) => post.id === postId)
    )

    useEffect(() => {
        navigation.navigate("Post", { ...route.params, booked })
    }, [booked])

    //! для того щоб
    //? щоб useEffect не одразу викликав діспатч, ми переміщаємо його в нову функцію
    //? Для того, щоб не зациклювати програму ми нашу функцію поміщаємо в useCallback який спрацьовуватиме лише при зміні вказаних параметрів і перевикликатиме нашу функцію із оновленими параметрами (якщо цю функцію не огорнути в хук і передати в вигляді залежності useEffect - програма зациклиться, так як useEffect викликається на старті 2 рази)
    const toggleHandler = useCallback(() => {
        dispatch(toggleBooked(post))
    }, [dispatch, post])

    //? при виклику toggleNavigation - він змінюватиметься і відповідно спрацьовуватиме useEffect, що викличе зациклення, щоб цього уникнути ми огонемо функцію в useCallback, що не дозволятиме їй зайвий раз змінбватись при рендері і трігирити useEffect, викличиться 1 раз
    useEffect(() => {
        navigation.navigate("Post", { ...route.params, toggleHandler })
    }, [toggleHandler])

    const removeHandler = () => {
        Alert.alert(
            "Удаление поста",
            "Вы точно хотите удалить пост?",
            [
                {
                    text: "Отменить",
                    style: "cancel",
                },
                {
                    text: "Удалить",
                    style: "destructive",
                    onPress: () => {
                        navigation.navigate("Main")
                        dispatch(removePost(postId))
                    },
                },
            ],
            { cancelable: false }
        )
    }

    if (!post) {
        return null
    }

    return (
        <ScrollView>
            <Image source={{ uri: post.img }} style={styles.image} />
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text}</Text>
            </View>
            <Button
                title="Удалить"
                color={THEME.DANGER_COLOR}
                onPress={removeHandler}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200,
    },
    textWrap: {
        padding: 10,
    },
    title: {
        fontFamily: "open-regular",
    },
})
