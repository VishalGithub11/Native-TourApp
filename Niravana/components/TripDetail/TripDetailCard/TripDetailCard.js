import React, {useMemo} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {colors, sizes, spacing} from '../../../constants/theme';
import * as Animatable from 'react-native-animatable';
import BottomSheet, {BottomSheetScrollView , BottomSheetFlatList}  from '@gorhom/bottom-sheet';
import CustomHandler from './CustomHandler';
import CustomBackground from './CustomBackground';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  Extrapolation,
  interpolate,
} from 'react-native-reanimated';
import Icon from '../../shared/Icon';
import Divider from '../../shared/Divider';
import SectionHeader from '../../shared/SectionHeader';
import RatingOverall from '../../shared/Rating/RatingOverall';
import HotelsCarousel from './HotelCarousel';
import Reviews from '../../Reviews/Reviews';

const AnimatedDivider = Animated.createAnimatedComponent(Divider);

const CARD_HEIGHT = 200;
const CARD_WIDTH = sizes.width - 100;
const CARD_WIDTH_SPACING = sizes.width + spacing.l;

const TripDetailCard = ({trip}) => {
  const snapPoints = useMemo(() => ['30%', '80%'], []);
  const animatedIndex = useSharedValue(0);

  const titleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.08],
      [colors.white, colors.primary],
    ),
    marginBottom: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 10],
      Extrapolation.CLAMP,
    ),
  }));
  const locationStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.08],
      [colors.white, colors.lightColor],
    ),
    fontSize: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [sizes.title, sizes.body],
      Extrapolation.CLAMP,
    ),
  }));
  const locationIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          animatedIndex.value,
          [0, 0.08],
          [0, 1],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedIndex.value,
          [0, 0.08],
          [40, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <BottomSheet
      animatedIndex={animatedIndex}
      snapPoints={snapPoints}
      index={0}
      handleComponent={CustomHandler}
      backgroundComponent={CustomBackground}>
      <Animatable.View
        style={styles.header}
        animation="fadeInUp"
        delay={500}
        duration={400}
        easing="ease-in-out">
        <Animated.Text style={[styles.title, titleStyle]}>
          {trip.title}
        </Animated.Text>
        <View style={styles.location}>
          <Animated.Text style={[styles.locationText, locationStyle]}>
            {trip.location}{' '}
          </Animated.Text>
          <Animated.Text style={locationIconStyle}>
            <Icon icon="Location" size={20} style={styles.locationIcon} />
          </Animated.Text>
        </View>
      </Animatable.View>
      <AnimatedDivider style={contentStyle} />
      <BottomSheetScrollView
        style={styles.scrollBox}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
    <Animated.View style={contentStyle}>
        <RatingOverall rating={trip.rating} containerStyle={styles.rating} />
        <SectionHeader
          title="Summary"
          containerStyle={styles.sectionHeader}
          titleStyle={styles.sectionHeaderTitle}
        />
        <View style={styles.summary}>
          <Text style={styles.summaryText}>{trip.description}</Text>
        </View>
        <SectionHeader
          title="Hotels"
          containerStyle={styles.sectionHeader}
          titleStyle={styles.sectionHeaderTitle}
          onPress={()=>{}}
        />
        <HotelsCarousel hotels={trip.hotels}  />
        <SectionHeader
          title="Reviews"
          containerStyle={styles.sectionHeader}
          titleStyle={styles.sectionHeaderTitle}
          onPress={()=>{}}
        />
        <Reviews reviews={trip.reviews} />
      </Animated.View>
      </BottomSheetScrollView>      
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
  },
  title: {
    fontSize: sizes.title,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationText: {
    fontSize: sizes.title,
    color: colors.white,
  },
  locationIcon: {
    tintColor: colors.gray,
  },
  scrollBox: {
    marginTop: spacing.s,
    marginBottom: spacing.m,
  },
  sectionHeader: {
    marginTop: spacing.m,
  },
  sectionHeaderTitle: {
    color: colors.lightGray,
    fontWeight: 'normal',
  },
  summary: {
    marginHorizontal: spacing.l,
  },
  summaryText: {
    color: colors.primary,
  },
  rating: {
    marginHorizontal: spacing.l,
  },
});

export default TripDetailCard;
