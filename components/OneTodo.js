import { Flex, Box, Text } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import UpdateTask from './UpdateTask';
import { useState } from 'react';
import { deleteTodo, updateTodo } from '../lib/db';
const OneTodo = ({
  todo: { id, todo, createdAt, completed },
  data,
  setData
}) => {
  const [editTodo, setEditTodo] = useState(false);
  const [hideEdit, setHideEdit] = useState(() => (!completed ? true : false));
  const handleEdit = () => {
    setEditTodo(!editTodo);
  };
  const handleDelete = () => {
    const newData = data.filter((todo) => todo.id !== id);
    setData(newData);
    deleteTodo(id);
  };
  const handleCompletion = () => {
    setHideEdit(!hideEdit);
    const newData = data.map((todo) => {
      if (todo.id === id) {
        todo.completed = true;
      }
      return todo;
    });
    setData(newData);
    updateTodo(id, { completed: true });
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
          newDate={new Date(createdAt.replaceAll('-','/'))}
        />
      ) : (
        <>
          <Checkbox
            size="md"
            colorScheme="orange"
            onChange={handleCompletion}
            isDisabled={!hideEdit ? true : false}
          >
            <Text as={!hideEdit ? 'del' : ''}>{todo}</Text>
          </Checkbox>
          <Box>
            {hideEdit && (
              <EditIcon
                cursor="pointer"
                boxSize="5"
                marginRight="1rem"
                onClick={handleEdit}
              />
            )}
            <DeleteIcon
              cursor="pointer"
              boxSize="5"
              color="tomato"
              onClick={handleDelete}
            />
          </Box>
        </>
      )}
    </Flex>
  );
};

export default OneTodo;
