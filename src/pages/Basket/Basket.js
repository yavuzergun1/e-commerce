import { Alert, Box, Grid } from "@chakra-ui/react";
import React from "react";
import Card from "../../components/Card/Card";
import { UseBasket } from "../../contexts/BasketContext";
import "./basket.scss";
function Basket() {
  const { items } = UseBasket();

  return (
    <div>
      {items.length < 1 && <Alert status="warning">Box is Empty</Alert>}
      <Grid templateColumns="repeat(3, 2fr)" gap={6} px="5" py="2" > 

          {items.map((item) => (
            <React.Fragment key={item._id}>
                <Card item={item} />
            </React.Fragment>
          ))}
          </Grid>
        </div>
  );
}

export default Basket;
