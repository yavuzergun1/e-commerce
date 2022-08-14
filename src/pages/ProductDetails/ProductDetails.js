import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../Data";
import { Text,Button,Flex,Spinner} from "@chakra-ui/react";
import { UseBasket } from "../../contexts/BasketContext";
import "@animxyz/core";
import {XyzTransition} from "@animxyz/react";
import Slider from "../../components/Slider/Slider";
import moment from "moment";
import "./productDetails.scss";
import { UseAuth } from "../../contexts/AuthContext";

function ProductDetails() {
  const { product_id } = useParams();
  const {isLogin} = UseAuth();
  const { items, addToBasket } = UseBasket();
console.log("product id",product_id);
  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    getProduct(product_id)
    );
    console.log("data",data)
  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl"/>
      </Flex>
    );
  }
  if (isError) {
    return <div>Error.</div>;
  }
  
  // sepete eklenen ürün daha önce eklenenler arasında mı ona bakıyor
  const isBasketItem = items.find((item) => item._id === product_id)

 

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

        <Button colorScheme={isLogin && isBasketItem ? "purple" : "green"} onClick={() => addToBasket(data, isBasketItem)} >{isLogin && isBasketItem ? "Remove Item ": "Add to Basket"} </Button>
        {/* <XyzTransition xyz="fade">
  {isBasketItem && <div>added to basket</div> }
</XyzTransition> */}
<div className={isLogin && isBasketItem ? "deneme" : "none"}></div>

      </div>
    </div>
  );
}

export default ProductDetails;
