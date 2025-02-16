import React, { useParams } from "react";
import { account } from "../../../utils/Appwrite/config";
import { Mail } from "lucide-react";
import "./App.scss";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate;
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get("userEmail");

  if (!userEmail) {
    navigate(-1);
  }

  return (
    <>
      <div className="container">
        <div className="mailWrapper">
          <Mail />
        </div>
        <h2>Please verify your mail</h2>
        <p>
          You are almost there! We've sent a mail to <br /> {userEmail}
        </p>

        <p>
          Just click on the link in your email to complete your sign up. If you
          do not see it, you may need to <b>check your spam</b> folder.
        </p>

        <p></p>
      </div>
    </>
  );
}

export default App;
