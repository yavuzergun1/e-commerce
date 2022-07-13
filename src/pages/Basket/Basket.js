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
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import Card from "../../components/Card/Card";
import { UseBasket } from "../../contexts/BasketContext";
import "./basket.scss";
import { postOrder } from "../../Data";
function Basket() {
  const { items } = UseBasket();
  const total = items.reduce((acc, curr) => acc + curr.price, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
    },
    onSubmit: async (values) => {
      const itemIds = items.map((item) => item._id);
      const address= values.address;
      console.log(values.address)
      const input = {
        address,
        items: JSON.stringify(itemIds)
      };
      console.log(items);
      const response = await postOrder(input);
      
      console.log("response", response);

      // console.log("adress", adress);
    },
  });
  return (
    <div>
      {items.length < 1 && <Alert status="warning">Box is Empty</Alert>}
      {/* <Grid templateColumns="repeat(3, 2fr)" gap={6} px="5" py="2" autoFlow="row dense" >  */}
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

          <Button mt="2" size="sm" colorScheme="green" onClick={onOpen}>
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
