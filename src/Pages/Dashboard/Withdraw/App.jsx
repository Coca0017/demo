import React, { useState } from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Layout>
        <ToastContainer />

        <div className="overviewWrapper">
          <span id="pageId">Withdraw Funds</span>

         <div className="withdrawalCon">
         <div className="withdrawDiv">
            <h3>Total Balance: Ghs 0</h3>

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
