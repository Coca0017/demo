import React, { useState, useEffect } from "react";
import "./App.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout";
import Shimmer from "../../../Components/dashboardComponents/Shimmer/app";
import Spinner from "../../../Components/Widget/Loading/App";


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
        <div className="overviewWrapper">
          <span id="pageId">Overview</span>

          <div className="earningsDiv">
            <DashCard  Title={"Total Earnings"} Body={"GHS 0"} />
            <DashCard  Title={"Total Referrals Earnings"} Body={"GHS 0"} />
            <DashCard  Title={"Total Task Earning"} Body={"GHS 0"} />
          </div>

          <div className="secondDiv">
            <DashCard  Title={"Withdrawal limit"} Body={"2 times on weekdays"} />
            <DashCard  Title={"Investment Plan"} Body={"Platinum"} />
            <DashCard  Title={"Rank"} Body={"N/A"} />
          </div>

          <div className="marketingDiv">

          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
