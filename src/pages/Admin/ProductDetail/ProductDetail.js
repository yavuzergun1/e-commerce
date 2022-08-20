import React from "react";
import { useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../../Data";
import { useQuery } from "react-query";
import { message } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import {
  Spinner,
  Flex,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { Formik, FieldArray } from "formik";
import validationSchema from "./Validations";

function ProductDetail() {
  const { product_id } = useParams();
  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    getProduct(product_id)
  );
  console.log("data", data);
  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (isError) {
    return <div>Error.</div>;
  }
  console.log(data);

  const handleSubmit = async (values) => {
    console.log("submitted");
    message.loading({ content: "Loading...", key: "product-update" });

    try {
      await updateProduct(values, product_id);
      message.success({
        content: "product successfuly updated!",
        key: "product-update",
        duration: 2,
      });
    } catch (e) {
      message.error("Product could not updated");
    }
  };

  return (
    <div>
      <Text ml={5} fontSize={25}>
        Edit
      </Text>
      {/* normalde useFormik kullanılarak da yapılabilir ancak yukarıda useQuery'den sonra kullanılınca hata veriyor. data verisine ihtiyaç olduğundan dolayı da useQuery'den önce kullanılamıyor. */}
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
        }}
        validationSchema={
          validationSchema
        } /* useFormik kullanılmadığı için validationSchema direk yazılmadı. */
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <>
            <Box mx={5}>
              <Box my={5} textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />

                    {touched.title && errors.title && (
                      <Text>{errors.title} </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={5}>Description</FormLabel>
                    <Textarea
                      size="xs"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                    ></Textarea>
                    {touched.description && errors.description && (
                      <Text>{errors.description} </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={5}>Price</FormLabel>
                    <Input
                      name="price"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid={touched.price && errors.price}
                    />
                    {touched.price && errors.price && (
                      <Text>{errors.price} </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={5}>Photos</FormLabel>

                    <FieldArray /* values.photos içinde array olarak bulunan verileri ayrı ayrı yazdırmak için FieldArray kullanıldı. */
                      name="photos"
                      render={(arrayHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <div key={index}>
                                <Flex justify="space-between" mt={3}>
                                  <Input
                                    name={`photos${index}`}
                                    value={photo}
                                    disabled={isSubmitting}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="sm"
                                    width="90%"
                                  />
                                  <Button
                                    type="button"
                                    size="sm"
                                    ml={3}
                                    colorScheme="red"
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                      message.error({
                                        content: "Photo Deleted",
                                        key: "product-update",
                                        duration: 2,
                                        icon:<DeleteFilled />
                                      });
                                      }}
                                  >
                                    Delete
                                  </Button>
                                </Flex>
                              </div>
                            ))}
                          <Button
                            type="button"
                            size="sm"
                            mt={3}
                            colorScheme="green"
                            onClick={() =>
                              arrayHelpers.push("")
                            } /* boş bir input satırı daha ekler */
                          >
                            Add Photo
                          </Button>
                        </div>
                      )}
                    ></FieldArray>
                  </FormControl>
                  <Button
                    mt={4}
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Update
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default ProductDetail;
