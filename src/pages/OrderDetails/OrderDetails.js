import React from "react";
import { UseBasket } from "../../contexts/BasketContext";
import GetOrderDetails from "../../components/getProductIdByUseQuery/GetOrderDetails";
import "./orderDetails.scss";

function OrderDetails() {
  const { response, orderTotal } = UseBasket();
  // const total = items.reduce((acc, curr) => acc + curr.price, 0);
  console.log("response", response);

  return (
    <div>
      <div className="order-container">
        <h2>Your Order Details</h2>
        <div>
          Address: {response.address}
          <br />
          Total Order Price : {orderTotal}TL
        </div>
      
{/* Spariş verilen ürünlerin resimleri burada gösterilecek */}
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
    </div>
  );
}

export default OrderDetails;
