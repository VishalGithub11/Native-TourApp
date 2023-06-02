/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MainNavigator from './navigation/MainNavigation';
import { colors } from './constants/theme';



function App() {

  return (
   <MainNavigator />
  );
}



export default App;
