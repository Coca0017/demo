import React, { useState } from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout";

function PlanCard({ Title, PlanInfo, PlanDetail1, PlanDetail2, PlanDetail3, PlanDetail4, setIsOpen }) {
  return (
    <div className="card">
      <span id="planTtile">{Title}</span>
      <h2 className="planInfo">{PlanInfo}</h2>
      <ul>
        <li>{PlanDetail1}</li>
        <li>{PlanDetail2}</li>
        <li>{PlanDetail3}</li>
        <li>{PlanDetail4}</li>
      </ul>
      {/* Fix: Use setIsOpen only if passed as a prop */}
      <button onClick={() => setIsOpen(true)}>UPGRADE</button>
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Layout>
        <ToastContainer />

      

        <div className="overviewWrapper">
       
          <span id="pageId">Investment Plans</span>


          <div className="popup-container">
          {isOpen && (
            <div className="popup-overlay" onClick={() => setIsOpen(false)}>
              <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                <h2>Send Details for Verification</h2>

                <div className="inputWrapper">
                    <span>Phone Number:</span>
                    <input type="text" placeholder="Mobile Money Number" />
                </div>

                <div className="inputWrapper">
                    <span>Reference Id:</span>
                    <input type="text" placeholder="Reference Id" />
                </div>

                <div className="inputWrapper">
                    <span>Amount:</span>
                    <input type="number" placeholder="Amount" />
                </div>

                <div className="inputWrapper">
                <span>Screenshot:</span>
                  <input type="file"  />
                </div>
                
                <button className="close-btn">
                  Request Verification
                </button>
              </div>
            </div>
          )}
        </div>

          <div className="plansDiv">
            <PlanCard
              Title="Essential"
              PlanInfo="GHS 150 / Month"
              PlanDetail1="Daily returns: GHS 7.5"
              PlanDetail2="Access to basic features or services"
              PlanDetail3="Standard customer support"
              PlanDetail4="2 withdrawals per week (Week-Days)"
              setIsOpen={setIsOpen} // Fix: Passing setIsOpen as a prop
            />
            <PlanCard
              Title="Starter Plan"
              PlanInfo="GHS 300 / Month"
              PlanDetail1="Daily returns: GHS 21"
              PlanDetail2="Enhanced features or services"
              PlanDetail3="Additional bonuses"
              PlanDetail4="2 withdrawals per week (Week-Days)"
              setIsOpen={setIsOpen}
            />
            <PlanCard
              Title="Plus Plan"
              PlanInfo="GHS 450 / Month"
              PlanDetail1="Daily returns: GHS 36"
              PlanDetail2="Premium features or services"
              PlanDetail3="Priority customer support"
              PlanDetail4="2 withdrawals per week (Week-Days)"
              setIsOpen={setIsOpen}
            />
          </div>

          <div className="plansDiv">
            <PlanCard
              Title="Pro Plan"
              PlanInfo="GHS 600 / Month"
              PlanDetail1="Daily returns: GHS 48"
              PlanDetail2="VIP features or services"
              PlanDetail3="Additional bonuses"
              PlanDetail4="2 withdrawals per week (Week-Days)"
              setIsOpen={setIsOpen}
            />
            <PlanCard
              Title="Premium Plan"
              PlanInfo="GHS 750 / Month"
              PlanDetail1="Daily returns: GHS 67.5"
              PlanDetail2="VIP features or services"
              PlanDetail3="Additional bonuses"
              PlanDetail4="2 withdrawals per week (Week-Days)"
              setIsOpen={setIsOpen}
            />
            <PlanCard
              Title="Ultimate Plan"
              PlanInfo="GHS 900 / Month"
              PlanDetail1="Daily returns: GHS 90"
              PlanDetail2="VIP features or services"
              PlanDetail3="Additional services"
              PlanDetail4="2 withdrawals per week (Week-Days)"
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </Layout>
      
    </>
  );
}

export default App;
