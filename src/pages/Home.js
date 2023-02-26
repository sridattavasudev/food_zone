import { Slider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cards.css";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      {/* <div style={{ height: "20vh" }}>
        <Slider />
      </div> */}
      <div className="home-container">
        <h2
          onClick={() => {
            localStorage.setItem("admin", true);
            navigate("/login");
          }}
        >
          Admin
        </h2>
        <h2
          onClick={() => {
            localStorage.removeItem("admin");
            navigate("/login");
          }}
        >
          User
        </h2>
      </div>
    </>
  );
}

export default Home;
