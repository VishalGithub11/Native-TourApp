import React,{useState, useEffect} from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';
import {colors, sizes, spacing} from '../constants/theme';
import Icon from '../components/shared/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import TripDetailCard from '../components/TripDetail/TripDetailCard/TripDetailCard';
import * as Animatable from 'react-native-animatable';
import TripDetailCarousel from '../components/TripDetail/TripDetailCarousel';
import FavoriteButton from '../components/shared/FavoriteButton';
import { getObjectdata, storeObject } from '../utils/AsyncStorage';

const TripDetailScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const {trip} = route.params;
  const slides = [trip.image, ...trip.gallery] 


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
    <View style={styles.container}>
      <Animatable.View
        style={[styles.backButton, {marginTop: insets.top}]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out">
        <Icon
          icon="ios-arrow-back-circle"
          size={40}
          style={styles.backIcon}
          onPress={navigation.goBack}
        />
      </Animatable.View>
      <Animatable.View
        style={[styles.favoriteButton, {marginTop: insets.top}]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out">
        <FavoriteButton onPress={()=>{handleFavorites(trip.id)}} active={favorite?.indexOf(trip.id) !== -1} />
      </Animatable.View>
      <TripDetailCarousel slides={slides} id={trip.id} />
      <TripDetailCard trip={trip}  />
    </View>
  );
};

TripDetailScreen.sharedElements = route => {
  const {trip} = route.params;
  return [
    {
      id: `trip.${trip.id}.image`,
    },
  ];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBox: {
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: sizes.width,
    height: sizes.height,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    left: spacing.l,
    zIndex: 1,
  },
  backIcon: {
    tintColor: colors.white,
  },
  favoriteButton:{
    position: 'absolute',
    right: spacing.l,
    zIndex: 1,
  }
});

export default TripDetailScreen;
