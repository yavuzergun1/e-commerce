import { Alert, Box } from "@chakra-ui/react";
import React from "react";
import Card from "../../components/Card/Card";
import { UseBasket } from "../../contexts/BasketContext";
import "./basket.scss";
function Basket() {
  const { items } = UseBasket();

  return (
    <div>
      {items.length < 1 && <Alert status="warning">Box is Empty</Alert>}
      <div className="main-container">
        <div className="cards-container">
          {items.map((item) => (
            <React.Fragment key={item._id}>
              <div className="card-container">
                <Card item={item} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Basket;
