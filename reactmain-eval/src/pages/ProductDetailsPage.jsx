import React, { useState, useEffect } from 'react';
import { Box, Text, Image, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { id } = useParams();
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <Text>{error}</Text>;

  return (
    <Box p={4}>
      <Image src={product.image} alt={product.title} />
      <Text>{product.title}</Text>
      <Text>{product.category}</Text>
      <Text>{product.price}</Text>
      <Button onClick={() => setIsDialogOpen(true)}>Add to Cart</Button>

      <AlertDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Confirm</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to add this item to cart?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button
                colorScheme="teal"
                ml={3}
                onClick={() => {
                  setIsDialogOpen(false);
                  toast({ title: 'Item added to cart', status: 'success', duration: 2000 });
                }}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ProductDetailsPage;
