import React from "react";
import { useQuery } from "react-query";
import { getOrders } from "../../../Data";
import { Text, Table, TableCaption, Thead, Tr, Th, Td, Tbody } from "@chakra-ui/react";

function Orders() {
  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    getOrders
  );
  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  console.log(data);
  return <div>
    <Text fontSize="2x1" p={5}>
      Orders
    </Text>

    <Table variant="simple" >
<TableCaption>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, omnis.</TableCaption>
<Thead>
  <Tr>
    <Th>User</Th>
    <Th>Address</Th>
    <Th>Items</Th>
  </Tr>
</Thead>
<Tbody>
  {data.map(item => (
    <Tr key={item._id}>
      <Td>{item.user.email} </Td>
      <Td>{item.address} </Td>
      <Td>{item.items.length} </Td>
    </Tr>
  ))}
</Tbody>
    </Table>

  </div>;
}

export default Orders;
