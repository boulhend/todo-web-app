import { Box, Button, Text, Link, Avatar, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useAuth } from '../lib/auth';
import { useRouter } from 'next/router';
import { getAllTodos } from '../lib/db-admin';
import { useEffect } from 'react';

const todo = ({ allTodos }) => {
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
  useEffect(()=>{
    if(!auth.user){
      router.push('/login');
    }
  },[auth.user])
  
  return (
    <>
      {auth.user ? (
        <Flex flexDirection="column" w="100vw" backgroundColor="gray.50">
          <Box>
            <Flex justifyContent="space-around" alignItems="center">
              <NextLink href="/" passHref>
                <Link mr={3} onClick={handleLogout}>
                  Log out
                </Link>
              </NextLink>
              <Avatar src={auth.user?.photoURL} />
            </Flex>
          </Box>
          <Box>
            {allTodos.map((todo) => (
              <Text>{todo.name}</Text>
            ))}
          </Box>
        </Flex>
      ) : (
        <Text>Loding</Text>
      )}
    </>
  );
};

export async function getStaticProps(context) {
  const allTodos = await getAllTodos();
  return {
    props: {
      allTodos
    } // will be passed to the page component as props
  };
}

export default todo;
