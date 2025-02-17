// FileCard.js
import React, {useState} from "react";

import "./app.scss";

import { storage, bucket } from "../../../utils/Appwrite/config";

import Chip from "@mui/material/Chip";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Heart } from "lucide-react";



function FileCard({ docType, title, description, category, fileId }) {
  
  const [isDownloading, setIsDownloading] = useState(false);

  const comingSoon = () => {
    toast.info("Coming Soon..!");
  };

  const downloadFile = () => {   
    if (isDownloading) return;

    toast.dismiss();
    setIsDownloading(true);
    toast.info(`Downloading! Please wait...`);
    
    try {
      const downloadUrl = storage.getFileDownload(bucket, fileId);
  
      console.log(`File ID: ${fileId} / Bucket: ${bucket}`);
      window.location.href = downloadUrl.href;

      toast.dismiss();
      toast.success("Downloaded successfully...!");

    } catch (error) {
      console.error("Failed to download file:", error);
      toast.dismiss();
      toast.error("An unexpected error occured");
    }finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fileCard">
      <div className="cardIcon">
        <img src={docType} alt="File Icon" />
      </div>
      <div className="midClass">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="cardCat">
          {category.map((cat, index) => (
            <Chip
              key={index}
              label={cat}
              variant="filled"
              className="fileCategory"
            />
          ))}
        </div>
      </div>
      <div id="line"></div>

      <div className="bottomButtons">
        <div className="like">
          <Heart />
        </div>

        <div className="extraButtons">
          <button className="view" onClick={comingSoon} >
            View Info
          </button>

          <button className="download" onClick={downloadFile} disabled={isDownloading}>
          {isDownloading ? "Downloading..." : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileCard;
