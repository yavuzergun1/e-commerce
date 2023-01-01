import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../Data";
import { Text, Button, Flex, Spinner } from "@chakra-ui/react";
import { UseBasket } from "../../contexts/BasketContext";
import Slider from "../../components/Slider/Slider";
import moment from "moment";
import "./productDetails.scss";
import { UseAuth } from "../../contexts/AuthContext";
import { getCategoriesAndDocuments } from "../../FirebaseUtils";

function ProductDetails() {
  const { product_id } = useParams();
  const [data, setData] = useState();
  const { currentUser } = UseAuth();
  const { items, addToBasket } = UseBasket();
  console.log("product id", product_id);

  //
  useEffect(
    /* async */ () => {
      // BURADA YUKARIDAKİ GİBİ USEEFFECT İÇİNDE ASYNC FUNCTİON KULLANAMAYIZ. bUNU YAPMAK İÇİN AŞAĞIDA OLDUĞU GİBİ YENİ BİR ASYNC FUNCTİON OLUŞTURUYORUZ:

      const getProducts = async () => {
        const response = await getCategoriesAndDocuments();
        console.log(response.products);

        const productDetail = response.products.find(
          (product) => product._id.$oid == product_id
        );
        setData(productDetail)
        console.log(productDetail);
      };
      // return getCategoriesMap;
      getProducts();
    },

    []
  );

  // PRODUCT DETAILS FROM BACKEND
  // const { isLoading, isError, data } = useQuery(["product", product_id], () =>
  //   getProduct(product_id)
  //   );
  //   console.log("data",data)
  // if (isLoading) {
  //   return (
  //     <Flex justifyContent="center" alignItems="center" height="100vh">
  //       <Spinner size="xl"/>
  //     </Flex>
  //   );
  // }
  // if (isError) {
  //   return <div>Error.</div>;
  // }

  // sepete eklenen ürün daha önce eklenenler arasında mı ona bakıyor
  const isBasketItem = items.find((item) => item._id === product_id);
  if (!data) {
    return <div>loading..</div>
  }

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

        <Button colorScheme={currentUser && isBasketItem ? "purple" : "green"} onClick={() => addToBasket(data, isBasketItem)} >{currentUser && isBasketItem ? "Remove Item ": "Add to Basket"} </Button>

      {/* <div className={currentUser && isBasketItem ? "deneme" : "none"}></div> */}

      </div> 
    </div>
  );
}

export default ProductDetails;
