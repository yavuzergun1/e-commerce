import { useQuery } from "react-query";
import { Flex, Spinner } from "@chakra-ui/react";
import { getProduct } from "../../Data";

function GetProductIdByUseQuery({item}) {
    const { isLoading, isError, data } = useQuery(["product-id", item], () =>
getProduct(item)
);
console.log("id", item);
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
    <div> {console.log(data)} 
    <img src={data.photos[0] }alt="" />
    </div>
  )
}

export default GetProductIdByUseQuery
