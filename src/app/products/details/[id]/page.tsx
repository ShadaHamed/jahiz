import React from 'react'

const ProductDetailsPage = ({params}) => {
    const {id} = params;
  return (
    <div> Details for Product with ID: {id}</div>
  )
}

export default ProductDetailsPage