import { Flex, Text,Spinner } from '@chakra-ui/react';
const Loading =()=>{
    return(
        <Flex justifyContent="center" alignItems="center" flexDirection="column" w="100vw" h="100vh">
            <Spinner size="xl" color="red.600" w="9rem" h="9rem"/>
            <Text color="gray.500" fontSize="xl" marginTop="1rem">Loading ...</Text>
        </Flex>
        
    )
}

export default Loading