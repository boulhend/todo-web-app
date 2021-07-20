import { Heading, Button, Text, Link, Avatar, Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { Logo } from '../../styles/theme';
import { useAuth } from '../../lib/auth';
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import {getUserTodos,getAllUser} from "../../lib/db-admin"
import AddTask from '../../components/AddTask';

const todo = ({userTodos}) => {
  const auth = useAuth();
  const router = useRouter();
  const [toggleAddTask,setToggleAddTask]=useState(false)
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (!auth.user) {
      router.push('/');
    }
  }, [auth.user]);

  return (
    <>
      {auth.user ? (
        <Flex flexDirection="column" w="100vw">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            boxShadow="lg"
            padding="3"
            paddingX="20rem"
          >
            <NextLink href="/" cursor="pointer" passHref>
              <Link>
                <Logo boxSize="10" />
              </Link>
            </NextLink>
            <Flex alignItems="center">
              <Link mr={3} onClick={handleLogout}>
                Log out
              </Link>
              <Avatar src={auth.user?.photoURL} />
            </Flex>
          </Flex>

          <Flex
            backgroundColor="gray.50"
            paddingY="2rem"
            paddingX="20rem"
            justifyContent="start"
            minHeight="100vh"
          >
            <Flex flexDirection="column">
              <Heading fontSize="md" marginBottom="1rem">Todos</Heading>
              {userTodos && userTodos.map(todo=><Text>{todo.todo}</Text>)}
              {toggleAddTask && <AddTask toggle={toggleAddTask} handleToggle={setToggleAddTask}/>}
              {!toggleAddTask &&<Button
                variant="ghost"
                size="md"
                color="#dd4b39"
                mt={3}
                _hover={{ bg: 'gray.100' }}
                leftIcon={<AddIcon w={3} h={3} mb={1} />}
                alignSelf="start"
                onClick={()=>setToggleAddTask(!toggleAddTask)}
              >
                Add task
              </Button>}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Text>Loding</Text>
      )}
    </>
  );
};
export async function getStaticPaths() {
    const users = await getAllUser()
  
    const paths = users.map((user) => ({
      params: { uid: user.uid },
    }))
    return { paths, fallback: true }
}

export async function getStaticProps({params}) {
    const userTodos=await getUserTodos(params.uid)
    return {
      props: {
          userTodos
      }, // will be passed to the page component as props
    }
  }

export default todo;
