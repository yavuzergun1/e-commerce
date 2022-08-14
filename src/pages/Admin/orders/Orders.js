import React from "react";
import { useQuery } from "react-query";
import {getOrders} from "../../../Data";

function Orders() {
  const { isLoading, isError, data, error } = useQuery('admin:orders', getOrders);
  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
console.log(data);
  return <div>Orders</div>;
}

export default Orders;
