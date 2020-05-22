import firebase from '../firebase/firebaseApp';
import "firebase/database";

const  database = firebase.database();


export function dbCreate(ref, data) {
    return firebase.database().ref(ref).set(data);
}

export function dbRead(ref) {
    return firebase.database().ref(ref).once('value');
}

export function dbUpdate(refsPathObject) {
    return firebase.database().ref().update(refsPathObject);
}

export function dbDelete(ref) {
    return firebase.database().ref(ref).remove();
}

export default {
    dbCreate, dbRead, dbUpdate, dbDelete
}
