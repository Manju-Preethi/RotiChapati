import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import Loader from "../Loader/Loader";
import {toast} from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    let newUrl = url + (currState === "Login" ? "/api/user/login" : "/api/user/register");

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success("Logged in successfully.");
      } else {
        (response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt="close"
            />
          </div>

          <div className="login-popup-inputs">
            {currState !== "Login" && (
              <input
                className="namee"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Name"
                required
              />
            )}
            <input
              className="emaill"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="pass"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <button type="submit">
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>

          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p className="continuee">
              By continuing, I agree to the terms of use & privacy policy.
            </p>
          </div>

          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default LoginPopup;
