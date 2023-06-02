import React, { useEffect, useState } from 'react'
import {
  
  Text,
  View,
  StyleSheet
} from "react-native"
import { colors } from '../constants/theme';
import MainHeader from '../components/shared/MainHeader';
import Tabs from '../components/shared/Tabs';
import SearchMasonry from '../components/Search/SearchMasonry';
import { getObjectdata } from '../utils/AsyncStorage';
import { SEARCH_ALL, SEARCH_PLACES, SEARCH_HOTELS } from '../data';

const Favourite = () => {

  const [favAll, setFavAll] = useState(SEARCH_ALL)
  const [favPlaces, setAllFavPlaces] = useState(SEARCH_PLACES)
  const [favHotels, setAllFavHotes] = useState(SEARCH_HOTELS)

  const tabs = [
    {
      title: 'All',
      content: () => <SearchMasonry key="all" list={favAll} />,
    },
    {
      title: 'Places',
      content: () => <SearchMasonry key="places" list={favPlaces} />,
    },
    {
      title: 'Hotels',
      content: () => <SearchMasonry key="hotel" list={favHotels} />,
    },
  ];
   

  useEffect(()=>{
    async function fetchData(){
      const fav = await getObjectdata('favorite') || {favorite:[]};
      function filteredFav(firstArr, secondArr){
        return  firstArr.map((item)=> secondArr.filter((elem)=>elem.id === item)[0]).filter(Boolean)
      }
      const sortedAll = filteredFav(fav?.favorite, SEARCH_ALL)
      const sortedHotels = filteredFav(fav?.favorite, SEARCH_HOTELS)
      const sortedPlaces = filteredFav(fav?.favorite, SEARCH_PLACES)
      setFavAll(sortedAll)
      setAllFavHotes(sortedHotels)
      setAllFavPlaces(sortedPlaces)
    } 
    fetchData()
    return ()=>{}
  },[])

  return (
    <View style={styles.container}>
      <MainHeader title={'Favorite'} />
      <Tabs items={tabs} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});
export default Favourite