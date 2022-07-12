import { useContext, useState } from "react";
import { createContext } from "react";

const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToBasket = (data, isBasketItem, item) => {
    console.log("basket items", items);
// Eğer ürün sepetteyse sepetten çıkar
    if (isBasketItem) {
      const filtered = items.filter((item) => item._id !== isBasketItem._id);
      return setItems(filtered);
    }
    setItems((prev) => [...prev, data]);/* ürün sepette değilse sepete ekle */
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
