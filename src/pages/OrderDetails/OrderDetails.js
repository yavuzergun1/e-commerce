import React from "react";
import { UseBasket } from "../../contexts/BasketContext";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Flex, Spinner } from "@chakra-ui/react";
import { getProduct } from "../../Data";
import GetOrderDetails from "../../components/getProductIdByUseQuery/GetOrderDetails";

function OrderDetails() {
  const { response, orderTotal } = UseBasket();
  // const total = items.reduce((acc, curr) => acc + curr.price, 0);
  console.log("response", response);

  return (
    <div>
      <div>Your Order Details</div>
      <div>
        Adress
        <br />
        {response.address}
        <br />
        Total Order Price : {orderTotal}TL
      </div>
      <div className="main-container">
        <div className="cards-container">
          {response.items.map((item) => (
            <React.Fragment key={item._id}>
              <div className="card-container">
                {/* UseQuery map içinde kullanılamadığından dolayı component içine alındı ve item değişkeni componente gönderildi */}
                <GetOrderDetails item={item} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
