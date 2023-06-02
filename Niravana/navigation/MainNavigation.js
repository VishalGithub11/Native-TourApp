import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import TripDetailScreen from "../screens/TripDetailScreen";
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'
import { Animated } from "react-native/types";


const MainNavigator =()=>{
    // const Stack = createNativeStackNavigator(); 
    const Stack = createSharedElementStackNavigator()
    return ( <NavigationContainer >
        <Stack.Navigator>
        <Stack.Screen  options={{headerShown:false, useNativeDriver:true, gestureEnabled:false}} name="Root" component={TabNavigation} />
        <Stack.Screen name="TripDetails" component={TripDetailScreen}
         options={{
            headerShown:false,
            useNativeDriver: true,
            gestureEnabled:false,
            cardStyleInterpolator:({current:{progress}})=>({
                cardStyle:{
                    opacity:progress
                }
            })
            
        }} />
        </Stack.Navigator>
    </NavigationContainer>

    )
}

export default MainNavigator