import React from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import CustomDateInput from "./CustomDateInput"
import 'react-datepicker/dist/react-datepicker.css';
const TodoBody = ({children,todoInput,setTodoInput,startDate,setStartDate,handleSubmit,toggle,handleToggle}) => {
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
          value={todoInput}
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={<CustomDateInput startDate={startDate} />}
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
          onClick={handleSubmit}
        >
          {children}
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

export default TodoBody;
