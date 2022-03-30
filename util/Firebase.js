
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import * as aut from 'firebase/auth';
import {auth} from '../firebase';
import {db} from '../firebase';
import {collection,addDoc} from 'firebase/firestore';

class Firebase {

    static connexion = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    };

    static inscription = async(email,password,nom, prenom, adresse, numero) => {
        return createUserWithEmailAndPassword(auth,email,password)
               .then((res) => {
                const ajout = {
                    userId: res.user.uid,
                    email: email,
                    password: password,
                    nom: nom,
                    prenom : prenom,
                    adresse: adresse,
                    numero: numero
               };
                addDoc(collection(db,'Users'), ajout);
            });
    };

    static deconnexion = () => {
        return signOut(auth);
    };

    static modifierPassword = (email) => {
        return aut.sendPasswordResetEmail(auth,email)
        .then(() => {
            alert('Regardez dans vos mails( checkez également vos spams')
          }).catch(function (e) {
            console.log(e)
          })
    }
};

export default Firebase;