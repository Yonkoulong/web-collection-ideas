import React from "react";
import { Link } from "react-router-dom";

export const PageNotPermission = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1>403</h1>
      <p>Not Allow</p>
      <br />
      <Link to="/" style={{ textDecoration: "underline"}}>Go Home</Link>
    </div>
  );
};