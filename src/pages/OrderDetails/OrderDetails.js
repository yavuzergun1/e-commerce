import React from 'react'
import { UseBasket } from '../../contexts/BasketContext';

function OrderDetails() {
  const {response} = UseBasket();

  console.log(response);
  return (
    <div>Your Order Details</div>
  )
}

export default OrderDetails