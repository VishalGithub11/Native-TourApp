import React from 'react'
import { View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native'
import { colors, sizes, spacing } from '../../constants/theme'

const SectionHeader = ({
  title,
  onPress,
  titleStyle,
  containerStyle, 
  buttonTitle = 'button'}) => {
  return (
    <View  style={[styles.container, containerStyle]}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {/* <Button color={colors.white} title={buttonTitle} /> */}
        {onPress && 
        <TouchableOpacity>
  
        <Text style={styles.button} onPress={onPress}> See All </Text>
        </TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
       marginLeft: spacing.l,
       marginRight:spacing.m,
       marginTop:spacing.l,
       marginBottom:10
    },
   title:{
  fontSize: sizes.h3,
  fontWeight:'bold',
  color:colors.black
   },
   button:{
    backgroundColor:colors.white,
    color:colors.blueText,
    fontSize:sizes.body,
    fontWeight:'bold'
   }

    
})

export default SectionHeader