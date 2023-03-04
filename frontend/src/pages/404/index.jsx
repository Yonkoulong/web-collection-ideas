import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1>404</h1>
      <p>Not Found</p>
      <br />
      <Link to="/" style={{ textDecoration: "underline"}}>Go Home</Link>
    </div>
  );
};