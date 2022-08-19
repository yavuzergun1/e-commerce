import React from "react";
import { useQuery } from "react-query";
import { getProductList } from "../../../Data";
import { Table } from "antd";
import { Text } from "@chakra-ui/react";
import {Link} from 'react-router-dom';

function Products() {
  const { isLoading, isError, data, error } = useQuery(
    "admin:products",
    getProductList
  );

  const columns= [{
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },{
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
  },
{
  title: 'createdAt',
  dataIndex: 'createdAt',
  key: 'createdAt'
},
{
  title: 'Action',
  dataIndex: 'action',
  /* buton koyulacak yere render edilecek fonksiyon yazıldı */
  render: (text, record) => (
    <>
    <Link to={`/admin/products/${record._id}`} >Edit</Link>
    </>
  )
}]

  if (isLoading){
    return <div>Loading</div>
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  console.log(data);

  return <div>
  <Text fontSize={20} p="5">Products</Text>

  <Table dataSource={data} columns={columns} rowKey="_id" />;
  </div>;
}

export default Products;
