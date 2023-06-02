import React,{useState, useEffect} from 'react';
import Carousel from '../../shared/Carousel';
import {Text, View, StyleSheet, FlatList, Platform} from 'react-native';
import Card from '../../shared/Card/Card';
import CardMedia from '../../shared/Card/CardMedia';
import CardContent from '../../shared/Card/CardContent';
import {colors, sizes, spacing} from '../../../constants/theme';
import Icon from '../../shared/Icon';
import Rating from '../../shared/Rating/Rating';
import CardFavoriteIcon from '../../shared/Card/CardFavoriteIcon';
import { getObjectdata, storeObject } from '../../../utils/AsyncStorage';

const CARD_HEIGHT = 200;


const HotelsCarousel = ({hotels}) => {

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
    <>
    <Carousel
      items={hotels}
      renderItem={({item, style}) => {
        return (
          <Card style={[styles.card, style, ]}
           shadowType={Platform.OS === 'android' ? 'lightAndriod' : 'light'}
           >
            <CardFavoriteIcon onPress={()=>handleFavorite(item.id)} active={favorite?.indexOf(item.id) !== -1} />
            <CardMedia source={item.image} borderBottomRadius />
            <CardContent style={styles.content}>
              <View style={styles.titleBox}>
                <Text style={styles.title} numberOfLines={1} >{item.title}</Text>
                <View style={styles.locationBox}>
                  <Text style={styles.location}>{item.location}</Text>
                  <Icon icon="Location" size={18} style={styles.locationIcon} />
                </View>
                <Rating
                  showLabelInline
                  rating={item.rating}
                  size={12}
                  containerStyle={styles.rating}
                />
              </View>
              <View style={styles.priceBox}>
                <Text style={styles.price}>{item.pricePeerDay}</Text>
                <Text style={styles.priceCaption}>peer day</Text>
              </View>
            </CardContent>
          </Card>
        );
      }}
    />
</>

  );
};

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
  },
  content: {
    height: 88,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
  },
  location: {
    fontSize: sizes.caption,
    color: colors.lightGray,
  },
  locationIcon: {
    tintColor: colors.gray,
  },
  rating: {
    marginTop: spacing.m / 2,
  },
  priceBox: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  price: {
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
  },
  priceCaption: {
    fontSize: sizes.caption,
    color: colors.lightGray,
    marginTop: 2,
  },
});

export default HotelsCarousel;