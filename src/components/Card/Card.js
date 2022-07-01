import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";

function Card({ item }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="3" overflow="hidden">
      <Link to={`products/product/:${item._id}`}>
        <Image src={item.photos[0]} alt="product" loading="lazy"/>
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
      <Button colorScheme="pink">Add to Basket</Button>
    </Box>
  );
}

export default Card;
