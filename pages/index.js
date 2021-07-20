import { Flex, Link, Box, Heading, Text } from '@chakra-ui/react';
import { useAuth } from '../lib/auth';
import { Logo, Github, Google } from '../styles/theme';
import { useRouter } from 'next/router';
import SignInButton from '../components/SignInButton';
import { useEffect } from 'react';
export default function Home() {
  const auth = useAuth();
  const router = useRouter();
  if (auth.user) {
    router.push(`/todo/${auth.user.uid}`);
    return <Text>Loading ...</Text>;
  }
  return (
    <Flex
      backgroundColor="gray.50"
      alignItems="start"
      justifyContent="center"
      paddingTop="40"
      w="100vw"
      minHeight="100vh"
    >
      <Flex
        flexDirection="column"
        backgroundColor="white"
        padding="10"
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
      >
        <Flex alignItems="center" marginBottom="5">
          <Logo boxSize={8} color="black" />
          <Text fontWeight="bold" fontSize="sm">
            Organize it all with TODO
          </Text>
        </Flex>
        <Heading fontSize="x-large" fontWeight="bold" paddingBottom="2">
          Sign in
        </Heading>
        <SignInButton
          handleClick={async () => {
            await auth.signinWithGithub();
            router.push('/');
          }}
          leftIcon={<Github fill="gray.900" boxSize={5} mb={1} mr={1} />}
        >
          Sign in with Github
        </SignInButton>
        <SignInButton
          handleClick={async () => {
            await auth.signinWithGoogle();
            router.push('/');
          }}
          leftIcon={<Google fill="gray.900" boxSize={5} mb={1} mr={1} />}
        >
          Sign in with Google
        </SignInButton>
      </Flex>
    </Flex>
  );
}
