import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import MainHeader from '../components/shared/MainHeader';
import {colors} from '../constants/theme';
import ScreenHeader from '../components/shared/ScreenHeader';
import TopPlacesCarousel from '../components/Home/TopPlacesCarousel';
import {PLACES, TOP_PLACES} from '../data';
import SectionHeader from '../components/shared/SectionHeader';
import TripList from '../components/Home/TripList';
import { removeValue } from '../utils/AsyncStorage';
const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <MainHeader title="Nirvana" />
   
      <ScreenHeader mainTitle="Find Your" secondTitle="Dream Trip" />
      <ScrollView>
        <TopPlacesCarousel list={TOP_PLACES} />
        <SectionHeader
          title="Popular Trips"
          buttonTitle="See All"
          onPress={() => {}}
        />
        <TripList list={PLACES} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default HomeScreen;
