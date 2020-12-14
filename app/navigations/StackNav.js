import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import React from 'react'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Emergency from '../screens/Emergency'


export default function StackNav() {

    const mainScreen = createStackNavigator({
        Login,
        Register,
        Emergency
    }, {
        initialRouteName: "Login",
        detachPreviousScreen: true,
        detachInactiveScreens: true,
        headerMode: 'none'
    })

    const AppContainer = createAppContainer(mainScreen)

    return <AppContainer />
}




