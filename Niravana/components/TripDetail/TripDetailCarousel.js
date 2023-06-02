import React ,{useRef} from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Animated, Image, StyleSheet, View } from 'react-native'
import { sizes } from '../../constants/theme'
import { SharedElement } from 'react-navigation-shared-element'
import CarouselIndicator from '../shared/CarouselIndicator'
import * as Animatable from 'react-native-animatable'

const TripDetailCarousel = ({slides, id}) => {
    const scrollAnimated = useRef(new Animated.Value(0)).current;
  return (
    <>
   <Animated.FlatList 
   data={slides}
   horizontal
   bounces={false}
   pagingEnabled
   onScroll={Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollAnimated}}}],
    {useNativeDriver: false}
    )}

    renderItem={({item:image, index})=>{
        if(!index){
            return (
                <View style={styles.slide}>
                    <SharedElement id={`trip.${id}.image`} style={styles.slide}>
                    <Image source={image}  style={styles.image} />
                    </SharedElement>

                </View>
            )
        }
    return <View style={styles.slide}>
        <Image source={image} style={styles.image} />
    </View>
   }}  />
   {
    slides.length > 1 && 
    <Animatable.View 
    delay={550}
    duration={400}
    animation='fadeInUp'
    easing='ease-in-out'
    style={styles.indicator}
    >
    <CarouselIndicator 
    slidesCount={slides.length} 
    slideWidth={sizes.width}
    dotSize={12} 
    dotSpacing={8}
    scrollAnimated={scrollAnimated}
    />
    </Animatable.View>
   }
  
   </>
  )
}


const styles  = StyleSheet.create({
    slide:{
        width:sizes.width,
        height:sizes.height
    },
    image:{
        width:sizes.width,
        height:sizes.height,
        resizeMode:'cover'
    },
    indicator:{
        position:'absolute',
        alignItems:'center',
        bottom:60,
        width: sizes.width
    }
})


export default TripDetailCarousel