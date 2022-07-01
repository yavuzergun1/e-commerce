import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../Data";

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
  return <div>
    {data.title}
    <img src={data.photos[0]} alt="" />
    </div>;
}

export default ProductDetails;
