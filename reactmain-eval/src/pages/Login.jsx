

import React, { useContext, useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../component/AuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, auth: { isLoggedIn } } = useContext(AuthContext);
  const toast = useToast();

  async function handleClick() {
    try {
      let res = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      login(res.data.token, email);
    } catch (error) {
      toast({
        position: 'top',
        title: 'Login Failed',
        description: "Invalid credentials. Please try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  if (isLoggedIn) {
    toast({
      position: 'top',
      title: 'Login Successful',
      description: "Welcome! Redirecting to Home Page.",
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    return <Navigate to='/' />;
  }

  return (
    <Container>
      <VStack spacing={6}>
        <Heading as="h1" size="xl">Login Page</Heading>
        <Input type='email' placeholder='Email' size='lg' value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
        <Input type='password' placeholder='Password' size='lg' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button colorScheme='green' variant='solid' onClick={handleClick}>Login</Button>
      </VStack>
    </Container>
  );
}

export default Login;


