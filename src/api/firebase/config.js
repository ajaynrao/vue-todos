import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Store from '../../store'
var firebaseConfig = {
    apiKey: "AIzaSyA6-xUSWwJpJbHdefwkevGkNc2oRU_br9s",
    authDomain: "fir-firebase-fb3f6.firebaseapp.com",
    databaseURL: "https://fir-firebase-fb3f6-default-rtdb.firebaseio.com",
    projectId: "fir-firebase-fb3f6",
    storageBucket: "fir-firebase-fb3f6.appspot.com",
    messagingSenderId: "513720805299",
    appId: "1:513720805299:web:324ba29221d1680e8f0dc6",
    measurementId: "G-WJ6N4QG5NY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(firebaseUser => {
    Store.commit('updateUser', firebaseUser)
    localStorage.setItem("user", JSON.stringify(Store.state.user))
    console.log("user in api", Store.state.user)
})
export {
    firebase
}