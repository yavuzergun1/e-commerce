import React from 'react'
import { UseBasket } from '../../contexts/BasketContext';
import { useQuery } from 'react-query';
import { Flex,Spinner} from "@chakra-ui/react";
import { getProduct } from '../../Data';

function OrderDetails() {
  const {response} = UseBasket();
  console.log("response", response);
  console.log("response id",  response.items[0]);

  const { isLoading, isError, data } = useQuery(["orderId", response.items[0]], () =>
 getProduct(response.items[0])
  );
  console.log("data",data);
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
return (
  <div>

    
    <div>Your Order Details</div>
    <div>Adress 
      <br/>
      {response.address} 
      <img src={data.photos[0]} alt="" /> 
      </div>
      </div>
  )
}

export default OrderDetails