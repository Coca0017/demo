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
        <div className="overviewWrapper">
          <span id="pageId">Overview</span>

          <div className="earningsDiv">
            <DashCard  Title={"Total Earnings"} Body={"GHS 0"} />
            <DashCard  Title={"Total Referrals Earnings"} Body={"GHS 0"} />
            <DashCard  Title={"Total Task Earning"} Body={"GHS 0"} />
          </div>

          <div className="secondDiv">
            <DashCard  Title={"Withdrawal limit"} Body={"2 times on weekdays"} />
            <DashCard  Title={"Investment Plan"} Body={"None"} />
            <DashCard  Title={"Rank"} Body={"N/A"} />
          </div>

          <div className="marketingDiv">
          <span id="pageId">Markerting</span>

            <div className="marketingCard">
              <h2 id="head">Referral Program</h2>

              <p className="body">
                Invite A Friend To Earn A Comission
              </p>

              <div className="linkCon">
                <h1>
                  https://www.coca-cola.com/?ref="Lucid"
                </h1>

                <Copy />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
