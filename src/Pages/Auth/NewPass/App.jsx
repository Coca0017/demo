import React, { useState,  } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../Assets/IconLogo.svg";
import { BiShowAlt, BiHide } from "react-icons/bi";
import googleIcon from "../../../Assets/googleIcon.svg";
import appleIcon from "../../../Assets/appleIcon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.scss";

import { account } from "../../../utils/Appwrite/config";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginPassword, setLoginPassword] = useState("");
  const [isReseting, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const secret = queryParams.get('secret');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handelReset = async () => {
    if (isReseting) return;
    if (!loginPassword) return;
    toast.dismiss();
    setIsRegistering(true);

    toast.info("Resetting Please Wait...");

    try {   
        await account.updateRecovery(userId,secret,loginPassword)
        .then(() => {
          toast.dismiss();
          toast.success("Password Reset Done");
        
            

          setTimeout(() => {
            navigate("/dashboard");
          }, 2400);

        })
        .catch((error) => {
            if (error.code === 401) {
                toast.dismiss();
                toast.error("Unauthorized: Invalid email.");
            }

            else if (error.code === 429) {
                toast.dismiss();
                toast.error("Rate Limit Exceeded: Please try again after some time.");
              }

            else{console.log(error);}
          
        });
    } finally {
      setIsRegistering(false); // Reset registering state to false after execution
    }
  };
  return (
    <>
      <div className="loginCon">
        <ToastContainer />
        <img src={Logo} alt="" />
        <div className="loginWrapper">
          <h2>Enter  New password</h2>

          <div className="loginLogs">
            <div id="log">
              <input
                className="passInput"
                type={showPassword ? "text" : "password"}
                id="pass"
                placeholder="New Password"
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
                  <BiShowAlt />
                </div>
                <div
                  id="hide"
                  style={{ display: showPassword ? "block" : "none" }}
                  onClick={togglePasswordVisibility}
                >
                  <BiHide />
                </div>
              </div>
            </div>

            <button className="btnGreen" onClick={handelReset}>
              {isReseting ? "Please Wait..." : "Continue"}
            </button>

            <p>
              <Link
                to="/Login"
                style={{ textDecoration: "none", color: "#094b88" }}
              >
                Back To Login
              </Link>
            </p>
          </div>
        </div>
        <div className="extraLinks">
          <Link to="/" style={{ textDecoration: "none", color: "#094b88" }}>
            Terms of use
          </Link>
          <p>|</p>
          <Link to="/" style={{ textDecoration: "none", color: "#094b88" }}>
            Privacy policy
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
