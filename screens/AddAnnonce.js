import React, {useState, useEffect} from "react";
import { Button, TouchableOpacity, PermissionsAndroid, ScrollView, TextInput,SafeAreaView, StatusBar, Image,StyleSheet, Text, View,Platform,Alert,ActivityIndicator,Dimensions} from "react-native";
  import * as Animatable from 'react-native-animatable';
import {addDoc,collection} from 'firebase/firestore';
import * as fire from 'firebase/firestore';
import * as store from 'firebase/storage';
import {ref,getDownloadURL,uploadBytes} from 'firebase/storage';
import {db,storage} from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';

import FootBar from '../components/FootBar';
import Firebase from "../util/Firebase";

const AddAnnonce = ({navigation,route}) => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [type,setType] = useState('4x4, Suv');
    const [carburant,setCarburant] = useState('Essence');
    const [anneeModele,setAnneeModele] = useState('');
    const [kilometrage, setKilometrage] = useState('');
    const [puissanceFisc, setPuissanceFisc] = useState('');
    const [puissanceDynamique, setPuissanceDynamique] = useState('');
    const [nbPortes,setNbPortes] = useState('4');
    const [nbPlaces,setNbPlaces] = useState('4');
    const [couleur, setCouleur] = useState('');
    const [boite,setBoite] = useState('Automatique');
    const [critair,setCritair] = useState('0');
    const [prix, setPrix] = useState('');
    const [modele,setModele] = useState('');
    const [marque,setMarque] = useState('');
    const{userId} = route.params;

    useEffect(() => {
        setImage1('https://rossfrance.com/img/Bg/noimg.png');
        setImage2('https://rossfrance.com/img/Bg/noimg.png');
        setImage3('https://rossfrance.com/img/Bg/noimg.png');
      }, []);

    const takePhotoFromCamera1 = () => {
        ImagePicker.launchCameraAsync({
          cropping: true,
          aspect: [1400,1000],
          allowsEditing: true
        }).then((image) => {
        if(!image.cancelled){
            console.log(image);
            const imageUri = image.uri;
            setImage1(imageUri);
            console.log(image1);
        }
        });
      };

      const takePhotoFromCamera2 = () => {
        ImagePicker.launchCameraAsync({
            aspect: [1400,1000],
          cropping: true,
          allowsEditing: true
        }).then((image) => {
        if(!image.cancelled){
          console.log(image);
          const imageUri = image.uri;
          setImage2(imageUri);
        }
        });
      };

      const takePhotoFromCamera3 = () => {
        ImagePicker.launchCameraAsync({
          aspect: [1400,1000],
          cropping: true,
          allowsEditing: true
        }).then((image) => {
            if(!image.cancelled){
          console.log(image);
          const imageUri = image.uri;
          setImage3(imageUri);
            }
        });
      };
    

      const choosePhotoFromLibrary1 = () => {
        ImagePicker.launchImageLibraryAsync({
          aspect: [1400,1000],
          cropping: true,
          allowsEditing: true
        }).then((image) => {
            if(!image.cancelled){
          console.log(image);
          const imageUri = image.uri;
          setImage1(imageUri);
            }
        });
      };

      const choosePhotoFromLibrary2 = () => {
        ImagePicker.launchImageLibraryAsync({
          aspect: [1400,1000],
          cropping: true,
          allowsEditing: true
        }).then((image) => {
            if(!image.cancelled){
          console.log(image);
          const imageUri = image.uri;
          setImage2(imageUri);
            }
        });
      };

      const choosePhotoFromLibrary3 = () => {
        ImagePicker.launchImageLibraryAsync({
          aspect: [1400,1000],
          cropping: true,
          allowsEditing: true
        }).then((image) => {
            if(!image.cancelled){
          console.log(image);
          const imageUri = image.uri;
          setImage3(imageUri);
            }
        });
      };
    
      const submitPost = async () => {
        if(titre=='' || marque=='' || modele=='' || type=='' || carburant=='' || anneeModele=='' || kilometrage=='' 
        || puissanceFisc=='' || puissanceDynamique=='' || nbPortes=='' || nbPlaces=='' || couleur=='' || boite=='' || critair=='' || description=='' || prix==''){
            alert("Veuillez remplir tous les champs");
        }else{
            const imageUrl1 = await uploadImage1();
            const imageUrl2 = await uploadImage2();
            const imageUrl3 = await uploadImage3();
            const ajout = {
                userId: userId,
                titre: titre,
                marque: marque,
                modele: modele,
                type: type,
                carburant: carburant,
                anneeModele: anneeModele,
                kilometrage: kilometrage,
                puissanceFisc: puissanceFisc,
                puissanceDynamique: puissanceDynamique,
                nbPortes: nbPortes,
                nbPlaces: nbPlaces,
                couleur: couleur,
                boite: boite,
                critair: critair,
                description: description,
                photo1: imageUrl1,
                photo2: imageUrl2,
                photo3: imageUrl3,
                prix: prix,
                date: fire.Timestamp.fromDate(new Date()).toDate().format
           };
            addDoc(collection(db,'Posts'), ajout)
            .then(() => {
              console.log('Post ajouté!');
              Alert.alert(
                'Post publié !'
              );
              navigation.navigate('HomeScreen', {userId: userId});
            })
            .catch((error) => {
              console.log('Something went wrong with added post to firestore.', error);
            });
        }
       
      }
    
      const uploadImage1 = async () => {
        if(image1 == "https://rossfrance.com/img/Bg/noimg.png"){
            return "https://rossfrance.com/img/Bg/noimg.png";
        }
        console.log("image1: "+ image1);
        const uploadUri = image1;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
        // Add timestamp to File Name
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        console.log("filename:  "+ filename);
        //setUploading(true);
        //setTransferred(0);
    
        const storageRef = ref(storage,`photos/${filename}`);
        const img = await fetch(uploadUri);
        const bytes = await img.blob();      
        const task = store.uploadBytes(storageRef,bytes);
        //Set transferred state
        // task.on('state_changed', (taskSnapshot) => {
        //   console.log(
        //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        //   );
    
        //   setTransferred(
        //     Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        //       100,
        //   );
        // });
        
    
        try {
          await task;
          const url = await getDownloadURL(storageRef);
          console.log(url);
    
          //setUploading(false);
          console.log(image1);
          //setImage(null);

          return url;
    
        } catch (e) {
          console.log(e);
          return null;
        }
    
      };

      const uploadImage2 = async () => {
        if(image2 == "https://rossfrance.com/img/Bg/noimg.png"){
            return "https://rossfrance.com/img/Bg/noimg.png";
        }
        console.log("image2: "+ image2);
        const uploadUri = image2;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
        // Add timestamp to File Name
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        console.log("filename:  "+ filename);
        //setUploading(true);
        //setTransferred(0);
    
        const storageRef = ref(storage,`photos/${filename}`);
        const img = await fetch(uploadUri);
        const bytes = await img.blob();      
        const task = store.uploadBytes(storageRef,bytes);
        console.log("wesh, c'est moi");
        //Set transferred state
        // task.on('state_changed', (taskSnapshot) => {
        //   console.log(
        //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        //   );
    
        //   setTransferred(
        //     Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        //       100,
        //   );
        // });
        
    
        try {
          await task;
          const url = await getDownloadURL(storageRef);
          console.log("wesh :" + url);
    
          //setUploading(false);
          console.log(image2);
          //setImage(null);
    
          return url;
    
        } catch (e) {
          console.log(e);
          return null;
        }
    
      };

      const uploadImage3 = async () => {
        if(image3 == "https://rossfrance.com/img/Bg/noimg.png"){
            return "https://rossfrance.com/img/Bg/noimg.png";
        }
        console.log("image3: "+ image3);
        const uploadUri = image3;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
        // Add timestamp to File Name
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        console.log("filename:  "+ filename);
        //setUploading(true);
        //setTransferred(0);
    
        const storageRef = ref(storage,`photos/${filename}`);
        const img = await fetch(uploadUri);
        const bytes = await img.blob();      
        const task = store.uploadBytes(storageRef,bytes);
        
    
        try {
          await task;
          const url = await getDownloadURL(storageRef);
          console.log("wesh :" + url);
    
          //setUploading(false);
          console.log(image3);
          //setImage(null);
          return url;
    
        } catch (e) {
          console.log(e);
          return null;
        }
    
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
                    
                   <Text style={{  marginBottom: 10, color: 'white', textAlign: 'center', marginTop: Dimensions.get('window').height / 20, fontSize: Dimensions.get('window').height / 25, fontWeight: 'bold' }}>Dépose ton annonce</Text>
                </View>
            <ScrollView style={styles.bottomView}>
                <View>
                <Text style={{ fontWeight: 'bold', marginLeft: 15 ,fontSize: Dimensions.get('window').height / 50, color: 'white'}}>TITRE DE L'ANNONCE</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            value={titre}
                            style={styles.input}
                            multiline = {true}
                            onChangeText={setTitre}
                            placeholder="Ford Mustang des années 2000"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15 ,fontSize: Dimensions.get('window').height / 50, color: 'white'}}>MARQUE</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            value={marque}
                            style={styles.input}
                            onChangeText={setMarque}
                            numberOfLines={1}
                            placeholder="Ford"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15,fontSize: Dimensions.get('window').height / 50, color: 'white'}}>MODÈLE</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={modele}
                            style={styles.input}
                            onChangeText={setModele}
                            numberOfLines={1}
                            placeholder="Mustang"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, color: 'white'}}>TYPE DE VÉHICULE</Text>
                    <View style={styles.inputContainer}>
                        
                        <Picker
                            selectedValue={type}
                            onValueChange={setType}
                            style={styles.input}
                            numberOfLines={1}
                        >
                            <Picker.Item label="4x4, Suv" value="4x4, Suv" />
                            <Picker.Item label="Berline" value="Berline" />
                            <Picker.Item label="Break" value="Break" />
                            <Picker.Item label="Cabriolet" value="Cabriolet" />
                            <Picker.Item label="Citadine" value="Citadine" />
                            <Picker.Item label="Coupé" value="Coupé" />
                            <Picker.Item label="Minibus" value="Minibus" />
                            <Picker.Item label="Monospace" value="Monospace" />
                            <Picker.Item label="Pick-up" value="Pick-up" />
                            <Picker.Item label="Voiture société, commerciale" value="Voiture société, commerciale" />
                            <Picker.Item label="Sportive" value="Sportive" />
                            <Picker.Item label="Autre" value="Autre" />
                        </Picker>

                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, color: 'white'}}>CARBURANT</Text>
                    <View style={styles.inputContainer}>
                        
                        <Picker
                            selectedValue={carburant}
                            onValueChange={setCarburant}
                            style={styles.input}
                            numberOfLines={1}
                        >
                            <Picker.Item label="Essence" value="Essence" />
                            <Picker.Item label="Diesel" value="Diesel" />
                            <Picker.Item label="Hybride" value="Hybride" />
                            <Picker.Item label="Electrique" value="Electrique" />
                            <Picker.Item label="GPL" value="GPL" />
                            <Picker.Item label="Autre" value="Autre" />
                        </Picker>

                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15,fontSize: Dimensions.get('window').height / 50, color: 'white'}}>ANNÉE DU MODÈLE</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={anneeModele}
                            style={styles.input}
                            onChangeText={setAnneeModele}
                            keyboardType={"numeric"}
                            numberOfLines={1}
                            placeholder="2019"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15 ,fontSize: Dimensions.get('window').height / 50, color: 'white'}}>KILOMÉTRAGE</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={kilometrage}
                            style={styles.input}
                            numberOfLines={1}
                            onChangeText={setKilometrage}
                            keyboardType={"numeric"}
                            placeholder="50000"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15 ,fontSize: Dimensions.get('window').height / 50, color: 'white'}}>PUISSANCE FISCALE</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={puissanceFisc}
                            style={styles.input}
                            numberOfLines={1}
                            onChangeText={setPuissanceFisc}
                            keyboardType={"15"}
                            placeholder="19"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15 ,fontSize: Dimensions.get('window').height / 50,color: 'white'}}>PUISSANCE DYNAMIQUE</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={puissanceDynamique}
                            style={styles.input}
                            numberOfLines={1}
                            onChangeText={setPuissanceDynamique}
                            keyboardType={"numeric"}
                            placeholder="300"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50,color: 'white'}}>NOMBRE DE PORTES</Text>
                    <View style={styles.inputContainer}>
                        
                        <Picker
                            selectedValue={nbPortes}
                            onValueChange={setNbPortes}
                            style={styles.input}
                            numberOfLines={1}
                           
                        >
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6 ou plus" value="6 ou plus" />
                        </Picker>

                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, color: 'white'}}>NOMBRE DE PLACES</Text>
                    <View style={styles.inputContainer}>
                        
                        <Picker
                            selectedValue={nbPlaces}
                            onValueChange={setNbPlaces}
                            style={styles.input}
                            numberOfLines={1}
                        >
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                            <Picker.Item label="7 ou plus" value="7 ou plus" />
                        </Picker>

                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15 ,fontSize: Dimensions.get('window').height / 50, color: 'white'}}>COULEUR</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={couleur}
                            style={styles.input}
                            numberOfLines={1}
                            onChangeText={setCouleur}
                            placeholder="rouge"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, color: 'white'}}>BOÎTE DE VITESSE</Text>
                    <View style={styles.inputContainer}>
                        
                        <Picker
                            selectedValue={boite}
                            onValueChange={setBoite}
                            style={styles.input}
                            numberOfLines={1}
                        >
                            <Picker.Item label="Manuelle" value="Manuelle" />
                            <Picker.Item label="Automatique" value="Automatique" />
                        </Picker>

                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, color: 'white'}}>Crit'air</Text>
                    <View style={styles.inputContainer}>
                        
                        <Picker
                            selectedValue={critair}
                            onValueChange={setCritair}
                            style={styles.input}
                            numberOfLines={1}
                        >
                          <Picker.Item label="0" value="0" />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                        </Picker>

                    </View>
                    <Text style={{ color: 'white', textAlign: 'center', marginTop: Dimensions.get('window').height / 20, fontSize: Dimensions.get('window').height / 25, fontWeight: 'bold', marginBottom:20 }}>Ajoutez trois photos !</Text>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, color: 'white'}}>IMAGE 1</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btno1} onPress={() => takePhotoFromCamera1()}>
                            <Text>prendre une photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btno2} onPress={() => choosePhotoFromLibrary1()}>
                            <Text>choisir une photo</Text>
                        </TouchableOpacity>
                  
                    </View>
                    {image1 != null ? <Image
                  
                    source={{uri: image1}} style={styles.image}
                    /> : <Image
                  
                    source={require('../assets/pasphoto.png')} style={styles.image}
                    /> }
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, color: 'white'}}>IMAGE 2</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btno1} onPress={() => takePhotoFromCamera2()}>
                            <Text>prendre une photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btno2} onPress={() => choosePhotoFromLibrary2()}>
                            <Text>choisir une photo</Text>
                        </TouchableOpacity>
                  
                    </View>
                    {image2 != null ? <Image
                  
                    source={{uri: image2}} style={styles.image}
                    /> : <Image
                  
                    source={require('../assets/pasphoto.png')} style={styles.image}
                    /> }
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: Dimensions.get('window').height / 50, color: 'white'}}>IMAGE 3</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btno1} onPress={() => takePhotoFromCamera3()}>
                            <Text>prendre une photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btno2} onPress={() => choosePhotoFromLibrary3()}>
                            <Text>choisir une photo</Text>
                        </TouchableOpacity>
                  
                    </View>
                    {image3 != null ? <Image
                  
                    source={{uri: image3}} style={styles.image}
                    /> : <Image
                  
                    source={require('../assets/pasphoto.png')} style={styles.image}
                    /> }
                    
                    <Text style={{ fontWeight: 'bold', marginLeft: 15 ,fontSize: Dimensions.get('window').height / 50, color: 'white', marginTop: 30}}>PRIX</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={prix}
                            style={styles.input}
                            numberOfLines={1}
                            onChangeText={setPrix}
                            placeholder="30000"
                        />
                    </View>
                     
                    <Text style={{ fontWeight: 'bold', marginLeft: 15 ,fontSize: Dimensions.get('window').height / 50, color: 'white'}}>DESCRIPTION</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={description}
                            style={styles.input}
                            multiline={true}
                            onChangeText={setDescription}
                            placeholder="c'est une très belle voiture..."
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}

                    >
                        <Text style={{ color: '#ffffff', fontWeight: 'bold' }} onPress={()=> submitPost()}>DÉPOSER L'ANNONCE</Text>
                    </TouchableOpacity>
                    
                   

                </View>
                
              </ScrollView>
              <FootBar/>
        </Animatable.View>
    );
};

export default AddAnnonce;

const styles = StyleSheet.create({
    buttons: {
        flex:1,
        flexDirection: 'row',
        alignContent: "space-between",
        flexWrap: 'wrap'
    },
    btno1: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        marginLeft: Dimensions.get('screen').width /12,
        width: Dimensions.get('screen').width /2.5
    },
    btno2: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        width: Dimensions.get('screen').width /2.5
    },
    image:{
        resizeMode: 'contain',
        width: Dimensions.get('screen').width,
        height: 300
    //     width: '100%',
    // height: 400,
    // marginBottom: 15
    },
    bottomView: {
        flex: 1.5,
        backgroundColor: 'black',
    },

    button: {
        alignItems: "center",
        backgroundColor: "green",
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 20,
        marginBottom: 30
    },

    btn: {
      alignItems: "center",
      backgroundColor: "red",
      padding: 10,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10,
      marginBottom: 20,
      borderRadius: 20
  },

    inputContainer: {
        marginTop: Dimensions.get('window').height / 100,
        marginBottom: Dimensions.get('window').height / 200,
        marginLeft: Dimensions.get('window').height / 40,
        marginRight: Dimensions.get('window').height / 40,
        height: Dimensions.get('window').height / 15,
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: Dimensions.get('window').height / 40,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },



});

