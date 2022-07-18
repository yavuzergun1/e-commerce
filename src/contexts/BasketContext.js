import { useToast } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { UseAuth } from "./AuthContext";

const BasketContext = createContext();
const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({ children }) => {
  const { isLogin } = UseAuth();
  const [items, setItems] = useState(defaultBasket);
  const toast = useToast();
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);

  const addToBasket = (data, isBasketItem, item) => {
    // Eğer ürün sepetteyse sepetten çıkar
    if (isBasketItem) {
      const filtered = items.filter((item) => item._id !== isBasketItem._id);
      return setItems(filtered);
    }
    if (isLogin) { /* ürün sepette değilse ve üye girişi yapılmışsa sepete ekle */
      setItems((prev) => [ 
        ...prev,
        data,
      ]); 
    } else { /* üye girişi yapılmamışsa sepete ekleme ve uyarı ver */
      toast({
        position:"top",
        title: 'Unable to Adding Basket',
        description: "Please Login or Sign up",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    } 
  };

  const values = {
    items,
    setItems,
   
    addToBasket,
  };
  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const UseBasket = () => useContext(BasketContext);

export { BasketProvider, UseBasket };
