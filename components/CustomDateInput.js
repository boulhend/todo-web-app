import { Text, Flex } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { forwardRef } from 'react';
import dateFormat from '../utils/useDateformat';
const CustomDateInput = forwardRef(({ startDate, onClick }, ref) => {
  return (
    <Flex
      border="1px"
      borderColor="gray.400"
      borderRadius="md"
      paddingX="2"
      paddingY="1"
      minWidth="5rem"
      marginTop="2"
      justifyItems="center"
      alignItems="center"
      _hover={{ cursor: 'pointer', backgroundColor: 'gray.100' }}
      onClick={onClick}
      ref={ref}
    >
      <CalendarIcon boxSize="4" />
      {startDate ?<Text marginLeft="1" fontSize="sm">
        {dateFormat(startDate) === dateFormat(new Date())
          ? 'Today'
          : dateFormat(startDate)}
      </Text>:<Text marginLeft="1" fontSize="sm">Choose a different date</Text>}
    </Flex>
  );
});
CustomDateInput.displayName = 'CustomDateInput';
export default CustomDateInput;
