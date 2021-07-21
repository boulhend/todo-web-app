import TodoBody from './TodoBody';
import { useState, useEffect, useContext } from 'react';
import dateFormat from '../utils/useDateformat';
import { updateTodo } from '../lib/db';
import { useToast } from '@chakra-ui/react';
import DateContext from '../utils/DateContext';
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
  const toast = useToast();
  const todosDate = useContext(DateContext);
  const handleSubmit = () => {
    const createdAt = dateFormat(startDate);
    //const todosDate = dateFormat(new Date());
    let newTodos = data.map((todo) => {
      if (todo.id === todoId) {
        todo.todo = todoInput;
        todo.createdAt = createdAt;
      }
      return todo;
    });

    if (createdAt !== todosDate) {
      const todosFiltred = newTodos.filter(
        (todo) => todo.createdAt === todosDate
      );
      setData(todosFiltred);
    } else {
      setData(newTodos);
    }
    updateTodo(todoId, { todo: todoInput, createdAt: dateFormat(startDate) });
    handleToggle(!toggle);
    toast({
      title: 'Todo updated successfully',
      description: `Todo date: ${
        createdAt === todosDate ? 'todosDate' : createdAt
      }`,
      status: 'success',
      duration: 4000,
      isClosable: true
    });
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
