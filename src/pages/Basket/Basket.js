import {
  Alert,
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  FormControl,
  Input,
  useDisclosure,
  Textarea,
  Toast,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useFormik, useFormikContext } from "formik";
import Card from "../../components/Card/Card";
import { UseBasket } from "../../contexts/BasketContext";
import "./basket.scss";
import { postOrder } from "../../Data";
import { useNavigate } from "react-router-dom";

function Basket() {
  const { items, setItems, setResponse } = UseBasket();
  const total = items.reduce((acc, curr) => acc + curr.price, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const toast = useToast();
  const navigate = useNavigate()
  
  const { handleSubmit, handleChange} = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
    },
    onSubmit: async (values) => {
      const itemIds = items.map((item) => item._id);
      const address = values.address;
      const input = {
        address /* backendde karşılığı olmadığı için name ve phone verileri dahil edilmedi */,
        items: JSON.stringify(itemIds),
      };
     const res = await postOrder(input);
      setResponse(res)

      onClose(); /* Modal'ı kapatır */
      // Spariş Başarılı Mesajı:
      toast({
        position:"top",
        title: 'Order Recieved',
        description: "Order Has Been Received Successfully",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setItems([]); /* Sparişten sonra sepetin içini boşaltır */
      navigate("/orderDetails") /* Spariş bilgi sayfasına yönlendirir */
    },
  });
  console.log("items", items);
  return (
    <div>
      {items.length < 1 && <Alert status="warning">Box is Empty</Alert>}
      {/* <Grid templateColumns="repeat(3, 2fr)" gap={6} px="5" py="2" autoFlow="row dense" >  */}
      <Box>
        <Text></Text>
      </Box>
      <div className="main-container">
        <div className="cards-container">
          {items.map((item) => (
            <React.Fragment key={item._id}>
              <div className="card-container">
                <Card item={item} />
              </div>
            </React.Fragment>
          ))}
          {/* </Grid> */}
        </div>
        <Box w="120" mt="12" mr="5">
          <Text textAlign="left" fontSize="25">
            {total > 0 && `Total=${total}TL`}
          </Text>
            {/* className: sepet boşsa order butonunu gösterme */}
          <Button className={items.length < 1 && "none"} mt="2" size="sm" colorScheme="green" onClick={onOpen}>
            Order Now
          </Button>
        </Box>

        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <form onSubmit={handleSubmit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl isRequired isInvalid={""}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    ref={initialRef}
                    placeholder="Your Name"
                    onChange={handleChange}
                  />
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <Input
                    name="phone"
                    type="number"
                    placeholder="Your Phone Number"
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Basket;
