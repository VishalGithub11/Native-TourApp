import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import { colors, sizes, spacing } from '../../constants/theme';
import Animated, { BounceIn } from 'react-native-reanimated';

const Tabs = ({items})=>{
    const [index, setIndex] = useState(0)
    return <View style={styles.container}>
        <View style={styles.tabs}>
            {
                items.map((tab, i)=>{
                    const active = index === i
                    return (
                        <TouchableOpacity
                        key={i}
                        onPress={()=>setIndex(i)}
                        style={[styles.tab, active ? styles.activeTab : '']}
                        >
                            {active &&  <Animated.View style={styles.activeBubble} entering={BounceIn} />   }
                           <Animated.Text style={active ? styles.activeTabText : styles.tabText}>
                                {tab.title}
                            </Animated.Text>
                        </TouchableOpacity>
                    )
                })
            }

        </View>
        {items[index].content()}
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    tabs:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:spacing.l,
        paddingBottom:spacing.m
    },
    tab:{
        borderWidth:1,
        flex:1,
       paddingHorizontal:spacing.l,
       margin:5,
       borderRadius:sizes.radius,
       borderColor:colors.gray

    },
    activeTab:{
        borderColor:colors.primary
    },
    activeBubble:{
        position:'absolute',
        top:6,
        left:5,
        height:6,
        width:6,
        backgroundColor:colors.primary,
        borderRadius:3,
    },
    tabText:{
        color:colors.grey,
        textAlign:'center',
    },
    activeTabText:{
        color:colors.primary,
        textAlign:'center',
    },
})

export default Tabs