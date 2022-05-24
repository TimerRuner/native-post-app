import "react-native-gesture-handler"

import React from "react"
import { THEME } from "../theme"
import { Platform } from "react-native"
import { MainScreen } from "../screens/MainScreen"
import { PostScreen } from "../screens/PostScreen"
import { BookedScreen } from "../screens/BookedScreen"
import { AboutScreen } from "../screens/AboutScreen"
import { CreateScreen } from "../screens/CreateScreen"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { Ionicons } from "@expo/vector-icons"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { createDrawerNavigator } from "@react-navigation/drawer"

import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Drawer } from "react-native-paper"

const StackPost = createStackNavigator()

const PostNavigator = () => {
    return (
        <StackPost.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor:
                        Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
                },
                headerTintColor:
                    Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
            }}
        >
            <StackPost.Screen
                name="Main"
                component={MainScreen}
                options={({ route, navigation }) => ({
                    headerTitle: "Blog",
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Take photo"
                                iconName="ios-camera"
                                onPress={() => console.log("Press photo")}
                            />
                        </HeaderButtons>
                    ),
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Toggle Drawer"
                                iconName="ios-menu"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        </HeaderButtons>
                    ),
                })}
            />
            <StackPost.Screen
                name="Post"
                component={PostScreen}
                options={({ route }) => ({
                    headerTitle:
                        "Пост от " +
                        new Date(route.params.date).toLocaleDateString(),
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Take photo"
                                iconName={
                                    route.params.booked
                                        ? "ios-star"
                                        : "ios-star-outline"
                                }
                                onPress={() => console.log("Press photo")}
                            />
                        </HeaderButtons>
                    ),
                })}
            />
        </StackPost.Navigator>
    )
}

const StackBooked = createStackNavigator()

const BookedNavigator = () => {
    return (
        <StackBooked.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor:
                        Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
                },
                headerTintColor:
                    Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
            }}
        >
            <StackBooked.Screen
                name="Booked"
                component={BookedScreen}
                options={({ route, navigation }) => ({
                    headerTitle: "Booked",
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Toggle Drawer"
                                iconName="ios-menu"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        </HeaderButtons>
                    ),
                })}
            />
            <StackBooked.Screen
                name="Post"
                component={PostScreen}
                options={({ route }) => ({
                    headerTitle:
                        "Пост от " +
                        new Date(route.params.date).toLocaleDateString(),
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Take photo"
                                iconName={
                                    route.params.booked
                                        ? "ios-star"
                                        : "ios-star-outline"
                                }
                                onPress={() => console.log("Press photo")}
                            />
                        </HeaderButtons>
                    ),
                })}
            />
        </StackBooked.Navigator>
    )
}

const MyStack = () => {
    const IosTab = createBottomTabNavigator()
    const MaterialTab = createMaterialBottomTabNavigator()
    const Drawer = createDrawerNavigator()

    //? Виведення Footer в залежності від платформи

    const TabIos = () => {
        return (
            <IosTab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: THEME.MAIN_COLOR,
                }}
            >
                <IosTab.Screen
                    name="Post"
                    component={PostNavigator}
                    options={{
                        tabBarLabel: "All",
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name="ios-albums"
                                size={25}
                                color={focused ? THEME.MAIN_COLOR : "#eee"}
                            />
                        ),
                    }}
                />
                <IosTab.Screen
                    name="Booked"
                    component={BookedNavigator}
                    options={{
                        tabBarLabel: "Booked",
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name={focused ? "ios-star" : "ios-star-outline"}
                                size={25}
                                color={focused ? THEME.MAIN_COLOR : "#eee"}
                            />
                        ),
                    }}
                />
            </IosTab.Navigator>
        )
    }
    const TabMaterial = () => {
        return (
            <MaterialTab.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                activeColor={"#fff"}
                inactiveColor={"grey"}
                shifting={true}
                barStyle={{
                    backgroundColor: THEME.MAIN_COLOR,
                }}
            >
                <MaterialTab.Screen
                    name="Post"
                    component={PostNavigator}
                    options={{
                        tabBarLabel: "All",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name="ios-albums"
                                size={25}
                                color={color}
                            />
                        ),
                    }}
                />
                <MaterialTab.Screen
                    name="Booked"
                    component={BookedNavigator}
                    options={{
                        tabBarLabel: "Booked",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name={focused ? "ios-star" : "ios-star-outline"}
                                size={25}
                                color={color}
                            />
                        ),
                    }}
                />
            </MaterialTab.Navigator>
        )
    }

    const isAndroid = Platform.OS === "android"
    const Tab = isAndroid ? TabMaterial : TabIos

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="PostTabs"
                screenOptions={{ headerShown: false }}
            >
                <Drawer.Screen name="PostTabs" component={Tab} />
                <Drawer.Screen name="About" component={AboutScreen} />
                <Drawer.Screen name="Create" component={CreateScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
export default MyStack
