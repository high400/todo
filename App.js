/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState, useEffect} from 'react';

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
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

export default function App() {
  const [todo, setTodo] = React.useState([
    {id: 1, task: 'clean the house', completed: false},
    {id: 2, task: 'kick some asses', completed: false},
  ]);
  React.useEffect(() => {
    getTodoFromUserDevice();
  }, []);
  React.useEffect(() => {
    saveTodoTouserDevice(todo);
  }, [todo]);

  const [textInput, setTextInput] = React.useState('');



  const ListItem = ({todo}) => {
    return (
      <View style={styles.listItem}>
        <View style={{flex: 1}}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                textDecorationLine: todo?.completed ? 'line-through' : 'none',
              }}>
              {todo?.task}
            </Text>
          </View>
        </View>
        {!todo?.completed && (
          <TouchableOpacity style={[styles.actionIcon]}>
            <Icon name="done" size={20} color={'white'} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.actionIcon, {backgroundColor: 'red'}]}
          onPress={() => deleteTodo(todo?.id)}>
          <Icon name="delete" size={20} color={'white'} />
        </TouchableOpacity>
      </View>
    );
  };

  const saveTodoTouserDevice = async todo => {
    try {
      const stringifyTodo = JSON.stringify(todo);
      await AsyncStorage.setItem('todo', stringifyTodo);
    } catch (e) {
        console.log(e);
    }
  };
  const getTodoFromUserDevice = async () => {
    try {
      const todo = await AsyncStorage.getItem('todo');
      if (todo != null) {
          setTodo(JSON.parse(todo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please input todo');
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodo([...todo, newTodo]);
      setTextInput('');
    }
  };

  const markTodoComplete = todoId => {
    const newTodo = todo.map(item => {
      if (item.id == todoId) {
        return {...item, completed: true};
      }
      return item;
    });
    setTodo(newTodo);
  };

  const deleteTodo = todoId => {
    const newTodo = todo.filter(item => item.id != todoId);
    setTodo(newTodo);
  };

  const clearTodo = todoId => {
    Alert.alert('Confirm', 'Clear todo?', [
      {
        text: 'Yes',
        onPress: () => setTodo([]),
      },
      {text: 'No'},
      ]);
  };
  return (
    <React.Fragment>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <StatusBar backgroundColor="#61dafb" />
          <Text style={styles.text}>Your Plan Today</Text>
          <Icon name="delete" color="red" size={25} onPress={clearTodo} />
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
          <TextInput
            placeholder="Add your plan"
            value={textInput}
            onChangeText={text => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
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

  // Action Icons
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginLeft: 5,
  },
});
