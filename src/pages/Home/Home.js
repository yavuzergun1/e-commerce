import React from 'react';
import { useQuery } from 'react-query';
import { getProductList } from '../../Data';
import { Spinner, Flex } from '@chakra-ui/react';
import Card from "../../components/Card/Card"

function Home() {

  const { isLoading, isError, data, error } = useQuery(
    "admin:products",
    getProductList
  );
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1124 },
      items: 4,
      slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1124, min: 874 },
      items: 3,
      slidesToSlide: 2 // optional, default to 1.
      
    },
    mobile: {
      breakpoint: { max: 874, min: 0 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
      customTransition:"transform 5000ms cubic-bezier(0.79,-0.3, 0.32, 1.20) "
    }
  };
  console.log(responsive.deviceTipe);


  return (
    <div>

    </div>
  )
}

export default Home