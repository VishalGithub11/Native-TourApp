import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import icons from '../../constants/icons';
import Icon from 'react-native-vector-icons/Ionicons'

const Icons = ({onPress, icon, style, size = 22, color="#526D82"}) => {
  const image = (
    <Icon name={icon} size={size} color={color} />
    // <Image
    //   source={icons[icon]}
    //   style={[{width: size, height: size, resizeMode: 'cover'}, style]}
    // />
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{image}</TouchableOpacity>;
  }
  return image;
};

export default Icons;
