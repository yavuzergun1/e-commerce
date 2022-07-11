import { useContext, useState } from "react";
import { createContext } from "react";

const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const [items, setItems] = useState([]);

 

  const values = {
    items,
    setItems,
  };
  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const UseBasket = () => useContext(BasketContext);

export { BasketProvider, UseBasket };
