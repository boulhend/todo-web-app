import { Heading, Button, Text, Link, Avatar, Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { Logo } from '../../styles/theme';
import { useAuth } from '../../lib/auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getUserTodos, getAllUser } from '../../lib/db-admin';
import dateFormat from '../../utils/useDateformat';
import AddTask from '../../components/AddTask';
import OneTodo from '../../components/OneTodo';
const Todo = ({ userTodos }) => {
  const auth = useAuth();
  const router = useRouter();
  const TODAY = dateFormat(new Date());
  const [toggleAddTask, setToggleAddTask] = useState(false);
  const [data, setData] = useState([]);
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
  useEffect(() => {
    if (userTodos !== undefined) {
      setData(() => userTodos.filter((todo) => todo.createdAt === TODAY));
    }
  }, []);
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
            minHeight="100vh"
            justifyContent="center"
            width="100%"
          >
            <Flex flexDirection="column" width="100%">
              <Flex alignItems="baseline">
                <Heading
                  fontSize="lg"
                  fontWeight="bold"
                  marginBottom="1rem"
                  marginRight="0.5rem"
                >
                  TODAY
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  {TODAY}
                </Text>
              </Flex>

              {data &&
                data.map((todo) => (
                  <OneTodo
                    key={JSON.stringify(todo.id)}
                    toggle={toggleAddTask}
                    handleToggle={setToggleAddTask}
                    todo={todo}
                    data={data}
                    setData={setData}
                    alignSelf="stretch"
                  />
                ))}
              {toggleAddTask && (
                <AddTask
                  toggle={toggleAddTask}
                  handleToggle={setToggleAddTask}
                  data={data}
                  setData={setData}
                />
              )}
              {!toggleAddTask && (
                <Button
                  variant="ghost"
                  size="md"
                  color="#dd4b39"
                  mt={3}
                  _hover={{ bg: 'gray.100' }}
                  leftIcon={<AddIcon w={3} h={3} mb={1} />}
                  alignSelf="start"
                  onClick={() => setToggleAddTask(!toggleAddTask)}
                >
                  Add task
                </Button>
              )}
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
  const users = await getAllUser();

  const paths = users.map((user) => ({
    params: { uid: user.uid }
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const userTodos = await getUserTodos(params.uid);
  return {
    props: {
      userTodos
    } // will be passed to the page component as props
  };
}

export default Todo;
