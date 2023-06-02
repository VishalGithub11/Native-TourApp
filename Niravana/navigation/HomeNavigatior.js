import React from 'react'
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'
import HomeScreen from '../screens/Home';

const Stack = createSharedElementStackNavigator();

const HomeNavigatior = () => {
  return ( 
  <Stack.Navigator>
    <Stack.Screen
    name="HomeScreen" 
    component={HomeScreen}
    options={{
        headerShown:false,
        useNativeDriver: true,
        gestureEnabled:false
    }}
    />
  </Stack.Navigator>
   
  )
}

export default HomeNavigatior