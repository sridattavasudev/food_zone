import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Username: ", username);
    // console.log("Password: ", password);
    try {
      let response = await axios({
        url: "http://localhost:5000/api/login",
        method: "post",
        data: {
          userid: username,
          password: password,
        },
      });
      console.log(response, "response");
      if (response.status == 200) {
        alert("Login successful");
        localStorage.setItem("canteen_user", JSON.stringify(response.data));

        if (response.data?.admin != 0) {
          navigate("/admin");
        } else {
          navigate("/cards");
        }
      } else {
        alert("Error");
        console.log("ERROR");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };
  // console.log(username, password);
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
        <h2 style={{ textAlign: "center" }}>LOGIN</h2>
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
        {localStorage.getItem("admin") ? (
          ""
        ) : (
          <FormGroup
            style={{ textAlign: "end", cursor: "pointer" }}
            onClick={() => navigate("/forgot-password")}
          >
            <FormText>Forgot password</FormText>
          </FormGroup>
        )}
        {localStorage.getItem("admin") ? (
          ""
        ) : (
          <FormGroup style={{ textAlign: "center" }}>
            <div>
              Don't have an account ?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigate("/signup")}
              >
                Click here
              </span>{" "}
              to sign up
            </div>
          </FormGroup>
        )}
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;

export function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Username: ", username);
    // console.log("Password: ", password);
    try {
      let response = await axios({
        url: "http://localhost:5000/api/forgot-password",
        method: "post",
        data: {
          userid: username,
          password: password,
        },
      });
      if (response.status == 200) {
        alert("Reset successful");
        navigate("/login");
      } else {
        alert("Error");
        console.log("ERROR");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };
  // console.log(username, password);
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
        <h2 style={{ textAlign: "center" }}>FORGOT PASSWORD</h2>
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

        <Button color="primary" onClick={handleSubmit}>
          Reset Password
        </Button>
      </Form>
    </div>
  );
}
