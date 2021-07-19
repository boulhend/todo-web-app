import { Button, Text, Link, Flex, Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { CalendarIcon } from '@chakra-ui/icons';
import { useState,forwardRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';


const AddTask = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dateFormat=(date)=>format(date, 'MM/dd/yyyy');
  const  CustomInput=forwardRef(({ value, onClick }, ref)=> {
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
            :dateFormat(startDate)}
        </Text>
      </Flex>
    );
  })
  return (
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
      />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={<CustomInput />}
          selfAlign="start"
        />
    </Flex>
  );
};

export default AddTask;
