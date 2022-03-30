/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useEffect, useState} from 'react';

 import {
    ScrollView,
    StyleSheet,
    View,
    Button,
    Text,
    ActivityIndicator,FlatList,Dimensions, TouchableOpacity
  } from 'react-native';
 import Post from '../components/Post';
 import {db} from '../firebase';
 import * as fire from 'firebase/firestore';
 import Firebase from '../util/Firebase';
import { collection, QueryConstraint } from 'firebase/firestore';
import FootBar from '../components/FootBar';
  
  const Settings = ({route,navigation}) => {
   const{userId} =route.params;
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

       const deconnexion =() => {
         Firebase.deconnexion();
         navigation.navigate('Login');
       }

       const modifierPassword = () => {
         Firebase.modifierPassword(user[0].data.email);
       }
       return(
           <View style={{flex: 1,justifyContent: 'center', backgroundColor: 'black'}}>
            <Text style={styles.texto}>Mes informations</Text>
            <FlatList
                    data={user}
                    renderItem={({ item }) => (
                    <View style={styles.postDetails}>
                        <Text style={styles.text}><Text style={styles.textile}>Nom :</Text> <Text style={styles.texta}>{item.data.nom}</Text></Text>
                        <Text style={styles.text}><Text style={styles.textile}>Prénom :</Text>  <Text style={styles.texta}>{item.data.prenom}</Text></Text>
                        <Text style={styles.text}><Text style={styles.textile}>Adresse :</Text> <Text style={styles.texta}>{item.data.adresse}</Text></Text>
                        <Text style={styles.text}><Text style={styles.textile}>Email :</Text> <Text style={styles.texta}>{item.data.email}</Text></Text>
                        <Text style={styles.text}><Text style={styles.textile}>Numéro :</Text> <Text style={styles.texta}>{item.data.numero}</Text></Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontWeight: 'bold',fontSize: 18,color: 'white',marginLeft: 10,marginTop:20}}>Mot de passe :</Text>
                            <TouchableOpacity
                        style={styles.button}

                    >
                        <Text style={{ color: '#ffffff', fontWeight: 'bold' }} onPress={()=> modifierPassword()}>Modifier le mot de passe</Text>
                    </TouchableOpacity>
                        </View>
                       
                    </View>
                    
                
                )}
                />
                <TouchableOpacity
                        style={styles.button2}

                    >
                        <Text style={{ bottom: 0, color: 'white'}} onPress={()=> deconnexion()}>Se déconnecter</Text>
                    </TouchableOpacity>
                  <FootBar />
           </View>
       
       )
    }
 
  export default Settings;
  
  const styles = StyleSheet.create({
    texta: {
      fontSize: 17
    },
    button: {
        alignItems: "center",
        backgroundColor: "green",
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 20
    },
    button2: {
      alignItems: "center",
      backgroundColor: "red",
      padding: 10,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
      borderRadius: 20,
      marginBottom: 20
  },
    texto: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: Dimensions.get('window').width *0.08,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15
    },

    text:{
        color: 'white',
        marginLeft: 10,
        marginBottom: 20
    },
    textile: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        marginLeft: 10,
    }
  });
  
 
  