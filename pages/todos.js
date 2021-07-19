import { Heading, Button, Text, Link, Avatar, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Logo } from '../styles/theme';
import { useAuth } from '../lib/auth';
import { useRouter } from 'next/router';
//import { getAllTodos } from '../lib/db-admin';
import { useEffect } from 'react';

const todo = () => {
  const auth = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (!auth.user) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      {auth.user ? (
        <Flex flexDirection="column" w="100vw">
          <Flex
            justifyContent="space-around"
            alignItems="center"
            boxShadow="lg"
            padding="3"
          >
            <NextLink href="/"cursor="pointer" passHref>
              <Link><Logo boxSize="10" /></Link>
            </NextLink>
            <Flex alignItems="center">
                <Link mr={3} onClick={handleLogout}>
                  Log out
                </Link>
              <Avatar src={auth.user?.photoURL} />
            </Flex>
          </Flex>

          <Flex backgroundColor="gray.50" flexDirection="column" paddingY="5" paddingX="20" justifyContent="start">
              <Heading fontSize="small">Todos</Heading>
              <Button>Add Task</Button>
          </Flex>
        </Flex>
      ) : (
        <Text>Loding</Text>
      )}
    </>
  );
};



export default todo;
