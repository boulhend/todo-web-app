
import {Button} from '@chakra-ui/react'
const SignInButton = ({children,handleClick,leftIcon}) => {
    return (
        <Button
          color="gray.900"
          backgroundColor="white"
          border="1px"
          borderColor="gray.200"
          mt={3}
          _hover={{ bg: 'gray.50' }}
          leftIcon={leftIcon}
          onClick={handleClick}
          px={28}
          py={6}
          fontSize="sm"
        >
          {children}
        </Button>
    )
}

export default SignInButton
