import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <>
    <div className="card my-3 p-3" style={{width: "18rem"}}>
        <Link to={`/product/${product._id}`}>
            <img src={product.image} className="card-img-top"/>
        </Link>
        <div className="card-body">
            <Link to={`/product/${product._id}`}  style={{textDecoration: 'none'}}>
                <h6 className="card-title"><strong>{product.name}</strong></h6>
            </Link>
            <div className="card-text">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </div>
            <h3 className='card-text'>${product.price}</h3>
        </div>
    </div>
    </>
  )
}

export default Product