import React from 'react'
import { UseBasket } from '../../contexts/BasketContext';

function OrderDetails() {
  const {response} = UseBasket();

  console.log(response);
  return (
    <div>

    
    <div>Your Order Details</div>
    <div>Adress 
      {response.address} </div>
      </div>
  )
}

export default OrderDetails