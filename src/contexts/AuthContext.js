import React, { Component } from 'react';
import firebase from '../firebase/firebaseApp';
import "firebase/auth";
import { loginUserHandlerAsync } from '../services/userService';
const AuthContext = React.createContext();

const provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().useDeviceLanguage();
// provider.setCustomParameters({
//     'login_hint': 'fedoseev.nn@gmail.com'
// });


function getUserObject(obj) {
    const inst = obj || firebase.auth().currentUser;
    if (!inst) {return {};}
    return { uid: inst.uid, displayName: inst.displayName, photoURL: inst.photoURL, email: inst.email }
}

class AuthProvider extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        const { user, setUser } = this.context;
        firebase.auth().onAuthStateChanged(data => {
            if (data && data.uid) {
                const udata = getUserObject(data);
                this.setState({ user: udata });
                loginUserHandlerAsync(data.uid, udata).then(res => console.log('Userdata in db updated', res))
            } else {
                this.setState({ user: {} })
            }
        })
    }

    loginHandler = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                firebase.auth().signInWithPopup(provider).then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    this.setState({ user: getUserObject(user)});

                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...

                    console.log("Error", errorCode, errorMessage, email, credential)
                });
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

    logoutHandler = () => {
        const { user, setUser } = this.context;
        firebase.auth().signOut().then(function() {
            this.setState({ user: {}})
        }).catch(function(error) {
            // An error happened.
        });
    }

    // Method to update state
    setUser = user => {
        this.setState(prevState => ({ user }))
    }

    render() {
        const { children } = this.props
        const { user } = this.state
        const { setUser } = this

        return (
            <AuthContext.Provider
                value={{
                    user,
                    loginHandler: () => this.loginHandler(),
                    logoutHandler: () => this.logoutHandler()
                }}
            >
                {children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContext

export { AuthProvider }
