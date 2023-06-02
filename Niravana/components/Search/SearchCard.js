import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Card from '../shared/Card/Card';
import CardMedia from '../shared/Card/CardMedia';
import CardContent from '../shared/Card/CardContent';
import CardFavoriteIcon from '../shared/Card/CardFavoriteIcon';
import {colors, sizes, spacing} from '../../constants/theme';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import { getObjectdata, storeObject } from '../../utils/AsyncStorage';

const SearchCard = ({item, index}) => {
  const navigation = useNavigation();
  const even = index % 2 === 0;

  const [favorite, setFavourite] = useState([])

  const handleFavorites = async(id)=>{
    let stored_data = await getObjectdata('favorite') || {favorite:[]};
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
    <Animated.View
      entering={FadeInDown.delay(index < 6 ? index * 50 : 0)}
      style={{
        paddingTop: index === 1 ? spacing.l : 0,
        paddingLeft: !even ? spacing.l / 2 : 0,
        paddingRight: even ? spacing.l / 2 : 0,
        paddingBottom: spacing.l,
      }}>
      <Card
        style={{
          width: '100%',
          height: index % 3 === 0 ? 180 : 240,
        }}
        key={item.id}
        onPress={() => {
          item.type === 'PLACE'
            ? navigation.navigate('TripDetails', {trip: item})
            : null;
        }}
        shadowType={Platform.OS === 'android' ? 'lightAndriod' : 'light'}>
        <SharedElement id={`trip.${item.id}.image`} style={[styles.media]}>
          <CardMedia source={item.image} borderBottomRadius />
        </SharedElement>
        <CardFavoriteIcon onPress={()=>{handleFavorites(item.id)}} active={favorite?.indexOf(item.id) !== -1} />
        <CardContent>
          <View style={styles.titleBox}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </CardContent>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  titleBox: {
    flex: 1,
  },
  title: {
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
    marginVertical: 4,
  },
  location: {},
  media: {
    flex: 1,
  },
});

export default SearchCard;
