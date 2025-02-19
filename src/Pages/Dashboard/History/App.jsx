import React, { useState } from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout";

function App() {

  return (
    <>
      <Layout>
        <ToastContainer />

        <div className="overviewWrapper">
          <span id="pageId">Transaction History</span>
        </div>
      </Layout>
    </>
  );
}

export default App;
