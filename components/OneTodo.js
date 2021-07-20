import { Flex, Box } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import UpdateTask from './UpdateTask';
import { useState } from 'react';
const OneTodo = ({
  todo:{id,todo,createdAt},
  data,
  setData
}) => {
  const [editTodo, setEditTodo] = useState(false);
  const handleEdit = () => {
    setEditTodo(!editTodo);
  };
  return (
    <Flex
      minHeight="3rem"
      borderTop="1px"
      borderBottom="0.5px"
      borderColor="gray.300"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      paddingY="0.7rem"
    >
      {editTodo ? (
        <UpdateTask
          toggle={editTodo}
          handleToggle={setEditTodo}
          data={data}
          setData={setData}
          todoId={id}
          startInput={todo}
          newDate={new Date(createdAt)}
        />
      ) : (
        <>
          <Checkbox size="md" colorScheme="orange">
            {todo}
          </Checkbox>
          <Box>
            <EditIcon
              cursor="pointer"
              boxSize="5"
              marginRight="1rem"
              onClick={handleEdit}
            />
            <DeleteIcon cursor="pointer" boxSize="5" color="tomato" />
          </Box>
        </>
      )}
    </Flex>
  );
};

export default OneTodo;
