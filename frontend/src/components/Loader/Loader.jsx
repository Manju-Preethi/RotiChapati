import React from "react";
import "./Loader.css";
import logo from "../../assets/logo.png";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="inline-loader">
      <CircularProgress
        size={80}
        thickness={3}
        sx={{ color: "#f75a3e" }}
      />
    </div>
  );
};

export default Loader;
