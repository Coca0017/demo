import React, { useState, useEffect } from "react";
import "./App.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout";
import { Copy } from "lucide-react";

import { databases, client, databaseId, collectionId } from "../../../utils/Appwrite/config";
import { Account } from "appwrite";

function DashCard({ Title, Body }) {
  return (
    <div className="card">
      <span id="head">{Title}</span>
      <h2 className="body">{Body}</h2>
    </div>
  );
}

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const account = new Account(client);
        const user = await account.get(); // Get logged-in user details

        // Fetch user data using document ID (which is the user ID)
        const response = await databases.getDocument(databaseId, collectionId, user.$id);

        setUserData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Layout>
        <ToastContainer />
        <div className="overviewWrapper">
          <span id="pageId">Overview</span>

          <div className="earningsDiv">
            <DashCard Title={"Total Earnings"} Body={userData ? `GHS ${userData.TotalEarnings}` : "Loading..."} />
            <DashCard Title={"Total Referrals Earnings"} Body={userData ? `GHS ${userData.Referral_Earnings}` : "Loading..."} />
            <DashCard Title={"Total Daily Earning"} Body={userData ? `GHS ${userData.DailyEarnings}` : "Loading..."} />
          </div>

          <div className="secondDiv">
            <DashCard Title={"Withdrawal limit"} Body={"2 times on weekdays"} />
            <DashCard Title={"Investment Plan"} Body={userData ? `${userData.Investment_Plan}` : "Loading..."} />
            <DashCard Title={"Rank"} Body={"Rookie"} />
          </div>

          <div className="marketingDiv">
            <span id="pageId">Marketing</span>
            <div className="marketingCard">
              <h2 id="head">Referral Program</h2>
              <p className="body">Invite A Friend To Earn A Commission</p>
              <div className="linkCon">
                <h1>https://www.coca-cola.com/Register?ref=example@email.com</h1>
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
