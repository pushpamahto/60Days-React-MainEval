import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
    <Text>{product.title}</Text>
    <Text>{product.category}</Text>
    <Text>{product.price}</Text>
    <Button as={RouterLink} to={`/product/${product.id}`} mt={4}>
      More Details
    </Button>
  </Box>
);

export default ProductCard;
