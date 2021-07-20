import TodoBody from './TodoBody';
import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { createTodo } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';
import dateFormat from '../utils/useDateformat';
import { useToast } from '@chakra-ui/react';
const AddTask = ({ toggle, handleToggle, data, setData }) => {
  const { user } = useAuth();
  const toast = useToast();
  const [startDate, setStartDate] = useState(new Date());
  const [todoInput, setTodoInput] = useState('');
  const handleSubmit = () => {
    const id = uuidv4();
    const createdAt = dateFormat(startDate);
    const TODAY = dateFormat(new Date());
    const newTodo = {
      id,
      uid: user.uid,
      todo: todoInput,
      createdAt,
      completed: false
    };
    if (newTodo.createdAt === TODAY) {
      setData([...data, newTodo]);
    }
    createTodo(id, newTodo);
    setTodoInput('');
    toast({
      title: 'Todo added successfully',
      description: `Todo date: ${
        createdAt === dateFormat(new Date()) ? 'Today' : createdAt
      }`,
      status: 'success',
      duration: 4000,
      isClosable: true
    });
  };

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
      Add task
    </TodoBody>
  );
};

export default AddTask;
