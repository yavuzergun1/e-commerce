import { useContext, useState } from "react";
import { createContext } from "react";
import { UseAuth } from "./AuthContext";

const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const{isLogin} = UseAuth();
  const [items, setItems] = useState([]);

  const addToBasket = (data, isBasketItem, item) => {
    console.log("basket items", items);
// Eğer ürün sepetteyse sepetten çıkar
    if (isBasketItem) {
      const filtered = items.filter((item) => item._id !== isBasketItem._id);
      return setItems(filtered);
    } if(isLogin){
      setItems((prev) => [...prev, data]);/* ürün sepette değilse ve üye girişi yapılmışsa sepete ekle */
    } else {alert("please login or sign up")} /* üye girişi yapılmamışsa uyarı ver */
    
  };

  const values = {
    items,
    setItems,
    addToBasket
  };
  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const UseBasket = () => useContext(BasketContext);

export { BasketProvider, UseBasket };
