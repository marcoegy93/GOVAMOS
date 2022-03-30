import React,{useEffect, useState} from 'react';
import { Text, Button, TextInput, Alert, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';
import Firebase from '../util/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../firebase';

const LoginScreen = ({ navigation}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState();

    const connexion = () => {
        
        if(email=='' || password==''){
            alert("Remplissez bien tous les champs");
        }else{
            Firebase.connexion(email,password)
            .then(()=> {
                alert("Heureux de vous revoir ! Connexion  réussie !");
            })
            .catch((e) =>{
                console.log("erreur origine" + e);
                alert("Email/mot de passe incorrect.");  

            })
        }
        
    }
    useEffect(() => {
        const loggedIn = onAuthStateChanged(auth, user => {
            if(user){
                navigation.navigate('HomeScreen',{
                    userId: user.uid
                });
            }
        })
        return loggedIn;
    }, [])

    return (
        <Animatable.View animation="fadeInUpBig" duration={1500} style={{ flex: 1, backgroundColor: '#ffffff' }}
            showsVerticalScrollIndicator={false}>
            <ImageBackground
                source={require('../assets/porsche.png')}

                style={{
                    height: Dimensions.get('window').height / 3.5,
                    width: '100%',
                    marginBottom: Dimensions.get('window').height / 25,
                    marginTop: Dimensions.get('window').height / 15
                }}>

            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{ padding: Dimensions.get('window').height / 50}}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: Dimensions.get('window').height / 22, fontWeight: 'bold' }}>Bienvenue !</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 20 , color: 'white'}}>EMAIL</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconStyle}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </View>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            numberOfLines={1}
                            placeholder="prenom.nom@[etu.]u-paris.fr"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 20, color: 'white'}}>MOT DE PASSE</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconStyle}>
                            <FontAwesomeIcon icon={faLock} />
                        </View>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            numberOfLines={1}
                            placeholder="•••••••••••"
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => connexion()}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>CONNEXION</Text>
                    </TouchableOpacity>
                    
                    <Text style={{ textAlign: 'center', color: 'white'}}>Vous n'avez pas de compte ? </Text>
                    <Text onPress={() => navigation.navigate('Subscribe')} style={{ textAlign: 'center', color: '#00BFFF', fontWeight: 'bold' }} >Créez-en un !</Text>



                </View>

            </View>
        </Animatable.View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    bottomView: {
        flex: 1.5,
        backgroundColor: 'black',
        height: 10,//Dimensions.get('window').height,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60
    },

    button: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: Dimensions.get('window').height / 70,
        marginBottom: Dimensions.get('window').height / 100,
        borderRadius: 20
    },

    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        height: Dimensions.get('window').height / 13,
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
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },



});
