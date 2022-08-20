import React from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from './Data';
import { useQuery } from 'react-query';
import { Spinner, Flex, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
function ProductDetail() {
    const {product_id} = useParams();
    const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    getProduct(product_id)
    );
    console.log("data",data)
  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl"/>
      </Flex>
    );
  }
  if (isError) {
    return <div>Error.</div>;
  }
  console.log(data);
  return (
    <div>
        <Text ml={5} fontSize={25}>Edit</Text>

    <Formik
    

    </div>
  )
}

export default ProductDetail