import axios from "axios";

export const getProductList = async () => {
  const { data } =await axios.get("http://localhost:4000/product");
  return data;
};

export const getProduct = async (id) => {
  const { data } =await axios.get(`http://localhost:4000/product/${id}`);
  return data;
};