import TodoBody from './TodoBody';
import { useState, useEffect } from 'react';
import dateFormat from '../utils/useDateformat';
import { updateTodo } from '../lib/db';
const UpdateTask = ({
  todoId,
  toggle,
  handleToggle,
  data,
  setData,
  startInput,
  newDate
}) => {
  const [startDate, setStartDate] = useState(newDate);
  const [todoInput, setTodoInput] = useState(startInput);

  const handleSubmit = () => {
    let newTodos = data.map((todo) => {
      if (todo.id === todoId) {
        todo.todo = todoInput;
        todo.createdAt = dateFormat(startDate);
      }
      return todo;
    });
    setData(newTodos);
    updateTodo(todoId, { todo: todoInput, createdAt: dateFormat(startDate) });
    handleToggle(!toggle);
  };
  useEffect(() => {
    setTodoInput(startInput);
    setStartDate(newDate);
  }, []);

  return (
    <TodoBody
      todoInput={todoInput}
      setTodoInput={setTodoInput}
      startDate={startDate}
      setStartDate={setStartDate}
      handleSubmit={handleSubmit}
      toggle={toggle}
      handleToggle={handleToggle}
    >
      Update task
    </TodoBody>
  );
};

export default UpdateTask;
