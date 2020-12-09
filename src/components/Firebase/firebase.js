import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    /*
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    */
    apiKey: "AIzaSyAEOk0rz_Uaaqq3j3lbet2doU6uJo9tI5Q",
    authDomain: "socio-space.firebaseapp.com",
    databaseURL: "https://socio-space-default-rtdb.firebaseio.com",
    projectId: "socio-space",
    storageBucket: "socio-space.appspot.com",
    messagingSenderId: "3680768945",
    appId: "1:3680768945:web:d5c1e277ee6faa93a5e390",
    measurementId: "G-DWV4JFM7EL"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    // ** Auth API **
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    currUser = () => {return this.auth.currentUser.uid}

    // *** Comment and Discussion API *** 

    addComment = (disID, time, uid, text) => {
        this.db.ref(`discussions/${disID}/${time}`).set({
          user: uid,
          text: text,
        });
      }
    
    getDiscussion = (disID) => this.db.ref(`discussions/${disID}`);
    
    

    // *** Tweet Storage API ***

}

export default Firebase;