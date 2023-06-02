import React from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { colors, sizes } from '../../../constants/theme'

const CustomBackground = ({animatedIndex, style}) => {
    const containerStyle = useAnimatedStyle(()=>({
        ...style,
        backgroundColor: colors.light,
        borderTopLeftRadius: sizes.radius,
        borderTopLeftRadius: sizes.radius,
        opacity:interpolate(
            animatedIndex.value,
            [0,0.05],
            [0,1],
            Extrapolation.CLAMP
        ),
    }));
  return (  <Animated.View style={containerStyle}  />
  )
}



export default CustomBackground;