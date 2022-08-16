import React from "react";
import { UseBasket } from "../../contexts/BasketContext";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Flex, Spinner } from "@chakra-ui/react";
import { getProduct } from "../../Data";
import GetProductIdByUseQuery from "../../components/getProductIdByUseQuery/GetProductIdByUseQuery";


function OrderDetails() {
  const { response } = UseBasket();
  console.log("response", response);
  // response.items.map((item) => console.log("item id", item));

  // aşağıdaki sorun useQuery kullanmadan bu şekilde çözülebilir ama devam edersem hem burada hem de data componentinde ekstra kod satırına sebep olur.

  // useEffect(() => {
  //  response.items.map((item) => getProduct(item))
  // }, [])
  

  // Spariş verildikten sonra useNavigate ile orderDetails sayfasına yönlendiriyorum. Burada response'dan gelen product id'lerini data.js içerisinde bulunan getProduct'a gönderip fetchleyerek bu id'deki ürünlerin detay bilgilerine ulaşmak istiyorum. id'ler getProduct'a ulaşıyor. ama fetchleme sonucu undefined geliyor. map metodunu useQuery içinde nasıl çözebilirim?

  // <getProductIdByUseQuery/>
  

 
 

  return (
    <div>
      <div>Your Order Details</div>
      <div>
        Adress
        <br />
        {response.address}
      </div>
     { response.items.map((item) => <GetProductIdByUseQuery item={item} /> )}
    </div>
  );
}

export default OrderDetails;
