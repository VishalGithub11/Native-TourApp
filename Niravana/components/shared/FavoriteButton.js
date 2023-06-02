import React from 'react';
import {Image, View, TouchableOpacity, Platform, LogBox} from 'react-native';
import {colors, shadow} from '../../constants/theme';
import Icon from './Icon';

const FavoriteButton = ({active, style, onPress}) => {
  const handlePress = ()=>{
 console.log('pressed');
    onPress()
  }
  return (
    <TouchableOpacity style={style} onPress={handlePress} >
      <View
        style={[
          {backgroundColor: colors.white, padding: 4, borderRadius: 20},
         Platform.OS === 'android' ? shadow.lightAndriod : shadow.light,
        
        ]}>
        <Icon icon={active ? 'heart' : 'heart-outline'} size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default FavoriteButton;
