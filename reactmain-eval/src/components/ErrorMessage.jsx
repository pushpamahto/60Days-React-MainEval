import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const ErrorMessage = ({ message }) => (
  <Box bg="red.500" p={4} borderRadius="md">
    <Text color="white">{message}</Text>
  </Box>
);

export default ErrorMessage;
