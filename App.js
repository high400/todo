/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

export default function App() {
  return (
    <React.Fragment>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <StatusBar backgroundColor="#61dafb" />
          <Text style={styles.text}>Your Plan Today</Text>
          <Icon name="delete" color="red" size={25} />
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.bodyContainer}>
        <View style={styles.body}></View>
      </SafeAreaView>
      <SafeAreaView style={styles.footer}>
        <View style={styles.inputContainer}></View>
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  // Header Container
  headerContainer: {
    flex: 1,
    backgroundColor: '#393E46',
  },
  // Header
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
  },
  // text
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ee82ee',
  },
  // footer container
   
  // footer
  footer: {
    position: 'absolute',
    bottom: 0,
    color: '#f5deb3',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
});
