import React from 'react'
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'
import SearchScreen from '../screens/Search';

const Stack = createSharedElementStackNavigator();

const SearchNavigatior = () => {
  return ( <Stack.Navigator>
    <Stack.Screen name="SearchScreen" component={SearchScreen}
    options={{
        headerShown:false,
        useNativeDriver: true,
        gestureEnabled:false
    }}
    />
  </Stack.Navigator>
   
  )
}

export default SearchNavigatior