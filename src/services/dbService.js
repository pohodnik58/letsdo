import firebase from '../firebase/firebaseApp';
import "firebase/database";

const  database = firebase.database();


export function dbCreate(ref, data) {
    return firebase.database().ref(ref).set(data);
}

export function dbRead(ref) {
    return firebase.database().ref(ref).once('value');
}

export function dbReadSorted(ref, sortfield) {
    return firebase.database().ref(ref).orderByChild(sortfield).once('value');
}

export function dbUpdate(refsPathObject) {
    return firebase.database().ref().update(refsPathObject);
}

export function dbDelete(ref) {
    return firebase.database().ref(ref).remove();
}

export function dbGetNewKey(ref) {
    return firebase.database().ref(ref).push().key;
}

export function dbGetRef(ref) {
    return firebase.database().ref(ref);
}
export default {
    dbCreate, dbRead, dbUpdate, dbDelete, dbGetNewKey, dbReadSorted, dbGetRef
}
