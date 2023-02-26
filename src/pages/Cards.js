import React, { useEffect, useState } from "react";
// import data from "../data/data.json";
import "./Cards.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, set_proData } from "../features/productSlice";
import { selectSearch } from "../features/searchSlice";

import { products } from "../data/data";
import { useNavigate } from "react-router-dom";
import CardMap from "./CardMap";
import Slider from "../components/Slider";
import axios from "axios";

function Cards() {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const search = useSelector(selectSearch);
  const navigate = useNavigate();

  const allItemsFn = async () => {
    try {
      let response = await axios({
        url: "http://localhost:5000/api/all-items",
        method: "GET",
      });
      // console.log(response, "response");
      if (response.status == 200) {
        let updated_prodata = response.data?.map((item) => ({
          ...item,
          display_quantity: 1,
        }));
        console.log(updated_prodata, "response");
        dispatch(set_proData(updated_prodata));
      } else {
        alert("Error");
        console.log("ERROR");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  useEffect(() => {
    allItemsFn();
  }, []);

  return (
    <div className="total-container">
      <div>
        <Slider />
      </div>
      <div className="side-heading">
        <div className="card-container">
          <h4>BREAKFAST</h4>
          <h4>LUNCH</h4>
          <h4>PUFFS</h4>
          <h4>PASTRIES</h4>
          <h4>SMOOTHIES</h4>
          <h4>SHAKES</h4>
          <h4>MOJITOS</h4>
          <h4>FRANKIES</h4>
          <h4>FRIES</h4>
          <h4>SPLSANDWICH</h4>
          <h4>BURGERS</h4>
          <h4>ICECREAM</h4>
        </div>
        {/* BREAKFAST*/}
        <div>
          {product?.filter(
            (item) =>
              item.type === "BREAKFAST" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>BREAKFAST</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "BREAKFAST" &&
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
        {/* LUNCH */}
        <div>
          {product?.filter(
            (item) =>
              item.type === "LUNCH" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>LUNCH</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "LUNCH" &&
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
        {/* PUFFS*/}
        <div>
          {product?.filter(
            (item) =>
              item.type === "PUFFS" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>PUFFS</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "PUFFS" &&
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
        {/* PASTRIES*/}
        <div>
          {product?.filter(
            (item) =>
              item.type === "PASTRIES" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>PASTRIES</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "PASTRIES" &&
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
        {/* SMOOTHIES*/}
        <div>
          {product?.filter(
            (item) =>
              item.type === "SMOOTHIES" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>SMOOTHIES</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "SMOOTHIES" &&
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
        {/* SHAKES*/}
        <div>
          {product?.filter(
            (item) =>
              item.type === "SHAKES" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>SHAKES</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "SHAKES" &&
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
        {/* MOJITOS*/}
        <div>
          {product?.filter(
            (item) =>
              item.type === "MOJITOS" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>MOJITOS</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "MOJITOS" &&
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
        {/* FRANKIES*/}
        <div>
          {product?.filter(
            (item) =>
              item.type === "FRANKIES" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>FRANKIES</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "FRANKIES" &&
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
        {/* FRIES*/}
        <div>
          {product?.filter(
            (item) =>
              item.type === "FRIES" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>FRIES</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "FRIES" &&
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
        {/* SPLSANDWICH*/}
        <div>
          {product?.filter(
            (item) =>
              item.type === "SPLSANDWICH" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>SPLSANDWICH</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "SPLSANDWICH" &&
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
        {/* BURGER*/}
        <div>
          {product?.filter(
            (item) =>
              item.type === "BURGERS" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>BURGERS</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "BURGERS" &&
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
        {/* ICECREAM*/}
        <div>
          {product?.filter(
            (item) =>
              item.type === "ICECREAM" &&
              item.product_title.toLowerCase().includes(search.toLowerCase())
          ).length !== 0 && <h2>ICECREAM</h2>}
          <div className="card-container">
            {product
              ?.filter(
                (item) =>
                  item.type === "ICECREAM" &&
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
      </div>
    </div>
  );
}

export default Cards;
