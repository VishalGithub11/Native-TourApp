import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from '../shared/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, sizes, spacing} from '../../constants/theme';
import FavoriteButton from '../shared/FavoriteButton';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import Carousel from '../shared/Carousel';
import { getObjectdata, storeObject } from '../../utils/AsyncStorage';

const CARD_WIDTH = sizes.width - 100;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = sizes.width + spacing.l;

const TopPlacesCarousel = ({list}) => {
  const navigation = useNavigation();

  const [favorite, setFavourite] = useState([])

  const handleFavorites = async(id)=>{
    let stored_data = await getObjectdata('favorite') || {favorite:[]} ;
    let fav = stored_data?.favorite
   if(Array.isArray(fav)){
     let index =  fav.indexOf(id)
     if(index === -1){
      fav?.push(id)
     }else{
      fav.splice(index, 1);
     }
   }
    setFavourite(fav)
    await storeObject('favorite', {favorite:fav})
  }

  useEffect(()=>{
    async function setFav(){
      let stored_data = await getObjectdata('favorite') || {favorite:[]} ;
      setFavourite(stored_data.favorite)
    }
    setFav()
  },[])


  return (
  
    <FlatList
      data={list}
       horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: spacing.l,
              marginRight: index === list.length - 1 ? spacing.l : 0,
            }}
            onPress={() => {
              navigation.navigate('TripDetails', {trip: item});
            }}>
            <View style={styles.card}>
              <FavoriteButton onPress={()=>{handleFavorites(item.id)}} active={favorite?.indexOf(item.id) !== -1} style={styles.favorite}  />
              <SharedElement
                id={`trip.${item.id}.image`}
                style={StyleSheet.absoluteFillObject}
                >
                <View style={styles.imageBox}>
                  <Image source={item.image} style={styles.image} />
                </View>
              </SharedElement>

              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
  favorite: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 999999,
  },
});

export default TopPlacesCarousel;
