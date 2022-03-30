import React,{useState,useEffect} from 'react';
import { Text, Button, TextInput, Alert, ScrollView, ImageBackground, Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';
import Firebase from '../util/Firebase';
import * as firestore from 'firebase/firestore';


const Subscribe = ({ navigation}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [password2,setPassword2] = useState('');
    const [nom,setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [adresse, setAdresse] = useState();
    const [numero, setNumero] = useState();
    

    const inscription = () => {
        if(email=='' || password=='' || password2=='' || nom=='' || prenom=='' || adresse=='' || numero==''){
            alert("Remplissez bien tous les champs");
        }else{
            if(password != password2){
                alert("Les deux mot de passe sont différents !");
            }else{
                Firebase.inscription(email,password, nom, prenom, adresse, numero)
                .then(()=> {
                    alert("Bravo, vous vous êtes inscrit !");
                })
                .catch((e) =>{     
                    if(e=="FirebaseError: Firebase: Error (auth/invalid-email)."){
                        alert("Format de l'email incorrecte");
                    }else if(e=="FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."){
                        alert("Le mot de passe doit contenir au moins 6 caractères");
                    }else{
                        alert("email déjà présent dans la base, connectez-vous");
                    }
                });
                alert("Bravo, vous êtes inscrit");
            }
        }
    }

    return (
        <Animatable.View animation="fadeInUpBig" duration={1500} style={{ flex: 1, backgroundColor: '#ffffff' }}
            showsVerticalScrollIndicator={false}>
            <ImageBackground
                source={require('../assets/porsche.png')}

                style={{
                    height: Dimensions.get('window').height / 3.5,
                    width: '100%',
                    marginBottom: Dimensions.get('window').height / 50,
                    marginTop: Dimensions.get('window').height / 25
                }}>

            </ImageBackground>
            <View style={styles.bottomView}>
            <View style={{ padding: Dimensions.get('window').height / 100, }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: Dimensions.get('window').height / 25, fontWeight: 'bold' }}>Inscris-toi !</Text>
            </View>
            <ScrollView >
                <View>
                <Text style={{ fontWeight: 'bold', marginLeft: 20,color: 'white' }}>NOM</Text>

                <View style={styles.inputContainer}>
                    <View style={styles.iconStyle}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </View>
                    <TextInput
                        value={nom}
                        style={styles.input}
                        onChangeText={setNom}
                        numberOfLines={1}
                        placeholder="Balamon"
                    />
                </View>
                <Text style={{ fontWeight: 'bold', marginLeft: 20,color: 'white' }}>PRENOM</Text>

                <View style={styles.inputContainer}>
                    <View style={styles.iconStyle}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </View>
                    <TextInput
                        value={prenom}
                        style={styles.input}
                        onChangeText={setPrenom}
                        numberOfLines={1}
                        placeholder="Marco"
                    />
                </View>
                <Text style={{ fontWeight: 'bold', marginLeft: 20,color: 'white' }}>NUMERO</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.iconStyle}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </View>
                    <TextInput
                        value={numero}
                        style={styles.input}
                        onChangeText={setNumero}
                        numberOfLines={1}
                        placeholder="0781792491"
                    />
                </View>
                <Text style={{ fontWeight: 'bold', marginLeft: 20,color: 'white' }}>ADRESSE</Text>

                <View style={styles.inputContainer}>
                    <View style={styles.iconStyle}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </View>
                    <TextInput
                        value={adresse}
                        style={styles.input}
                        onChangeText={setAdresse}
                        numberOfLines={1}
                        placeholder="143 Avenue de Versailles"
                    />
                </View>
                <Text style={{ fontWeight: 'bold', marginLeft: 20,color: 'white' }}>EMAIL</Text>

                    <View style={styles.inputContainer}>
                        <View style={styles.iconStyle}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </View>
                        <TextInput
                            value={email}
                            style={styles.input}
                            onChangeText={setEmail}
                            numberOfLines={1}
                            placeholder="xyz@gmail.com"
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 20 ,color: 'white'}}>MOT DE PASSE</Text>
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
                    <Text style={{ fontWeight: 'bold', marginLeft: 20 ,color: 'white'}}>CONFIRMER LE MOT DE PASSE</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconStyle}>
                            <FontAwesomeIcon icon={faLock} />
                        </View>
                        <TextInput
                            value={password2}
                            onChangeText={setPassword2}
                            style={styles.input}
                            numberOfLines={1}
                            placeholder="•••••••••••"
                        />
                    </View>


                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => inscription()} 
                    >
                        <Text style={{ color: '#ffffff', fontWeight: 'bold', color: 'black'}}>INSCRIPTION</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', color: 'white', marginBottom: 40}}>Déja inscrit ? <Text onPress={() => navigation.navigate('Login')} style={{ textAlign: 'center', color: '#00BFFF', fontWeight: 'bold'}} >Connexion</Text></Text>




                </View>

            </ScrollView>
            </View>
        </Animatable.View>
    );
};

export default Subscribe;

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
