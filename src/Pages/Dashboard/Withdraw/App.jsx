import React, { useState, useEffect } from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout";

import { databases, client, databaseId, collectionId } from "../../../utils/Appwrite/config";
import { Account } from "appwrite";

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
          <span id="pageId">Withdraw Funds</span>

         <div className="withdrawalCon">
         <div className="withdrawDiv">
            <h3>Total Balance: {userData ? `GHS ${userData.TotalEarnings}` : "GHS 0"}</h3>

            <div className="withdrawalInputs">
              <input type="number" placeholder="Mobile Money Number" />
              <input type="text" placeholder="Network" />
              <input type="text" placeholder="Account Name" />
              <input type="number" placeholder="Amount" />
            </div>

            <button>Withdraw</button>
          </div>
         </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
