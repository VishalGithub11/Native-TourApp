import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from '../constants/theme';
import MainHeader from '../components/shared/MainHeader';
import SearchInput from '../components/Search/SearchInput';
import Tabs from '../components/shared/Tabs';
import SearchMasonry from '../components/Search/SearchMasonry';
import {SEARCH_ALL, SEARCH_HOTELS, SEARCH_PLACES} from '../data';



const Search = () => {

  const [search, setSearch] = useState("")
  const [searchAll, setSearchAll] = useState(SEARCH_ALL)
  const [searchPlaces, setSearchPlaces] = useState(SEARCH_PLACES)
  const [searchHotels, setSearchHotel] = useState(SEARCH_HOTELS)


  const filterItem = (array, setItem) =>{
    let filteredItem = [...array]
    if(search){
      filteredItem = array.filter((item)=>{
        if(item.title.toLowerCase()?.includes(search?.toLocaleLowerCase())){
          return item
        }
      })
    }
    setItem(filteredItem)
  }

  useEffect(()=>{
    filterItem(SEARCH_ALL, setSearchAll)
    filterItem(SEARCH_PLACES, setSearchPlaces)
    filterItem(SEARCH_HOTELS, setSearchHotel)

  },[search])
  
  const tabs = [
    {
      title: 'All',
      content: () => <SearchMasonry key="all" list={searchAll} />,
    },
    {
      title: 'Places',
      content: () => <SearchMasonry key="places" list={searchPlaces} />,
    },
    {
      title: 'Hotels',
      content: () => <SearchMasonry key="hotels" list={searchHotels} />,
    },
  ];



  return (
    <View style={styles.container}>
      <MainHeader title={'Search'} />
      <SearchInput search={search} setSearch={setSearch} />
      <Tabs items={tabs} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default Search;
