import React from 'react'

import Card from '../../components/Card'

const Gallery = ({ products }) => {
  return (
    <div>
        <h1 className='ms-5 mt-5'>Todos los productos</h1>
        <Card products={products} />
    </div>
  )
}

export default Gallery