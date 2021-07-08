/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

export default function App() {
  const [todo, setTodos] = React.useState([
    {id: 1, task: 'clean the house', completed: true},
    {id: 2, task: 'kick some asses', completed: true},
  ]);

  const ListItem = ({todo}) => {
    return (
    <View style={styles.listItem}>
      <View>
        <Text>{todo?.task}</Text>
      </View>
    </View>
    
    );
  };
  return (
    <React.Fragment>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <StatusBar backgroundColor="#61dafb" />
          <Text style={styles.text}>Your Plan Today</Text>
          <Icon name="delete" color="red" size={25} />
        </View>
      
      <View style={styles.bodyContainer}>
        <View style={styles.body}></View>
      </View>
      <FlatList
        showVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        data={todo}
        renderItem={({item}) => <ListItem todo={item} />}
      />
      </SafeAreaView>
      <SafeAreaView style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Add your plan"></TextInput>
        </View>
        <TouchableOpacity>
          <View style={styles.iconContainer}>
            <Icon name="add" color="#ff6347" size={30} />
          </View>
        </TouchableOpacity>
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
  // input container
  inputContainer: {
    backgroundColor: '#ff6347',
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  // icon container
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#008080',
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // List Item
  listItem: {
    padding: 20,
    backgroundColor: '#008080',
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
});
