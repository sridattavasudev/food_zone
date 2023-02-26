import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function UpdateModal({
  show,
  setShow,
  handleShow,
  items,
  setItems,
  allItemsFn,
}) {
  console.log(items, "items");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setItems({ ...items, [e.target.id]: e.target.value });
  };
  const handleClose = () => setShow(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let canteen_user = localStorage.getItem("canteen_user");
    try {
      let response = await axios({
        url: "http://localhost:5000/api/update-item",
        method: "PUT",
        data: {
          _id: items._id,
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
        allItemsFn();
        handleClose();
        alert("updated successfully");
      } else {
        alert("Error");
        console.log("ERROR");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                width: "89%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "2vh",
              }}
            >
              {/* <h2 style={{ textAlign: "center" }}>Add Items</h2> */}
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
                <Input
                  type="select"
                  name="select"
                  onChange={handleChange}
                  id="type"
                  value={items.type}
                >
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
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
