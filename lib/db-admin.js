import { db as firebase } from './firebase-admin';
export async function getUserTodos(uid,date) {
    let userTodos = [];
    const res = await firebase.collection("todos").where('uid', '==', uid).where('createdAt','==',date)
    .get();
    res.forEach((e) => userTodos.push(e.data()));
    return userTodos;
  }
  export async function getAllUser() {
    let users = [];
    const res = await firebase.collection("users").get();
    res.forEach((e) => users.push(e.data()));
    return users;
  }