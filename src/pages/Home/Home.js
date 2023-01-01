import React, { useEffect, useState } from 'react';
import { getCategoriesAndDocuments } from '../../FirebaseUtils';
import { useQuery } from 'react-query';
import { getProductList } from '../../Data';
import { Spinner, Flex } from '@chakra-ui/react';
import Card from "../../components/Card/Card"

function Home() {
  const [items, setItems] = useState();

  // PRODUCTS FROM FIRESTORE
  useEffect(
    /* async */ () => {
      // BURADA YUKARIDAKİ GİBİ USEEFFECT İÇİNDE ASYNC FUNCTİON KULLANAMAYIZ. bUNU YAPMAK İÇİN AŞAĞIDA OLDUĞU GİBİ YENİ BİR ASYNC FUNCTİON OLUŞTURUYORUZ:
      const getProducts = async () => {
        const data = await getCategoriesAndDocuments();
        setItems(data);
      };
      getProducts();
    },

    []
  );
console.log(items);


// PRODUCTS FROM BACKEND
  // const { isLoading, isError, data, error } = useQuery(
  //   "admin:products",
  //   getProductList
  // );
  // if (isLoading) {
  //   return (
  //     <Flex justifyContent="center" alignItems="center" height="100vh">
  //       <Spinner size="xl"/>
  //     </Flex>
  //   );
  // }
  // if (isError) {
  //   return <div>Error.</div>;
  // }




  return (
    <div>

    </div>
  )
}

export default Home