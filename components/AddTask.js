import TodoBody from './TodoBody';
import { useState,useContext, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { createTodo } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';
import dateFormat from '../utils/useDateformat';
import { useToast } from '@chakra-ui/react';
import DateContext from '../utils/DateContext';
const AddTask = ({ toggle, handleToggle, data, setData }) => {
  const { user } = useAuth();
  const toast = useToast();
  const todosDate = useContext(DateContext);
  const [startDate, setStartDate] = useState(new Date());
  const [todoInput, setTodoInput] = useState('');
  
  const handleSubmit = () => {
    const id = uuidv4();
    const createdAt = dateFormat(startDate);
        const newTodo = {
      id,
      uid: user.uid,
      todo: todoInput,
      createdAt,
      completed: false
    };
    if (newTodo.createdAt === todosDate) {
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
  useEffect(()=>{
    if(todosDate !== undefined){
      setStartDate(new Date(todosDate.replaceAll('-','/')))
    }
  },[todosDate])
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
