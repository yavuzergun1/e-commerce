import { Alert, Box, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import Card from "../../components/Card/Card";
import { UseBasket } from "../../contexts/BasketContext";
import "./basket.scss";
function Basket() {
  const { items } = UseBasket();
  const total = items.reduce((acc, curr) => acc + curr.price, 0);

  
  

  return (
    <div>
      {items.length < 1 && <Alert status="warning">Box is Empty</Alert>}
      {/* <Grid templateColumns="repeat(3, 2fr)" gap={6} px="5" py="2" autoFlow="row dense" >  */}
      <div className="main-container">
        <div className="cards-container">
          {items.map((item) => (
            <React.Fragment key={item._id}>
              <div className="card-container">
                <Card item={item} />
              </div>
            </React.Fragment>
          ))}
          {/* </Grid> */}

        </div>
          <Flex m="10" justifyContent="center" fontSize="25">
            {total > 0 && `Total= ${total}TL`}
          </Flex>
      </div>
    </div>
  );
}

export default Basket;
