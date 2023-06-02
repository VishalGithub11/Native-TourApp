import React from 'react'
import { View, StyleSheet, Text, Image} from 'react-native'
import Icon from './Icon'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, sizes, spacing } from '../../constants/theme'
import Nirvana from "../../assets/images/nirvana.png"

const MainHeader = ({title}) => {
    const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container,{marginTop:insets.top}]}>
        <Icon icon="menu-sharp" size={28} onPress={()=>{}}  />
        {/* <Image size={5} source={Nirvana} /> */}
        <Text style={styles.title}>{title}</Text>
        <Icon icon="notifications" size={22} onPress={()=>{}} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:spacing.l
    },
    
    title: {
            fontSize:sizes.h3,
            fontWeight:'bold',
            color:colors.black
            
        }
    
})

export default MainHeader