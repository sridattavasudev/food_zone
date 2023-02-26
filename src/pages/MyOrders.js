import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const navigate = useNavigate();
  const getMyOrders = async () => {
    let loggedInUser = JSON.parse(localStorage.getItem("canteen_user"));
    try {
      let response = await axios({
        url: "http://localhost:5000/api/signup",
        method: "post",
        data: {
          userid: loggedInUser.userid,
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
  useEffect(() => {
    getMyOrders();
  }, []);

  return <div>MyOrders</div>;
}

export default MyOrders;
