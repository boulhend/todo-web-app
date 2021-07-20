import { Flex,Box } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import AddTask from "./AddTask"
import { useState } from 'react';
const OneTodo = ({ todo,todoId }) => {
const [editTodo,setEditTodo]=useState(false)
const handleEdit=()=>{
    setEditTodo(!editTodo)
}
  return (
    <Flex
      h="3rem"
      borderTop="1px"
      borderBottom="0.5px"
      borderColor="gray.300"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
        
      <Checkbox size="md" colorScheme="orange">
        {todo.todo}
      </Checkbox>
      <Box>
        <EditIcon cursor="pointer" boxSize="5" marginRight="1rem" onClick={handleEdit} />
        <DeleteIcon cursor="pointer" boxSize="5" color="tomato" />
      </Box>
    </Flex>
  );
};

export default OneTodo;
