import React, { useEffect } from "react";
// import data from "../data/data.json";
import "./Cards.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, set_proData } from "../features/productSlice";
import { selectSearch } from "../features/searchSlice";
import Carousel from "react-bootstrap/Carousel";
import one from "../images/one.jpg";
import two from "../images/two.jpg";
import three from "../images/three.jpg";
import four from "../images/four.jpg";
import five from "../images/five.jpg";
import six from "../images/six.jpg";
import seven from "../images/seven.jpg";
import { products } from "../data/data";
import { useNavigate } from "react-router-dom";
import CardMap from "./CardMap";

function Cards() {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const search = useSelector(selectSearch);
  const navigate = useNavigate();
  useEffect(() => {
    if (product.length === 0) {
      dispatch(set_proData(products));
    }
  }, []);

  return (
    <div className="total-container">
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={one}
              width="100vw"
              height="500px"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={two}
              width="100vw"
              height="500px"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={three}
              width="100vw"
              height="500px"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={four}
              width="100vw"
              height="500px"
              alt="Fourth slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={five}
              width="100vw"
              height="500px"
              alt="Fifth slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={six}
              width="100vw"
              height="500px"
              alt="Sixth slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={seven}
              width="100vw"
              height="500px"
              alt="Seventh slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div>
        <div className="card-container">
          <h4>Mobiles</h4>
          <div>Laptops</div>
          <div>Clothes</div>
          <div>Electronics</div>
        </div>
        {/* Mobiles */}
        <div>
          {product?.filter(
            (item) =>
              item.type === "mobile" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>Mobiles</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "mobile" &&
                  item.product_title
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              ?.map((item, index) => {
                return (
                  <CardMap
                    item={item}
                    index={index}
                    key={index}
                    // products={products}
                    // setProducts={setProducts}
                  />
                );
              })}
          </div>
        </div>
        {/* laptops */}
        <div>
          <h2>Laptops</h2>
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "laptop" &&
                  item.product_title
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              ?.map((item, index) => {
                return (
                  <CardMap
                    item={item}
                    index={index}
                    key={index}
                    // products={products}
                    // setProducts={setProducts}
                  />
                );
              })}
          </div>
        </div>
        <div>
          <h2>Groceries</h2>
        </div>
      </div>
    </div>
  );
}

export default Cards;
