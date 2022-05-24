import React, { useState } from "react"
import AppLoading from "expo-app-loading"
import { bootstrap } from "./src/bootstrap" //? підгрузка шрифтів
import MyStack from "./src/navigation/AppNavigation"

export default function App() {
    const [isReady, setIsReady] = useState(false)

    //? асинхронна загрузка ресурсів для нашого додатку (шрифтів)
    if (!isReady) {
        return (
            <AppLoading
                startAsync={bootstrap}
                onFinish={() => setIsReady(true)}
                onError={(error) => console.log(error)}
            />
        )
    }

    return <MyStack />
}
