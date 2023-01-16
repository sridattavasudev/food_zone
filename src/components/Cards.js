import React, { useEffect, useState } from "react";
// import data from "../data/data.json";
import CardMap from "./CardMap";
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

function Cards() {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const search = useSelector(selectSearch);
  useEffect(() => {
    if (product.length === 0) {
      let pro_data = products;
      let updated_proData = pro_data.map((item) => {
        return { ...item, quantity: 1, state: false };
      });
      dispatch(set_proData(updated_proData));
    }
  }, []);

  return (
    <>
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
      <div className="card-container">
        {product
          ?.filter((item) =>
            item.product_title.toLowerCase().includes(search.toLowerCase())
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
    </>
  );
}

export default Cards;
