import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, Button, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://example.com/login', { email, password });
      login(email, response.data.token);
      navigate('/home');
    } catch (error) {
      setError('Invalid email or password');
    }
    
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          ref={emailRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      {error && <Text color="red.500">{error}</Text>}
      <Button mt={4} colorScheme="teal" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
