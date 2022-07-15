import { useFormikContext } from 'formik';
import React from 'react'
import { useParams } from 'react-router-dom'

function OrderDetails() {
  const {response} = useParams();

  console.log(response);
  return (
    <div>OrderDetails</div>
  )
}

export default OrderDetails