import React, {useState} from 'react'
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../App.scss'; 

import { account } from '../../../utils/Appwrite/config';

import Logo from "../../../assets/Coca-Cola_logo.svg.png";

function App() {

  const [resetMail, setResetMail] = useState("");
  const [isReseting, setIsRegistering] = useState(false);

  const handelReset = async () => {
    if(isReseting) return;
    if(!resetMail) return;
    toast.dismiss();
    setIsRegistering(true);

    toast.info('Sending Mail! Please Wait...');

    try{
      await account.createRecovery( resetMail,'http://localhost:5173/New-password')
      .then(() => {
        toast.dismiss();
        toast.success("Mail Sent...");
      })
      .catch((error) => {
        if (error.code === 401) {
          toast.dismiss();
          toast.error("Unauthorized: Invalid Mail.");
        } 
        else if (error.code === 429) {
          toast.dismiss();
          toast.error("Rate Limit Exceeded: Please try again after some time.");
        }
        else {
          toast.dismiss();
          toast.error(`Error: an unexpected error occured`);
          console.log(error);
        }
      });
    }finally {
      setIsRegistering(false); // Reset registering state to false after execution
    }

  }
  return (
    <>
    <div className="loginCon">
    <ToastContainer />
        <img src={Logo} alt="" />
        <div className="loginWrapper">
          <h2>Reset your password</h2>
          <p>Enter your email address and we will send you instructions to reset your password.</p>

          <div className="loginLogs">
            <div id="log">
              <input type="email" id="email" onChange={(event)=> {setResetMail(event.target.value)}} placeholder="Email Address" />
            </div>

            <button className="btnGreen" onClick={handelReset}>{isReseting ? "Reseting..." : "Reset Now"}</button>

            <p>
             <Link to="/Login" style={{textDecoration:"none", color: "#e62636"}}>Back To Login</Link>
            </p>
          </div>

        </div>
       
      </div>
    </>
  )
}

export default App