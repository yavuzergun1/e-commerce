import React from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "./Data";
import { useQuery } from "react-query";
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
        // validationSchema
        // onSubmit={handleSubmit}
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
                    ></Input>
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
                    ></Textarea>
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={5}>Price</FormLabel>
                    <Input
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                    ></Input>
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
                                    onClick={() => arrayHelpers.remove(index)}
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
