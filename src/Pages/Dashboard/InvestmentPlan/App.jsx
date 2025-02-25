import React, { useState } from "react";
import "./App.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout";

import { client, account, ID, databases, databaseId, planCollection, bucket, storage, projectID} from "../../../utils/Appwrite/config"; 


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
      <button onClick={() => setIsOpen(true)}>UPGRADE</button>
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    referenceId: "",
    amount: "",
    screenshot: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, screenshot: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.screenshot) {
        toast.error("Please upload a screenshot.");
        return;
      }

      // Upload Screenshot to Appwrite Storage
      const file = await storage.createFile(bucket, ID.unique(), formData.screenshot);
      const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucket}/files/${file.$id}/view?project=${projectID}`;

      // Save Data to Appwrite Database
      await databases.createDocument(databaseId, planCollection, ID.unique(), {
        Phone_Number: parseInt(formData.phoneNumber),
        Reference_Id: formData.referenceId,
        Amount: parseFloat(formData.amount),
        UserId: "CURRENT_USER_ID",
        Screenshot: fileUrl,
        Status: false, // Default status
      });

      toast.success("Verification request sent successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send request.");
    }
  };

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

                  <div className="paymentInfo">
                    <span>Phone Number: 0535471127 </span>
                    <span>Network: MTN</span>
                    <span>Holders Name: Thomas Awuah</span> 
                  </div>

                  <div className="inputWrapper">
                    <span>Phone Number:</span>
                    <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Mobile Money Number" />
                  </div>

                  <div className="inputWrapper">
                    <span>Reference Id:</span>
                    <input type="text" name="referenceId" value={formData.referenceId} onChange={handleInputChange} placeholder="Reference Id" />
                  </div>

                  <div className="inputWrapper">
                    <span>Amount:</span>
                    <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} placeholder="Amount" />
                  </div>

                  <div className="inputWrapper">
                    <span>Screenshot:</span>
                    <input type="file" onChange={handleFileChange} />
                  </div>

                  <button className="close-btn" onClick={handleSubmit}>
                    Request Verification
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="plansDiv">
            <PlanCard Title="Essential" PlanInfo="GHS 150 / Month" PlanDetail1="Daily returns: GHS 7.5" PlanDetail2="Basic features" PlanDetail3="Standard support" PlanDetail4="2 withdrawals per week (Week-Days)" setIsOpen={setIsOpen} />
            <PlanCard Title="Starter Plan" PlanInfo="GHS 300 / Month" PlanDetail1="Daily returns: GHS 21" PlanDetail2="Enhanced features" PlanDetail3="Bonuses" PlanDetail4="2 withdrawals per week (Week-Days)" setIsOpen={setIsOpen} />
            <PlanCard Title="Plus Plan" PlanInfo="GHS 450 / Month" PlanDetail1="Daily returns: GHS 36" PlanDetail2="Premium services" PlanDetail3="Priority support" PlanDetail4="2 withdrawals per week (Week-Days)" setIsOpen={setIsOpen} />
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
