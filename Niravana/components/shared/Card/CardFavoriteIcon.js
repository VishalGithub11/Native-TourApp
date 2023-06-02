import React from 'react';
import {StyleSheet} from 'react-native';
import FavoriteButton from '../FavoriteButton';

const CardFavoriteIcon = ({active, onPress}) => {
  return (
    <FavoriteButton active={active} onPress={onPress} style={styles.icon} />
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
});

export default CardFavoriteIcon;
