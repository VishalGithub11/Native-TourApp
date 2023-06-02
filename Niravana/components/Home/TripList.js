import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {colors, sizes, spacing} from '../../constants/theme';
import FavoriteButton from '../shared/FavoriteButton';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import Card from '../shared/Card/Card';
import CardMedia from '../shared/Card/CardMedia';
import CardContent from '../shared/Card/CardContent';
import { getObjectdata, storeObject } from '../../utils/AsyncStorage';

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = 220;

const TripList = ({list}) => {
  const navigation = useNavigation();
  const [favorite, setFavourite] = useState([])
 

  const handleFavorite = async(id)=>{
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
      {list.map((item, index) => {
        return (
          <Card
            style={styles.card}
            key={item.id}
            onPress={() => {
              navigation.navigate('TripDetails', {trip: item});
            }}
            shadowType={Platform.OS === 'android' ? 'lightAndriod' : 'light'}>
            <SharedElement id={`trip.${item.id}.image`} style={styles.media} >
              <CardMedia source={item.image} borderBottomRadius />
            </SharedElement>
            <CardContent style={styles.content}>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
              <FavoriteButton onPress={()=>handleFavorite(item.id)} active={favorite?.indexOf(item.id) !== -1} />
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },

  media: {
    flex: 1,
  },
  content: {
    paddingRight: spacing.m / 2,
  },

  titleBox: {
    flex: 1,
  },
  title: {
    marginVertical: 4,
    fontSize: sizes.body,
    color: colors.primary,
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default TripList;
