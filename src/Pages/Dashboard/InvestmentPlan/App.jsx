import React, { useState, useEffect } from "react";
import "./App.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout";
import Shimmer from "../../../Components/dashboardComponents/Shimmer/app";
import Spinner from "../../../Components/Widget/Loading/App";
import { Copy } from "lucide-react";

function PlanCard(props) {
  return (
    <div className="card">
      <span id="planTtile">{props.Title}</span>

      <h2 className="planInfo">{props.PlanInfo}</h2>

      <ul>
        <li>{props.PlanDetail1}</li>
        <li>{props.PlanDetail2}</li>
        <li>{props.PlanDetail3}</li>
        <li>{props.PlanDetail4}</li>
      </ul>

      <button>UPGRADE</button>
    </div>
  );
}

function App() {
  return (
    <>
      <Layout>
        <ToastContainer />
        <div className="overviewWrapper">
          <span id="pageId">Investment Plans</span>

          <div className="earningsDiv">
            <PlanCard
              Title={"Essential"}
              PlanInfo={"GHS 150 / Month"}
              PlanDetail1={"Daily returns: GHS 7.5"}
              PlanDetail2={"Access to basic features or services"}
              PlanDetail3={"Standard customer support"}
              PlanDetail4={"2 withdrawals per week (Week-Days)"}
            />
            <PlanCard
              Title={"Starter Plan"}
              PlanInfo={"GHS 300 / Month"}
              PlanDetail1={"Daily returns: GHS 21"}
              PlanDetail2={"Enhanced features or services"}
              PlanDetail3={"Additional bonuses"}
              PlanDetail4={"2 withdrawals per week (Week-Days)"}
            />
            <PlanCard
              Title={"Plus Plan"}
              PlanInfo={"GHS 450 / Month"}
              PlanDetail1={"Daily returns: GHS 36"}
              PlanDetail2={"Premium features or services"}
              PlanDetail3={"Priority customer support"}
              PlanDetail4={"2 withdrawals per week (Week-Days)"}
            />
          </div>

          <div className="earningsDiv">
            <PlanCard
              Title={"Pro Plan"}
              PlanInfo={"GHS 600 / Month"}
              PlanDetail1={"Daily returns: GHS 48"}
              PlanDetail2={"VIP features or services"}
              PlanDetail3={"Additional bonuses"}
              PlanDetail4={"2 withdrawals per week (Week-Days)"}
            />
            <PlanCard
              Title={"Premium Plan"}
              PlanInfo={"GHS 750 / Month"}
              PlanDetail1={"Daily returns: GHS 67.5"}
              PlanDetail2={"VIP features or services"}
              PlanDetail3={"Additional bonuses"}
              PlanDetail4={"2 withdrawals per week (Week-Days)"}
            />
            <PlanCard
              Title={"Ultimate Plan"}
              PlanInfo={"GHS 900 / Month"}
              PlanDetail1={"Daily returns: GHS 90"}
              PlanDetail2={"VIP features or services"}
              PlanDetail3={"Additional services"}
              PlanDetail4={"2 withdrawals per week (Week-Days)"}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
