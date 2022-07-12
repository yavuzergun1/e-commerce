import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { UseBasket } from "../../contexts/BasketContext";
import { UseAuth } from "../../contexts/AuthContext";

function Card({ item }) {
  const { isLogin } = UseAuth();
  const { addToBasket, items } = UseBasket();

  const isBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  return (
    <Box borderWidth="1px" borderRadius="lg" p="3" overflow="hidden">
      <Link to={`/product/${item._id}`}>
        <Image src={item.photos[0]} alt="product" loading="lazy" />
        <Box p="6">
          <Box d="plex" alignItems="baseline">
            {moment(item.createdAt).format("DD/MM/YYYY")}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {item.title}
          </Box>
          <Box>{item.price}TL</Box>
        </Box>
      </Link>
      <Box p="6"></Box>
      <Button
        colorScheme={isLogin && isBasketItem ? "pink" : "green"}
        onClick={() => addToBasket(item, isBasketItem)}
      >
        {isLogin && isBasketItem ? "Remove from Basket" : "Add to Basket"}
      </Button>
    </Box>
  );
}

export default Card;
