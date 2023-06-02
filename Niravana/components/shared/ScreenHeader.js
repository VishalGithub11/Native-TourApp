import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { sizes, spacing } from '../../constants/theme'

const ScreenHeader = ({mainTitle, secondTitle}) => {
  return (
    <View  style={styles.container}>
        <Text style={styles.main}>{mainTitle}</Text>
        <Text style={styles.second}>{secondTitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:spacing.l,
        paddingVertical:spacing.l,
    },
    main: {
       fontSize:sizes.title,
       fontWeight: 'bold'
    },
    
    second: {
        fontSize:sizes.title,
        }
    
})

export default ScreenHeader