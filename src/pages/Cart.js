import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import {
  selectUser,
  inc_quantity,
  dec_quantity,
  remove_data,
  empty_data,
} from "../features/userSlice";
import { selectProduct, set_proData } from "../features/productSlice";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { selectSearch } from "../features/searchSlice";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
function Cart() {
  const user = useSelector(selectUser);
  const products = useSelector(selectProduct);
  const search = useSelector(selectSearch);
  const [price, setPrice] = useState(0);
  const [coupons, setCoupons] = useState("");
  const [flag, setFlag] = useState(false);
  const [myOrdersResponse, setmyOrdersResponse] = useState(null);
  // console.log(coupon);
  const handleChange = (event) => {
    setCoupons(event.target.value);
  };
  // console.log(coupons);
  console.log(products, "products from cart ");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const incrementBtn = (pro) => {
    let base_product = products.find((item) => item.id == pro.id);
    if (pro.display_quantity == base_product.quantity) {
      alert("Quantity Exceeded");
      return;
    }
    let details = {
      pro_id: pro.id,
    };
    dispatch(inc_quantity(details));
  };
  const decrementBtn = (pro, index) => {
    if (pro.display_quantity == 1) {
      let state1 = products.map((item) => {
        if (item.id === pro.id) {
          return { ...item, state: false };
        } else {
          return item;
        }
      });
      dispatch(set_proData(state1));
      dispatch(remove_data(index));
    } else {
      let base_product = products.filter((item) => item.id === pro.id);
      let details = {
        pro_id: pro.id,
      };
      dispatch(dec_quantity(details));
    }
    // console.log(base_product, details, pro_id);
  };
  const removeBtn = (pro, index) => {
    let state1 = products.map((item) => {
      if (item.id === pro.id) {
        return { ...item, state: false };
      } else {
        return item;
      }
    });
    dispatch(set_proData(state1));
    dispatch(remove_data(index));
  };
  const emptyCartBtn = (type) => {
    dispatch(empty_data());
    let state1 = products.map((item) => {
      return { ...item, state: false };
    });
    dispatch(set_proData(state1));
    if (type != "buyButton") {
      navigate("/");
    }
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const discountFn = (pro) => {
    let price = pro.list_price;
    let discount = pro.discount;
    let parsed = parseInt(discount.slice(0, discount.length - 1));
    let result = price - (parsed / 100) * price;
    return result;
  };

  function calculate() {
    if (user.length === 0) {
      setPrice(0);
    }
    if (user.length > 0) {
      // let prices=["40","80","90","56"];
      let prices = user.map((item) => {
        return parseInt(item.list_price) * parseInt(item.display_quantity);
      });
      let resultprice = prices.reduce((a, b) => parseInt(a) + parseInt(b));
      setPrice(resultprice);
      // console.log(prices);
    }
  }

  // console.log(user, "CART");

  const buyButton = async () => {
    try {
      let userDetailsFromLocal = JSON.parse(
        localStorage.getItem("canteen_user")
      );
      let orderDetails = user.map((item) => {
        let obj = {};
        obj.order = item.product_title;
        obj.quantity = item.display_quantity;
        obj.price = parseInt(item.display_quantity) * parseInt(item.list_price);
        obj.userid = userDetailsFromLocal.userid;

        return obj;
      });
      // console.log(orderDetails, "ORDER DETAILS");
      let response = await axios({
        url: "http://localhost:5000/api/orders",
        method: "post",
        data: {
          userid: userDetailsFromLocal.userid,
          orders: orderDetails,
        },
      });
      console.log(response, "response");
      if (response.status == 201) {
        alert("order successful");
        emptyCartBtn("buyButton");
        myOrders();
        // navigate("/cards");
      } else {
        alert("Error");
        console.log("ERROR");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  const myOrders = async () => {
    try {
      let userDetailsFromLocal = JSON.parse(
        localStorage.getItem("canteen_user")
      );
      // console.log(orderDetails, "ORDER DETAILS");
      let response = await axios({
        url: "http://localhost:5000/api/my-orders",
        method: "POST",
        data: {
          userid: userDetailsFromLocal.userid,
        },
      });
      console.log(response, "response");
      if (response.status == 200) {
        console.log("Orders fetched Successfully");
        let orderDetails = response?.data;
        let orders = [];
        for (let i = 0; i < orderDetails?.length; i++) {
          for (let j = 0; j < orderDetails[i]?.orders?.length; j++) {
            orders.push(orderDetails[i]?.orders[j]);
          }
        }
        console.log(orders, "ALL ORDERS");
        setmyOrdersResponse(orders);
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
    calculate();
    myOrders();
  }, [user]);
  return (
    <>
      <div className="cart-container">
        <div className="first-child-cart">
          <div className="first-child-cartHead">
            <div style={{ fontWeight: "bolder", fontSize: "27px" }}>
              My Cart({user.length})
            </div>
          </div>
          <div>
            <hr />
            {user
              ?.filter((item) =>
                item.product_title.toLowerCase().includes(search.toLowerCase())
              )
              ?.map((product, index) => (
                <div key={product.id} className="cart-box">
                  <div className="first-child1">
                    <img
                      src={product.p_image}
                      alt="productImage"
                      width="350"
                      height="280"
                      // style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="second-child1">
                    <div style={{ fontWeight: "bold" }}>
                      {product.product_title.toUpperCase()}
                    </div>
                    <div style={{ fontWeight: "bold" }}>
                      <span style={{ color: "#f48135", fontSize: "24px" }}>
                        ???{" "}
                        {numberWithCommas(
                          parseInt(product.display_quantity) *
                            product.list_price
                        )}
                        .00
                      </span>
                    </div>

                    <Button
                      color="warning"
                      onClick={() => removeBtn(product, index)}
                    >
                      Remove from cart
                    </Button>
                    <hr />
                    <div style={{ margin: "-2% 0%" }}>
                      <button
                        style={{
                          width: "1.8vw",
                          backgroundColor: "#ebebeb",
                          color: "black",
                          border: "none",
                          borderRadius: "100%",
                          textAlign: "center",
                          height: "1.8vw",
                        }}
                        onClick={() => decrementBtn(product, index)}
                      >
                        -
                      </button>
                      <span
                        style={{
                          margin: "0% 2%",
                          border: "1px solid #ebebeb",
                          padding: "1px 10px",
                        }}
                      >
                        {product.display_quantity}
                      </span>

                      <button
                        style={{
                          width: "1.8vw",
                          backgroundColor: "#ebebeb",
                          color: "black",
                          border: "none",
                          borderRadius: "100%",
                          textAlign: "center",
                          height: "1.8vw",
                        }}
                        onClick={() => incrementBtn(product)}
                      >
                        +
                      </button>
                    </div>
                    <hr />
                  </div>
                </div>
              ))}
            <hr />
          </div>
          <div className="order-container">
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "27px",
                marginLeft: "1vw",
                marginBottom: "1vh",
              }}
            >
              My orders
            </div>
            <div>
              <div className="list_orders_cart" style={{ marginLeft: "1vw" }}>
                <h5>Item</h5>
                <h5 style={{ marginLeft: "-5px" }}>Quantity</h5>
                <h5 style={{ marginRight: "-10px" }}>Price</h5>
              </div>
              <ListGroup>
                {myOrdersResponse?.map((order_item, order_index) => (
                  <ListGroupItem>
                    <div className="list_orders_cart">
                      <div>{order_item.order}</div>

                      <div>{order_item?.quantity}</div>

                      <div>{order_item?.price}</div>
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </div>
        </div>
        <div className="second-child-cart">
          <div>
            <div className="second-child-cartHeader">PRICE DETAILS </div>
            <hr />
            {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Price({user.length} items)</div>
            <div>{price}</div>
          </div> */}

            <div className="second-child-cartFooter">
              <div>Total Price</div>
              {user.length > 0 ? <div>??? {price}</div> : <div>0</div>}
            </div>
            <hr />
          </div>
          <div>
            {user.length === 0 ? (
              ""
            ) : (
              <div className="cart-footer">
                <div>
                  <Button color="warning" onClick={emptyCartBtn}>
                    Empty cart
                  </Button>
                </div>
                <div>
                  <Button color="success" onClick={buyButton}>
                    Buy
                  </Button>
                </div>
              </div>
            )}
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}

export default Cart;
