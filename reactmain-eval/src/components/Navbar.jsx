import React from 'react';
import { Box, Flex, Button, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex justifyContent="space-between" alignItems="center">
        {authState.isAuthenticated ? (
          <>
            <Text color="white">{authState.email}</Text>
            <Flex>
              <Link as={RouterLink} to="/home" color="white" mr={4}>
                Home
              </Link>
              <Button colorScheme="teal" variant="outline" onClick={handleLogout}>
                LOGOUT
              </Button>
            </Flex>
          </>
        ) : (
          <Link as={RouterLink} to="/login" color="white">
            Login
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
