import { firebase } from '../firebase/config'
import Store from '../../store'
const Users = {
    login: (user) => {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    console.log("firebase login", res);
                    resolve(res)
                })
                .catch((err) => {
                    console.log("firebase login failed", err);
                    reject(err)
                })
        })
    },
    register: (user) => {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    const cuser = firebase.auth().currentUser;
                    if (cuser) {
                        console.log("full name", user.first_name + ' ' + user.last_name)
                        cuser.updateProfile({
                            displayName: user.first_name + ' ' + user.last_name,
                            photoURL: 'https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg'
                        }).then((user) => {
                            resolve(user)
                        })
                    }
                })
                .catch((err) => {
                    console.log("firebase login failed", err);
                    reject(err)
                })
        })
    },
    isLoggedIn: function() {
        return new Promise((resolve) => {
            if (firebase.auth().currentUser) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    },
    logout: function() {
        firebase.auth().signOut()
            .then(() => {
                Store.commit('updateUser', {})
            })
    }
}
export default Users