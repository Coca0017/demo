import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.scss";

import { client, account, ID, databases, OAuthProvider, databaseId, collectionId} from "../../../utils/Appwrite/config"; 
import { useAuth } from "../../../utils/authContex";



import { Eye, EyeOff, } from "lucide-react";
import Logo from "../../../assets/Coca-Cola_logo.svg.png";

function Signup() {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };




  /*{const handleGoogleAuth = async (e) => {
    //function to handle google auth
    try{
      account.createOAuth2Session(
        OAuthProvider.Google,
        'http://localhost:5173/Dashboard',
        'http://localhost:5173/Login'
      );
    } catch(error) {
      console.log(error);
    }
  }}*/

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission

     // Validation logic
     if (!registerEmail || !registerPassword || !registerUsername) {
      toast.dismiss();
      toast.error("All fields are required.");
      return;
    }

    if (!validateEmail(registerEmail)) {
      toast.dismiss();
      toast.error("Please enter a valid email.");
      return;
    }

    if (registerPassword.length < 6) {
      toast.dismiss();
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (isRegistering) return;
    

    toast.dismiss();
    setIsRegistering(true);
    toast.dismiss();
    toast.info(`Creating Account! Please wait...`);

    try {
      const userCred = await account.create(
        ID.unique(),
        registerEmail,
        registerPassword,
        registerUsername
      );

      const userId = userCred.$id;

      await databases.createDocument(
        databaseId,
        collectionId, 
        userId, 
        {
            Username: registerUsername,
            Email: registerEmail,
            Date_Joined: new Date().toISOString(),
            Password: registerPassword,
            TotalEarnings: 0,
            DailyEarnings: 0,
            WithdrawalLimit: 0,
            TotalReferrals: 0,
            ReferredBy: ''
        }
    );


       // Authenticate the user to avoid verification email error
      await login(registerEmail, registerPassword);
   

      try {
        //for development
       
        await account.createVerification('http://localhost:5173/Dashboard');
       
        //for production
        //await account.createVerification('https://edufied.online/Verify-email');
        toast.dismiss();
        toast.success("Account created successfully! Please wait..");
       /** setTimeout(() => {
          navigate(`/CheckMail?userEmail=${registerEmail}`); 
        }, 2400); */
      } catch (error) {
        console.log(error);
        toast.error("Failed to send verification email. Please try again later.");
      }
      


      

    } catch (error) {
      if (error.code === 400) {
        toast.dismiss();
        toast.error("Bad Request: The server could not understand the request.");
      } else if (error.code === 401) {
        toast.dismiss();
        toast.error("Unauthorized: Incorrect email or password.");
      } else if (error.code === 403) {
        toast.dismiss();
        toast.error("Forbidden: You do not have permission to access this resource.");
      } else if (error.code === 404) {
        toast.dismiss();
        toast.error("Not Found: The requested resource could not be found.");
        console.log(error);
      } else if (error.code === 409) {
        toast.dismiss();
        toast.error("Conflict: The email is already registered.");
      } else if (error.code === 429) {
        toast.dismiss();
        toast.error("Rate Limit Exceeded: Please try again after some time.");
      } else {
        toast.dismiss();
        toast.error("Error: An unexpected network error occurred");
        console.log(error);
      }
    } finally {
      // Reset registering state to false after execution
      setIsRegistering(false);
    }
  };

  return (
    <>
      <div className="loginCon">
        <ToastContainer />
        <img src={Logo} alt="logo" />
        <div className="loginWrapper">
          <h2>Create your account</h2>

          <div className="loginLogs">
            <div id="log">
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                required
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
              />
            </div>

            <div id="log">
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                onChange={(event) => {
                  setRegisterUsername(event.target.value);
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
                  setRegisterPassword(event.target.value);
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

            <button
              onClick={handleSignUp}
              disabled={isRegistering}
              className="btnGreen"
            >
              {isRegistering ? "Registering..." : "Register"}
            </button>

            <p>
              Already have an account ?{" "}
              <Link
                to="/Login"
                style={{ textDecoration: "none", color: "#e62636" }}
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
