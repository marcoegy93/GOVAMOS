import React,{useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    Dimensions,
    Button,FlatList
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { browserSessionPersistence } from 'firebase/auth';
import {format} from 'date-fns';
const Post = (props) => {
    const userId = props.userId;
    const photo = props.photo;
    const photo2 = props.photo2;
    const photo3= props.photo3;
    const anneeModele = props.anneeModele;
    const boite = props.boite;
    const carburant = props.carburant;
    const couleur = props.couleur;
    const critair = props.critair;
    const description = props.description;
    const kilometrage = props.kilometrage;
    const marque = props.marque;
    const modele = props.modele;
    const nbPlaces = props.nbPlaces;
    const nbPortes = props.nbPortes;
    const puissanceDynamique = props.puissanceDynamique;
    const puissanceFisc = props.puissanceFisc;
    const type = props.type;
    const titre = props.titre;
    const prix = props.prix;
    const id = props.id;
    const date = props.date;
    const d = date.toDate();
    const dateFinal = format(d, 'dd/MM/yyyy à HH:mm:ss');
    const navigation = useNavigation();

    return (

      
      
        <View style={styles.postView}>
          <View>
            <Text style={styles.title}>{props.titre} </Text>
          </View>
          <View style={styles.postContent}>
              <Image source={{uri: props.photo}} style={styles.photo}/>
              <Text style={{color: 'white'}}>Date de publication : {dateFinal}</Text>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Annonce',
          {
            id: id,
            userId: userId,
            photo: photo,
            photo2: photo2,
            photo3: photo3,
            anneeModele: anneeModele,
            boite: boite,
            carburant: carburant,
            couleur: couleur,
            critair: critair,
            description: description,
            kilometrage: kilometrage,
            marque: marque,
            modele: modele,
            nbPlaces: nbPlaces,
            nbPortes: nbPortes,
            puissanceDynamique: puissanceDynamique,
            puissanceFisc: puissanceFisc,
            type: type,
            titre: titre,
            prix: prix,
            date: dateFinal
            
          })}>
            <Text>En savoir plus</Text>
          </TouchableOpacity>
        </View> 
      
    );
  }
  
const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20
    
},
  postView: {
    fontWeight: '700',
    backgroundColor: 'black', //#2296F3, d8e2dc CECECE
    //backgroundColor: '#EDF7FB',
    
    // paddingLeft: 5,
    // paddingRight: 5,
    padding: 5,
    margin: 5,
    borderRadius: 9,
    marginBottom: 10,
  },
  photo: {
    // flex: 1,
    marginBottom: 10,
    marginTop: 7,
    resizeMode: 'contain',
    width: Dimensions.get('window').width * 0.95,
    height: 300
    // borderColor: 'black',
    // borderWidth: 0.3,
  },
  title: {
    color: 'white',
    marginRight: 10,
    marginTop: 10,
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center'
    // flex: 2,
  }
});
  
export default Post;