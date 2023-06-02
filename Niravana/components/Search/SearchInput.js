import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import Icon from '../shared/Icon'
import { colors, shadow, sizes, spacing } from '../../constants/theme'


const SearchInput = ({search, setSearch}) => {
    
  return (
    <View  style={styles.container}>
         <View  style={styles.inner}>
        <View  style={styles.search}>
            <Icon icon='search' size={28} />
        </View>
        <TextInput 
        style={styles.field}
        placeholder='Search Places'
        value={search}
        onChangeText={setSearch}
        />
        <View  style={styles.filter}>
            <Icon icon='menu' size={28}  />
        </View>
        </View>
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
       
        paddingHorizontal:spacing.l,
        paddingBottom:spacing.l,
        paddingTop:spacing.l /1.5
    },
    inner:{
        flexDirection: 'row',
    },
    search:{
        position:'absolute',
        top:10,
        left:10,
        zIndex:1
    },
    field:{
        backgroundColor:colors.white,
        paddingLeft:spacing.xl + spacing.s,
        paddingRight:spacing.m,
        flex:1,
        borderRadius:sizes.radius,
        height:54,
        ...shadow.lightAndriod
    },
    filter:{
        position:'absolute',
        top:10,
        right:10,
        zIndex:1
    }
})

export default SearchInput