import React from "react";
import { postProduct } from "../../../Data";
import { useMutation, useQueryClient } from "react-query";
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

function AddProduct() {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const handleSubmit = async (values, bag) => {
    console.log(values);
    message.loading({ content: "Loading...", key: "product-update" });
    
    // values.photos = JSON.stringify(values.photos)

    const newValues = {
      ...values, 
      photos:JSON.stringify(values.photos),
    };

    newProductMutation.mutate( newValues, {
      onSuccess: () => {
        console.log("success");
      }
    })
    // try {
    //   await postProduct(values);
    //   message.success({
    //     content: "product successfuly updated!",
    //     key: "product-update",
    //     duration: 2,
    //   });
    // } catch (e) {
    //   message.error("Product could not updated");
    // }
  };

  return (
    <div>
      <Text ml={5} mt={10} fontSize={25}>
        Add Product
      </Text>
      {/* normalde useFormik kullanılarak da yapılabilir ancak yukarıda useQuery'den sonra kullanılınca hata veriyor. data verisine ihtiyaç olduğundan dolayı da useQuery'den önce kullanılamıyor. */}
      <Formik
        initialValues={{
          title: "dfsdf",
          description: "sdfsdfsds",
          price: "232",
          photos: "",
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
                                    name={`photo${index}`}
                                    value={photo[index]}
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
                                        icon: <DeleteFilled />,
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
                    colorScheme="green"
                    isLoading={isSubmitting}
                  >
                    Save
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

export default AddProduct;
