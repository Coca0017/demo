import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.scss";

import { client, account, ID, databases, OAuthProvider, databaseId, collectionId} from "../../../utils/Appwrite/config"; 
import { useAuth } from "../../../utils/authContex";
import { Query } from "appwrite";



import { Eye, EyeOff, } from "lucide-react";
import Logo from "../../../assets/Coca-Cola_logo.svg.png";

function Signup() {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [refCode, setRefCode] = useState("");
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
      e.preventDefault();
    
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
      toast.info("Creating Account! Please wait...");
    
      try {
        // Create the user
        const userCred = await account.create(ID.unique(), registerEmail, registerPassword, registerUsername);
        const userId = userCred.$id;
    
        // Initialize user document data
        let userData = {
          Username: registerUsername,
          Email: registerEmail,
          Date_Joined: new Date().toISOString(),
          Password: registerPassword,
          TotalEarnings: 0,
          DailyEarnings: 0,
          WithdrawalLimit: 0,
          TotalReferrals: 0,
          Referral_Earnings: 0,
          ReferredBy: refCode || null,
        };
    
        // If a referral code (email) is provided, find the referrer
        if (refCode) {
          const referrerQuery = await databases.listDocuments(databaseId, collectionId, [
            Query.equal("Email", refCode)
          ]);
    
          if (referrerQuery.documents.length > 0) {
            const referrer = referrerQuery.documents[0];
            const referrerId = referrer.$id;
    
            // Update referrer's earnings and referral count
            await databases.updateDocument(databaseId, collectionId, referrerId, {
              Referral_Earnings: referrer.Referral_Earnings + 10,
              TotalReferrals: referrer.TotalReferrals + 1,
            });
    
            userData.ReferredBy = referrer.Email; // Store the referrer’s email
          }
        }
    
        // Create user document in the database
        await databases.createDocument(databaseId, collectionId, userId, userData);
    
        // Authenticate user
        await login(registerEmail, registerPassword);
    
        // Send verification email
        await account.createVerification("http://localhost:5173/Dashboard");
        toast.dismiss();
        toast.success("Account created successfully! Please wait...");
      } catch (error) {
        console.error(error);
        toast.dismiss();
        toast.error("Error: An unexpected network error occurred");
      } finally {
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

            <div id="log">
              <input
                type="text"
                id="refCode"
                placeholder="Referral Code (Optional)"
                required
                onChange={(event) => {
                  setRefCode(event.target.value);
                }}
              />
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
