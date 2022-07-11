import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../Data";
import { Box, Text, Button } from "@chakra-ui/react";
import { UseBasket } from "../../contexts/BasketContext";
import Slider from "../../components/Slider/Slider";
import moment from "moment";
import "./productDetails.scss";

function ProductDetails() {
  const { product_id } = useParams();
  const { items, setItems } = UseBasket();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    getProduct(product_id)
  );
  if (isLoading) {
    return <div> Loading... </div>;
  }
  if (isError) {
    return <div>Error.</div>;
  }
  
  // sepete eklenen ürün daha önce eklenenler arasında mı ona bakıyor
  const isBasketItem = items.find((item) => item._id === product_id)

  const addToBasket = () => {
    console.log("basket items", items);
// Eğer ürün sepetteyse sepetten çıkar
    if (isBasketItem) {
      const filtered = items.filter((item) => item._id !== isBasketItem._id);
      return setItems(filtered);
    }
    setItems((prev) => [...prev, data]);/* ürün sepette değilse sepete ekle */
  };

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

      

        <Button colorScheme="purple" onClick={addToBasket} >{ isBasketItem ? "Remove Item ": "Add to Basket"} </Button>
      </div>
    </div>
  );
}

export default ProductDetails;
