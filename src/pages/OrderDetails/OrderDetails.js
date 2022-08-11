import React from 'react'
import { UseBasket } from '../../contexts/BasketContext';

function OrderDetails() {
  const {response} = UseBasket();

  console.log(response);
  return (
    <div>OrderDetails</div>
  )
}

export default OrderDetails