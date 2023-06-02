import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavouriteScreen from '../screens/Favourite';
import SearchScreen from '../screens/Search';
import Icons from '../components/shared/Icon';
import { colors } from '../constants/theme';
import HomeNavigatior from './HomeNavigatior';
import SearchNavigatior from './SearchNavigator';
import FavoriteNavigatior from './FavoriteNavigator';


const TabNavigation = () => {
    const Tab = createBottomTabNavigator();  

    const tabs = [
        {
            name: "Home",
            icon:'home',
            screen: HomeNavigatior
        },
        {
            name: "Search",
            icon:'search',
            screen: SearchNavigatior
        },
        {
            name: "Favorite",
            icon: 'heart-outline',
            screen: FavoriteNavigatior
        }
    ]


  return (
    <Tab.Navigator 
    initialRouteName='Home'
    screenOptions={{
        headerShown:false,
        tabBarShowLabel:false
    }}  
    >
        {tabs.map(({name, screen, icon})=>(
             <Tab.Screen
             name={name}
             key={name}
             options={{
                tabBarIcon:({focused})=>{
                    return (
                       <Icons icon={icon} size={22} color={focused? "#526D82":"#9DB2BF"} />
                    )
                },
                unmountOnBlur:true
                
            }}
            component={screen} />
        ))}
    </Tab.Navigator>
  )
}

export default TabNavigation
