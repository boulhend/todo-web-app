import firebase from './firebase';
import 'firebase/firestore';
const firestore = firebase.firestore();
export function createUser(uid,data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
export function createTodo(id,data) {
  return firestore
  .collection('todos')
  .doc(id)
  .set(data, { merge: true });
}
export function updateTodo(id,data) {
  return firestore.collection('todos').doc(id).update(data)
}
export function deleteTodo(id) {
  return firestore.collection('todos').doc(id).delete()
}
