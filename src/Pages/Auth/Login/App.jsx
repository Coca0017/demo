import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../App.scss";

import { useAuth } from '../../../utils/authContex';
import { Eye, EyeOff } from "lucide-react";

import Logo from "../../../assets/Coca-Cola_logo.svg.png";



function Login() {
  const navigate = useNavigate();
  const { login, user, loading} = useAuth(); 
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLogginIn, setIsLogginIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {

    if(!loginEmail || !loginPassword) {
      toast.dismiss();
      toast.error("All fields are required.");
      return;
    }

    if(loginPassword.length < 6) {
      toast.dismiss();
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if(!validateEmail(loginEmail)){
      toast.dismiss();
      toast.error("Please enter a valid email.");
      return;
    }


    if (isLogginIn) return;

    toast.dismiss();
    setIsLogginIn(true);
    toast.info(`Logging In! Please wait...`);

    try {
      await login(loginEmail, loginPassword);
      toast.dismiss();
      toast.success("Logged In successfully! Please wait...");

      setTimeout(() => {
        navigate("/Dashboard");
      }, 2400);
    } catch (error) {
      if (error.code === 400) {
        toast.dismiss();
        toast.error(
          "Bad Request: The server could not understand the request."
        );
      } else if (error.code === 401) {
        toast.dismiss();
        toast.error("Incorrect credentials.");
      } else if (error.code === 403) {
        toast.dismiss();
        toast.error(
          "Forbidden: You do not have permission to access this resource."
        );
      } else if (error.code === 404) {
        toast.dismiss();
        toast.error("Not Found: The requested resource could not be found.");
      }else if (error.code === 429) {
        toast.dismiss();
        toast.error("Rate Limit Exceeded: Please try again after some time.");
      } else {
        toast.dismiss();
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setIsLogginIn(false);
    }
  };

  useEffect(() => {
    if (!loading && user) {
        navigate("/Dashboard");
    }
  }, [loading, user, navigate]);

  return (
    <>
      <div className="loginCon">
        <ToastContainer />
        <img src={Logo} alt="Logo" />
        <div className="loginWrapper">
          <h2>Welcome back</h2>

          <div className="loginLogs">
            <div id="log">
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                required
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                }}
              />
            </div>

            <div id="log">
              <input
                className="passInput"
                type={showPassword ? "text" : "password"}
                id="pass"
                placeholder="Password"
                required
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
              />
              <div id="passOption">
                <div
                  id="show"
                  style={{ display: showPassword ? "none" : "block" }}
                  onClick={togglePasswordVisibility}
                >
                  <Eye />
                </div>
                <div
                  id="hide"
                  style={{ display: showPassword ? "block" : "none" }}
                  onClick={togglePasswordVisibility}
                >
                  <EyeOff />
                </div>
              </div>
            </div>

            <p>
              <Link
                to="/Reset"
                style={{ textDecoration: "none", color: "#e62636" }}
              >
                Forgotten Password?
              </Link>
            </p>

            <button
              onClick={handleSignIn}
              disabled={isLogginIn}
              className="btnGreen"
            >
              {isLogginIn ? "Logging In..." : "Login"}
            </button>

            <p>
              Don't have an account?{" "}
              <Link
                to="/Register"
                style={{ textDecoration: "none", color: "#e62636" }}
              >
                Sign Up
              </Link>
            </p>
          </div>

        
        </div>
      </div>
    </>
  );
}

export default Login;
