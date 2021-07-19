import { Heading, Button, Text, Link, Avatar, Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { Logo } from '../styles/theme';
import { useAuth } from '../lib/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AddTask from '../components/AddTask';

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
              <AddTask/>
              <Button
                variant="ghost"
                size="md"
                color="#dd4b39"
                mt={3}
                _hover={{ bg: 'gray.100' }}
                leftIcon={<AddIcon w={3} h={3} mb={1} />}
                alignSelf="start"
              >
                Add task
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Text>Loding</Text>
      )}
    </>
  );
};

/* export async function getStaticProps(context) {
  const allTodos = await getAllTodos();
  return {
    props: {
      allTodos
    } // will be passed to the page component as props
  };
} */

export default todo;
