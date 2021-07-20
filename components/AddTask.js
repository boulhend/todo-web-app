import TodoBody from './TodoBody';
import { useState} from 'react';
import { useAuth } from '../lib/auth';
import { createTodo } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';
import dateFormat from '../utils/useDateformat';
const AddTask = ({ toggle, handleToggle, data, setData }) => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [todoInput, setTodoInput] = useState('');
  const handleSubmit = () => {
    const id = uuidv4();
    const newTodo = {
      id,
      uid: user.uid,
      todo: todoInput,
      createdAt: dateFormat(startDate)
    };
    setData([...data, newTodo]);
    createTodo(id, newTodo);
    setTodoInput('')
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
