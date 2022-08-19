import { useMemo } from "react";
import { useQuery, useMutation } from "react-query";
import { useState } from "react";
import { getProductList, deleteProduct } from "../../../Data";
import { Table, Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Products() {
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
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "createdAt",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        dataIndex: "action",
        /* buton koyulacak yere render edilecek fonksiyon yazıldı */
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are you sure?"
              okText="Yes"
              cancelText="No"
              onCancel={() => console.log("cancel")}
              onConfirm={() => {
                deleteMutation.mutate(
                  record._id
                ); /* ilgili satırdaki id'ye ait product'u siler */
                setVisible(false); /* confirm olduğunda onay bölümünü kapatır */
                message.success(
                  "Product Succesfully Deleted"
                ); /* confirm olduğunda yandaki mesajı gösterir */
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
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  console.log(data);

  return (
    <div>
      <Text fontSize={20} p="5">
        Products
      </Text>
      <Table dataSource={data} columns={columns} rowKey="_id" />;
    </div>
  );
}

export default Products;
