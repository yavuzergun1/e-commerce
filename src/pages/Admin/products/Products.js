import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { getProductList, deleteProduct } from "../../../Data";
import { Table, Popconfirm, message } from "antd";
import { Text, Button, Spinner, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DeleteFilled } from "@ant-design/icons";

function Products() {
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const { isLoading, isError, data, error } = useQuery(
    "admin:products",
    getProductList
  );
  /* Silme işlemi mutation'a giriyor. bu sebeple useQuery yerine burada useMutation kullanılıyor */
  const deleteMutation = useMutation(deleteProduct);
  /* Bu component her render edildiğinde columns yeniden hesaplanmaya çalışılacak. Bunu engellemek için useMemo kullanıldı. */
  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title" /* Burası data.title'ı temsil ediyor */,
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price" /* Burası data.price'ı temsil ediyor */,
        key: "price",
      },
      {
        title: "createdAt",
        dataIndex: "createdAt" /* Burası data.createdAt'ı temsil ediyor */,
        key: "createdAt",
      },
      {
        title: "Action",
        dataIndex: "action",
        /* ilgili satıra yazılan componentleri render eder */
        render: (
          text,
          record /* ilgili satırın data verileri record içindedir. Veri record ile çekilir */
        ) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are you sure?"
              okText="Yes"
              cancelText="No"
              onCancel={() => console.log("canceled")}
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    queryClient.invalidateQueries("admin:products");
                  } /* delete işlemi başarılı olduktan sonra ilgili satırı kaldırıp kalan satırları gösterir. */,
                }); /* ilgili satırdaki id'ye ait product'u siler */
                setVisible(false); /* confirm olduğunda onay bölümünü kapatır */
                message.error({
                  content: "Product Deleted",
                  key: "product-update",
                  duration: 2,
                  icon: <DeleteFilled />,
                }); /* confirm olduğunda yandaki mesajı gösterir */
              }}
            >
              <a style={{ marginLeft: 10, color: "tomato" }} href="#">
                Delete
              </a>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, []);

  if (isLoading) {
    return (
      <div>
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" />
        </Flex>
      </div>
    );
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  console.log(data);

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Text fontSize={20} p="5">
          Products
        </Text>

        <Link to={"add"}>
          <Button>Add Product</Button>
        </Link>
      </Flex>
      <Table dataSource={data} columns={columns} rowKey="_id" />;
    </div>
  );
}

export default Products;
