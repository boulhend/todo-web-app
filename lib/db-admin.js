import { db as firebase } from './firebase-admin';
export async function getAllTodos() {
    let allTodos = [];
    const res = await firebase.collection("todos").get();
    res.forEach((e) => allTodos.push(e.data()));
    return allTodos;
  }