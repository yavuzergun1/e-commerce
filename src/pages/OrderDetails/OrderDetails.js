import React from "react";
import { UseBasket } from "../../contexts/BasketContext";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Flex, Spinner } from "@chakra-ui/react";
import { getProduct } from "../../Data";
import GetOrderDetails from "../../components/getProductIdByUseQuery/GetOrderDetails";


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
      <div className="main-container">
        <div className="cards-container">
          {response.items.map((item) => (
            <React.Fragment key={item._id}>
              <div className="card-container">
                <GetOrderDetails item={item} />
              </div>
            </React.Fragment>
          ))}
          {/* </Grid> */}
        </div>
     {/* { response.items.map((item) => <GetProductIdByUseQuery item={item} /> )} */}
    </div>
    </div>
  );
}

export default OrderDetails;
