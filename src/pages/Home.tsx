import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
       
      }}
    >
      <div style={{ margin: "0", position: "absolute", top: "50%", left:"40%" }}>
        <Link
          style={{
            backgroundColor: "#00bfb2",
            color: "white",
            padding: "15px 25px",
            textDecoration: "none",
            marginTop: "30px",
            textAlign: "center",
            top: "50%",
          }}
          to="/DocumentDetection"
        >
          Start you Journey
        </Link>
      </div>
    </div>
  );
}

export default Home;
