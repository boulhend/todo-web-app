import { Heading, Button, Link, Avatar, Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { Logo } from '../../../styles/theme';
import { useAuth } from '../../../lib/auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getUserTodos } from '../../../lib/db-admin';
import dateFormat from '../../../utils/useDateformat';
import AddTask from '../../../components/AddTask';
import OneTodo from '../../../components/OneTodo';
import CustomDateInput from '../../../components/CustomDateInput';
import Loading from '../../../components/Loading';
import DatePicker from 'react-datepicker';
import DateContext from '../../../utils/DateContext';
import { format } from 'date-fns';
const Todo = ({ userTodos, todosDate }) => {
  const auth = useAuth();
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [toggleAddTask, setToggleAddTask] = useState(false);
  const [data, setData] = useState([]);
  const [titleDate, setTitleDate] = useState('');
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
      setData(() => userTodos.filter((todo) => todo.createdAt === todosDate));
    }
    if (todosDate !== undefined) {
      setTitleDate(
        format(new Date(todosDate.replaceAll('-', '/')), 'EEE dd MMM yyyy')
      );
    }
  }, [userTodos, titleDate]);

  useEffect(() => {
    if (todosDate !== undefined) {
      setStartDate(new Date(todosDate.replaceAll('-', '/')));
    }
  }, [todosDate]);

  if (router.isFallback) {
    return <Loading />;
  }
  if (userTodos === undefined || todosDate === undefined) {
    return <Loading />;
  }
  return (
    <>
      {auth.user ? (
        <DateContext.Provider value={todosDate}>
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
                <Flex justifyContent="space-between" marginBottom="1rem">
                  <Flex alignItems="baseline">
                    <Heading
                      fontSize="lg"
                      fontWeight="bold"
                      marginBottom="1rem"
                      marginRight="0.5rem"
                      color="gray.500"
                    >
                      {titleDate}
                    </Heading>
                  </Flex>
                  <Flex>
                    <DatePicker
                      selected={startDate}
                      customInput={<CustomDateInput />}
                      minDate={new Date()}
                      onChange={(e) =>
                        router.push(`/todo/${auth.user.uid}/${dateFormat(e)}`)
                      }
                    />
                  </Flex>
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
                {toggleAddTask ? (
                  <AddTask
                    toggle={toggleAddTask}
                    handleToggle={setToggleAddTask}
                    data={data}
                    setData={setData}
                  />
                ) : (
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
        </DateContext.Provider>
      ) : (
        <Loading />
      )}
    </>
  );
};

/* export async function getStaticPaths() {
  const users = await getAllUser();
  //Create seven week dates
  const dates = [];
  for (let i = 1; i < 7; i++) {
    dates.push(dateFormat(new Date(Date.now() + i * (3600 * 1000 * 24))));
  }
  //Genarates seven day todo for each user
  const paths = users
    .map((user) => dates.map((date) => ({ params: { uid: user.uid, date } })))
    .flat();
  return { paths, fallback: true };
} */

export async function getServerSideProps({ params }) {
  console.log(params.uid)
  const userTodos = await getUserTodos(params.uid, params.date);
  return {
    props: {
      userTodos,
      todosDate: params.date
    }
  }
}

export default Todo;
