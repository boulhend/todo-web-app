import { Button, Text, Link, Flex, Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { CalendarIcon } from '@chakra-ui/icons';
import { useState, forwardRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useAuth } from '../lib/auth';
import { createTodo } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';
const AddTask = ({ toggle, handleToggle, data, setData }) => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [todoInput, setTodoInput] = useState('');
  const dateFormat = (date) => format(date, 'MM/dd/yyyy');

  const handleSumbmit = () => {
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

  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <Flex
        border="1px"
        borderColor="gray.400"
        borderRadius="md"
        paddingX="2"
        paddingY="1"
        minWidth="5rem"
        marginTop="2"
        justifyItems="center"
        alignItems="center"
        _hover={{ cursor: 'pointer', backgroundColor: 'gray.100' }}
        onClick={onClick}
        ref={ref}
      >
        <CalendarIcon boxSize="4" />
        <Text marginLeft="1" fontSize="sm">
          {dateFormat(startDate) === dateFormat(new Date())
            ? 'Today'
            : dateFormat(startDate)}
        </Text>
      </Flex>
    );
  });
  return (
    <Flex flexDirection="column">
      <Flex
        w="40rem"
        flexDirection="column"
        backgroundColor="white"
        padding="3"
        border="1px"
        borderRadius="md"
        borderColor="gray.200"
        alignItems="start"
      >
        <Input
          type="text"
          placeholder="Write a todo here"
          border="none"
          paddingLeft="0"
          focusBorderColor="none"
          outline="none"
          minWidth="100%"
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={<CustomInput />}
          selfAlign="start"
        />
      </Flex>
      <Flex marginTop="0.8rem">
        <Button
          size="sm"
          backgroundColor="#dd4b39"
          _hover={{ opacity: '0.8' }}
          color="white"
          fontWeight="normal"
          disabled={todoInput === '' ? true : false}
          onClick={handleSumbmit}
        >
          Add Task
        </Button>
        <Button
          size="sm"
          variant="ghost"
          fontWeight="normal"
          onClick={() => handleToggle(!toggle)}
        >
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddTask;
