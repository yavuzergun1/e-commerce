import React from "react";
import { UseBasket } from "../../contexts/BasketContext";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Flex, Spinner } from "@chakra-ui/react";
import { getProduct } from "../../Data";
import GetProductIdByUseQuery from "../../components/getProductIdByUseQuery/GetProductIdByUseQuery";


function OrderDetails() {
  const { response } = UseBasket();
  console.log("response", response);

  return (
    <div>
      <div>Your Order Details</div>
      <div>
        Adress
        <br />
        {response.address}
      </div>
     { response.items.map((item) => <GetProductIdByUseQuery item={item} /> )}
    </div>
  );
}

export default OrderDetails;
