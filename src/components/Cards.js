import React, { useEffect, useState } from "react";
// import data from "../data/data.json";
import CardMap from "./CardMap";
import "./Cards.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, set_proData } from "../features/productSlice";
import { selectSearch } from "../features/searchSlice";
import Carousel from "react-bootstrap/Carousel";
import lap1 from "../images/lap1.jpg";
import lap2 from "../images/lap2.jpg";
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
              src={lap1}
              width="100vw"
              height="500px"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={lap2}
              width="100vw"
              height="500px"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item> */}
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
