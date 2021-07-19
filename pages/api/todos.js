import { getAllTodos } from "../../lib/database-admin";

export default async function todos(req, res) {
  try {
    const todos = await getAllTodos();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ err });
  }
}