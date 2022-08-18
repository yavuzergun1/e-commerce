import { useQuery } from "react-query";
import { Flex, Spinner, Box, Image } from "@chakra-ui/react";
import { getProduct } from "../../Data";
import { Link } from "react-router-dom";

function GetOrderDetails({item}) {
    const { isLoading, isError, data } = useQuery(["product-id", item], () =>
getProduct(item)
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
  return (
    <Box borderWidth="1px" borderRadius="5" p="3" overflow="hidden">
      
      <Link to={`/product/${data._id}`}>
        <Image src={data.photos[0]} alt="product" loading="lazy" />
        <Box p="6">
        
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {data.title}
          </Box>
          <Box>{data.price}TL</Box>
        </Box>
      </Link>
      <Box p="6"></Box>
   
    </Box>
     
  )
}

export default GetOrderDetails
