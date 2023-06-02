import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {sizes, spacing} from '../../constants/theme';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

const CARD_WIDTH = sizes.width - 80;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const Carousel = ({renderItem, items = []}) => {
  return (
    <BottomSheetFlatList
      data={items}
      horizontal
      style={styles.container}
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => `key-${i.id}`}
      renderItem={({item, index}) => {
        if (renderItem) {
          return renderItem({
            item,
            index,
            style: {
              width: CARD_WIDTH,
              marginLeft: spacing.l,
              marginRight: index === items.length - 1 ? spacing.l : 0,
              marginBottom:20
            },
          });
        }
        return null;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.m,
    height:'100%'
  },
});

export default Carousel;