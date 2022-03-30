import React,{useState} from 'react';
import { Text, Button, TextInput, Alert, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../firebase';


const FootBar = () => {
  const navigation = useNavigation();

  const navigator1 = () => {
      const loggedIn = onAuthStateChanged(auth,user => {
        if(user){
          navigation.navigate('HomeScreen',{
            userId: user.uid
          });
        }
      })
      return loggedIn;

    }
    const navigator2 = () => {
      const loggedIn = onAuthStateChanged(auth,user => {
        if(user){
          navigation.navigate('AddAnnonce',{
            userId: user.uid
          });
        }
      })
      return loggedIn;

    }

    const navigator3 = () => {
      const loggedIn = onAuthStateChanged(auth,user => {
        if(user){
          navigation.navigate('Settings',{
            userId: user.uid
          });
        }
      })
      return loggedIn;

    }

    const navigator4 = () => {
      const loggedIn = onAuthStateChanged(auth,user => {
        if(user){
          navigation.navigate('MesAnnonces',{
            userId: user.uid
          });
        }
      })
      return loggedIn;

    }
    
    return (
        <View style={styles.footView}>
          <TouchableOpacity style={styles.element1} onPress={() => navigator1()}>
            <Icon iconImage = {require('../assets/Home.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.element2} onPress={() => navigator2()}>
            <Icon iconImage = {require('../assets/plus.png')}/> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.element4}  onPress={() => navigator4()}>
            <Icon iconImage = {require('../assets/mesannonces.png')}/> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.element3}  onPress={() => navigator3()}>
            <Icon iconImage = {require('../assets/settings.png')}/> 
          </TouchableOpacity>
            
        </View>
    );
  }
export default FootBar;

const styles = StyleSheet.create({
  footView: {
    bottom: 0,
    flexDirection: 'row',
    height: '6.5%',
    backgroundColor: 'white',
    paddingTop: 10
  },

  element1: {
    width: Dimensions.get('window').width / 4,
  },
  element2: {
    width: Dimensions.get('window').width / 4,
  },

  element3: {
    width: Dimensions.get('window').width / 4,
  },

  element4: {
    width: Dimensions.get('window').width / 4,
  },
});
  
