import React, { useState, useEffect } from "react";
import "./App.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout";
import Shimmer from "../../../Components/dashboardComponents/Shimmer/app";
import Spinner from "../../../Components/Widget/Loading/App";
import { Copy } from "lucide-react";


function DashCard(props) {
  return(
    <div className="card">
      <span id="head">
        {props.Title}
      </span>

      <h2 className="body">
        {props.Body}
      </h2>
    </div>
  );
}


function App() {
 
  return (
    <>
      <Layout>
        <ToastContainer />
            Investment Plan
      </Layout>
    </>
  );
}

export default App;
