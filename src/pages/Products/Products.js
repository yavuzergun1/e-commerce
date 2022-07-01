import React from "react";
import Card from "../../components/Card/Card";
import { Grid, GridItem } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getProductList } from "../../Data";
function Products() {
  const { isLoading, error, data } = useQuery("products", getProductList);
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  console.log(data);
  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {data.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </Grid>
    </div>
  );
}

export default Products;
