import React,{useEffect, useState} from 'react';
import { Text, Button, TextInput, Alert, FlatList, Image, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';
import Firebase from '../util/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../firebase';
import * as fire from 'firebase/firestore';
import {db} from '../firebase';

const Annonce = ({ navigation,route}) => {
    const {userId, date, photo,photo2, photo3, anneeModele, boite, carburant,couleur, critair, description, kilometrage, marque, modele, nbPlaces, nbPortes, puissanceDynamique, puissanceFisc, type, titre, prix} = route.params;
    const [user, setUser] = useState();
    useEffect(() => {
        fetchUsers()
      }, []);

    const fetchUsers = () => {
        fire.getDocs(fire.query(fire.collection(db,'Users'),fire.where('userId','==',userId)))
              .then((snapshot) => {
                setUser(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})));
              })
    };
    
    return (
        <Animatable.View animation="fadeInUpBig" duration={1500} style={{ flex: 1, backgroundColor: '#ffffff' }}
            showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', top: 0, backgroundColor: 'black'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen',{userId: userId})}>
                        <Image
                            source={require('../assets/retour.png')}

                            style={{
                                marginTop:Dimensions.get('window').height / 15,
                                marginLeft: 10,
                                marginRight: 50,
                                width: 30,
                                height: 20,
                                marginBottom: 10

                            }}

                        />
                    </TouchableOpacity>
                    
                   <Text style={{  marginBottom: 10, color: 'white', textAlign: 'center', marginTop: Dimensions.get('window').height / 20, fontSize: Dimensions.get('window').height / 25, fontWeight: 'bold' }}>Détail de l'annonce</Text>
                </View>
        <ScrollView style={{flex: 1, backgroundColor: 'black'}}>
           
            
            <Text style={styles.grostextHaut}>{titre}</Text>
            <Text style={styles.grostext}><Text style={styles.texto}>Date de publication : </Text> {date}</Text>
            <Text style={styles.grostext}><Text style={styles.texto}>Image 1</Text></Text>
                <Image source={{uri: photo}} style={styles.image}/>
            <Text style={styles.grostext}><Text style={styles.texto}>Image 2</Text></Text>
                <Image source={{uri: photo2}} style={styles.image}/>
                <Text style={styles.grostext}><Text style={styles.texto}>Image 3</Text></Text>
                <Image source={{uri: photo3}} style={styles.image}/>
            <Text style={styles.grostext}><Text style={styles.texto}>Marque du véhicule</Text> : {marque}</Text>
            <Text style={styles.grostext}>Modèle du véhicule : {modele}</Text>
            <Text style={styles.grostext}>Type du véhicule : {type}</Text>
            <Text style={styles.grostext}>Puissance fiscale du véhicule : {puissanceFisc} ch</Text>
            <Text style={styles.grostext}>Puissance dynamique du véhicule : {puissanceDynamique} ch</Text>
            <Text style={styles.grostext}>Nombre de portes : {nbPortes}</Text>
            <Text style={styles.grostext}>Nombre de places : {nbPlaces}</Text>
            <Text style={styles.grostext}>Kilométrage du véhicule : {kilometrage} km</Text>     
            <Text style={styles.grostext}>Crit'air du véhicule : {critair}</Text>
            <Text style={styles.grostext}>Couleur du véhicule : {couleur}</Text>
            <Text style={styles.grostext}>Carburant du véhicule : {carburant}</Text>
            <Text style={styles.grostext}>Boîte du véhicule : {boite}</Text>
            <Text style={styles.grostext}>Prix du véhicule : {prix}€</Text>
            <Text style={styles.grostext}>Année du modèle : {anneeModele} </Text>
            <Text style={styles.grostext}>Description du véhicule : </Text>
            <Text style={styles.text}>{description}</Text>
            <Text style={styles.textile}>Informations sur le vendeur :</Text>
            <FlatList
                  data={user}
                  renderItem={({ item }) => (
                    <View style={styles.postDetails}>
                        <Text style={styles.text}>Nom : {item.data.nom}</Text>
                        <Text style={styles.text}>Prénom :  {item.data.prenom}</Text>
                        <Text style={styles.text}>Adresse : {item.data.adresse}</Text>
                        <Text style={styles.text}>Email : {item.data.email}</Text>
                        <Text style={styles.text}>Numéro : {item.data.numero}</Text>
                    </View>
                    
                
                )}
              />
           
        </ScrollView>
        </Animatable.View>
    )
    };

export default Annonce;

const styles = StyleSheet.create({
    texto: {
        fontWeight: 'bold'
    },
    image:{
        resizeMode: 'contain',
        width: Dimensions.get('screen').width,
        height: 300
    //     width: '100%',
    // height: 400,
    // marginBottom: 15
    },
    text: {
        color: 'white',
        marginLeft: 5,
        marginRight: 10,
        fontSize: 18,
        textAlign: 'justify'
       
    },
    grostext: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,

    },
    textile: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 30

    },
    grostextHaut: {
        color: 'white',
        marginTop: 5,
        fontSize: 35,
        marginBottom: 5,
        textAlign: 'center'
    }
});
