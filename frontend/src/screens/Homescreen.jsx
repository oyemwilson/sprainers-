import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Container } from "react-bootstrap";
import pexelsImage from "../screens/images/pexel.jpg";
import sliderimg1 from "../screens/images/sliderimg1.jpg";
import sliderimg2 from "../screens/images/sliderimg2.jpg";
import { listProducts } from "../actions/productActions";


const Homescreen = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();


  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList
  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])



  return (
    <>
      <div id="carouselExampleFade" className="carousel slide carousel-fade mt-5 mb-5">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={sliderimg1} class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src={sliderimg2} class="d-block w-100" alt="..."/>
          </div>

        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        </div>
      
      <h1 className="pt-4"> Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient='danger'>{error}</Message>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div
              className="col-lg-4 col-md-12 col-sm-12 col-xl-3"
              key={product._id}
            >
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Homescreen;
