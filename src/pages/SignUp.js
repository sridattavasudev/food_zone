import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Username: ", username);
    // console.log("Password: ", password);

    try {
      let response = await axios({
        url: "http://localhost:5000/api/signup",
        method: "post",
        data: {
          userid: username,
          password: password,
        },
      });
      //   console.log(response, "response");
      if (response.status == 201) {
        alert("Sign up successful");
        navigate("/login");
      } else {
        alert("Error");
        // console.log("ERROR");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

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
        <h2 style={{ textAlign: "center" }}>SIGN UP</h2>
        <FormGroup>
          <Label for="username">UserId</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>

        <FormGroup style={{ textAlign: "center" }}>
          <div>
            Already have an account ?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Click here
            </span>{" "}
            to login
          </div>
        </FormGroup>

        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
