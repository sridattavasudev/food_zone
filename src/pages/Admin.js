import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import UpdateModal from "./UpdateModal";
export default function Admin() {
  const navigate = useNavigate();
  return (
    <div className="admin-container">
      <h2
        onClick={() => {
          navigate("/add-items");
        }}
      >
        Add Items
      </h2>
      <h2
        onClick={() => {
          navigate("/update-items");
        }}
      >
        Update Items
      </h2>
      <h2
        onClick={() => {
          navigate("/all-orders");
        }}
      >
        Orders
      </h2>
    </div>
  );
}

// export default Admin;

// Display all orders
export function AllOrders() {
  const [orders, setorders] = useState([]);

  const getAllOrders = async () => {
    try {
      // console.log(orderDetails, "ORDER DETAILS");
      let response = await axios({
        url: "http://localhost:5000/api/getorders",
        method: "GET",
      });
      // console.log(response, "response");
      if (response.status == 200) {
        setorders(response?.data);
      } else {
        alert("Error");
        console.log("ERROR");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  // Delete order
  const confirmButton = async (item) => {
    try {
      let response = await axios({
        url: "http://localhost:5000/api/delete-order",
        method: "POST",
        data: {
          _id: item._id,
        },
      });
      // console.log(response, "response");
      if (response.status == 200) {
        alert("Confirmed");
        getAllOrders();
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
    getAllOrders();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          border: "1px solid black",
          width: "100%",
          textAlign: "center",
        }}
      >
        All Orders
      </h2>
      <div className="list_orders_heading">
        <h4 style={{ marginLeft: "-0.5vw" }}>Item</h4>
        <h4 style={{ marginLeft: "-2vw" }}>Quantity</h4>
        <h4 style={{ marginLeft: "-2vw" }}>Price</h4>
      </div>
      {orders?.map((item, index) => (
        <div style={{ marginLeft: "10vw", marginRight: "10vw", width: "71vw" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "28vw" }}>
              <h4>UserId :{" " + item?.userid}</h4>
            </div>
            <div>
              <button onClick={() => confirmButton(item)}>Confirm</button>
            </div>
          </div>
          <ListGroup>
            {item?.orders?.map((order_item, order_index) => (
              <ListGroupItem>
                <div className="list_orders">
                  <div>{order_item.order}</div>

                  <div>{order_item?.quantity}</div>

                  <div>{order_item?.price}</div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      ))}
    </div>
  );
}

// add items

export function AddItems() {
  const [items, setItems] = useState({
    product_title: "",
    list_price: "",
    p_image: "",
    quantity: "",
    type: "BREAKFAST",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setItems({ ...items, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let canteen_user = localStorage.getItem("canteen_user");
    try {
      let response = await axios({
        url: "http://localhost:5000/api/add-item",
        method: "post",
        data: {
          product_title: items.product_title,
          list_price: items.list_price,
          p_image: items.p_image,
          quantity: items.quantity,
          type: items.type,
          admin: canteen_user?.admin,
        },
      });
      console.log(response, "response");
      if (response.status == 201) {
        setItems({
          product_title: "",
          list_price: "",
          p_image: "",
          quantity: "",
          type: "BREAKFAST",
        });
        alert("added successful");
      } else {
        alert("Error");
        console.log("ERROR");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };
  // console.log(items, "items");
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        style={{
          width: "45vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "2vh",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Add Items</h2>
        <FormGroup>
          <Label for="product_title">Title</Label>
          <Input
            type="text"
            id="product_title"
            onChange={handleChange}
            value={items.product_title}
          />
        </FormGroup>
        <FormGroup>
          <Label for="list_price">Price</Label>
          <Input
            type="text"
            id="list_price"
            onChange={handleChange}
            value={items.list_price}
          />
        </FormGroup>
        <FormGroup>
          <Label for="p_image">Image</Label>
          <Input
            type="text"
            id="p_image"
            onChange={handleChange}
            value={items.p_image}
          />
        </FormGroup>
        <FormGroup>
          <Label for="quantity">Quantity</Label>
          <Input
            type="text"
            id="quantity"
            onChange={handleChange}
            value={items.quantity}
          />
        </FormGroup>
        <FormGroup>
          <Label for="type">Type</Label>
          <Input type="select" name="select" onChange={handleChange} id="type">
            {[
              "BREAKFAST",
              "LUNCH",
              "PUFFS",
              "PASTRIES",
              "SMOOTHIES",
              "SHAKES",
              "MOJITOS",
              "FRIES",
              "FRANKIES",
              "SPLSANDWICH",
              "BURGERS",
              "ICECREAM",
            ].map((item, index) => (
              <option value={item}>{item}</option>
            ))}
          </Input>
        </FormGroup>

        <Button color="primary" onClick={handleSubmit}>
          Add Item
        </Button>
      </Form>
    </div>
  );
}

export function UpdateItems() {
  const [allItems, setAllItems] = useState([]);
  const [show, setShow] = useState(false);
  const [items, setItems] = useState({
    product_title: "",
    list_price: "",
    p_image: "",
    quantity: "",
    type: "BREAKFAST",
  });

  const handleShow = () => setShow(true);
  const allItemsFn = async () => {
    try {
      // console.log(orderDetails, "ORDER DETAILS");
      let response = await axios({
        url: "http://localhost:5000/api/all-items",
        method: "GET",
      });
      // console.log(response, "response");
      if (response.status == 200) {
        console.log("Items fetched Successfully");
        setAllItems(response.data);
      } else {
        alert("Error");
        console.log("ERROR");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  const updateButtonFn = (item) => {
    setItems({
      ...items,
      list_price: item.list_price,
      p_image: item.p_image,
      product_title: item.product_title,
      quantity: item.quantity,
      type: item.type,
      _id: item._id,
    });
    handleShow();
  };

  useEffect(() => {
    allItemsFn();
  }, []);
  return (
    <div
      className="order-container"
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontWeight: "bolder",
          fontSize: "27px",
          marginLeft: "1vw",
          marginBottom: "1vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        All Items
      </div>
      <div style={{ width: "85vw" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // margin: "0 23px 0 17px",
          }}
        >
          <h5>Item</h5>
          <h5>Quantity</h5>
          <h5>Price</h5>
          <h5>Update</h5>
        </div>
        <ListGroup>
          {allItems?.map((item, index) => (
            <ListGroupItem>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "5.9%" }}>{item.product_title}</div>

                <div style={{ width: "5.9%" }}>{item?.quantity}</div>

                <div>{item?.list_price}</div>
                <div>
                  <Button color="primary" onClick={() => updateButtonFn(item)}>
                    Update
                  </Button>
                </div>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      <UpdateModal
        show={show}
        setShow={setShow}
        handleShow={handleShow}
        items={items}
        setItems={setItems}
        allItemsFn={allItemsFn}
      />
    </div>
  );
}
