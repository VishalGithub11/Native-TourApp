import React, { forwardRef } from 'react'
import { View } from 'react-native'
import { colors, spacing } from '../../constants/theme'

const Divider = forwardRef(({style, enableSpacing=true}, ref) => {
  return (
    <View 
    ref={ref}
    style={[
        {
        height:1,
        backgroundColor:colors.lightGray, 
        marginHorizontal: enableSpacing?spacing.l:0
    },
    style
    ]}
    />
  )
})

export default Divider