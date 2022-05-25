import React, { useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { View, StyleSheet, Image, Button } from "react-native"

export const PhotoPicker = ({ onPick }) => {
    const [image, setImage] = useState(null)

    const takePhoto = async () => {
        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [16, 9],
        })

        setImage(img.uri)
        onPick(img.uri)
    }

    return (
        <View style={styles.wrapper}>
            <Button title="Made photo" onPress={takePhoto} />
            {image && <Image style={styles.image} source={{ uri: image }} />}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: 200,
        marginTop: 10,
    },
})
