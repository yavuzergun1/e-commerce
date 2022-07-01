import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../Data";
import { Box, Text, Button } from "@chakra-ui/react";
import Slider from "../../components/Slider/Slider";
import moment from "moment";
import "./productDetails.scss";
function ProductDetails() {
  const { product_id } = useParams();
  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    getProduct(product_id)
  );
  if (isLoading) {
    return <div> Loading... </div>;
  }
  if (isError) {
    return <div>Error.</div>;
  }
  console.log(data);
  return (
    <div className="product-details-main">
      <div className="slider-main-container">
        <Slider data={data} />
      </div>
      <div className="right">
        <Text as="h2" fontSize="2xl">
          {data.title}{" "}
        </Text>
        <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
        <p className="description">{data.description} </p>
        <Button colorScheme="purple">Add to Basket</Button>
      </div>
    </div>
  );
}

export default ProductDetails;
