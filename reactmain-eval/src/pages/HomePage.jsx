import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Select, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products', {
        params: {
          page: 1,
          limit: 20,
          filter: searchParams.get('filter'),
          sort: searchParams.get('sort') === 'price' ? 'price' : undefined,
          order: searchParams.get('order'),
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const handleSortChange = (e) => {
    setSearchParams({ sort: 'price', order: e.target.value });
  };

  const handleFilterChange = (e) => {
    setSearchParams({ filter: e.target.value });
  };

  if (loading) return <Spinner />;
  if (error) return <Text>{error}</Text>;

  return (
    <Box p={4}>
      <Select onChange={handleSortChange} placeholder="Sort by Price">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>
      <Select onChange={handleFilterChange} placeholder="Filter by Category" mt={4}>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
        <option value="homedecor">Home Decor</option>
      </Select>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} mt={4}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;
