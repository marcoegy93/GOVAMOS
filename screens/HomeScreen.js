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
    ActivityIndicator,FlatList,Dimensions
  } from 'react-native';
 import Post from '../components/Post';
 import {db} from '../firebase';
 import * as fire from 'firebase/firestore';
 import Firebase from '../util/Firebase';
import { collection, QueryConstraint } from 'firebase/firestore';
import FootBar from '../components/FootBar';
  
  const HomeScreen = ({route,navigation}) => {
   const{userId} =route.params;
   const[posts,setPosts] = useState([]);
   
     useEffect(() => {
       fetchPosts();
     }, []);
       const fetchPosts = () => {
         try{
              
              fire.getDocs(fire.query(fire.collection(db,'Posts'),fire.orderBy('userId', 'desc'),fire.orderBy('date', 'desc'),fire.where('userId','!=',userId)))
              .then((snapshot) => {
                setPosts(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})));
              }
            );
            console.log('Posts: ', posts);
         }catch(e){
           console.log(e);
         }
       };


       return (
         <View style={{flex: 1}}>
           <Text style={{ color: 'black', textAlign: 'center', fontSize: Dimensions.get('window').height / 25, fontWeight: 'bold',marginTop: Dimensions.get('window').height / 20}}>Bienvenue sur GOVAMOS !</Text>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: Dimensions.get('window').height / 30, fontWeight: 'bold'}}>Voici nos annonces : </Text>
                <FlatList
                   data={posts}
                   renderItem={({ item }) => (
                     <View>
                       <Post
                         id = {item.id}
                         photo={item.data.photo1}
                         photo2={item.data.photo2}
                         photo3={item.data.photo3}
                         anneeModele={item.data.anneeModele}
                         boite={item.data.boite}
                         carburant={item.data.carburant}
                         couleur={item.data.couleur}
                         critair={item.data.critair}
                         description={item.data.description}
                         kilometrage={item.data.kilometrage}
                         marque={item.data.marque}
                         modele={item.data.modele}
                         nbPlaces={item.data.nbPlaces}
                         nbPortes={item.data.nbPortes}
                         puissanceDynamique={item.data.puissanceDynamique}
                         puissanceFisc={item.data.puissanceFisc}
                         type={item.data.type}
                         titre={item.data.titre}
                         userId={item.data.userId}  
                         prix={item.data.prix} 
                         date={item.data.date}  
                       />
                     </View>  
                 
                 )}
               />
               <FootBar />
        </View> 
       );
    
  };
 
  export default HomeScreen;
  
  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });
  
 
  