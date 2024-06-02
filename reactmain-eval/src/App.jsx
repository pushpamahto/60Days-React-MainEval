import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ element }) => {
  const { authState } = useAuth();
  return authState.isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => (
  <ChakraProvider>
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/product/:id" element={<PrivateRoute element={<ProductDetailsPage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  </ChakraProvider>
);

export default App;
