import React, { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from "../../../utils/authContex";

const Sidebar = ({ links, onLinkClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [ isSigningOut, setisSigningOut ] = useState(false);
  

  const location = useLocation();

  const handleSignOut = async () => {
    if (isSigningOut) return;

    toast.dismiss();
    setisSigningOut(true);

    try {
      await logout(); 
      navigate('/Login'); // Navigate to login page after sign out
    } catch (error) {
      toast.error("Error signing out");
      console.error(error);
    } finally {
      setisSigningOut(false);
    }
  }

  useEffect(() => {
    const currentPath = location.pathname;
    const activeLinkIndex = links.findIndex(link => link.path === currentPath);
    if (activeLinkIndex !== -1) {
      onLinkClick(activeLinkIndex);
    }
  }, [location, links, onLinkClick]);

  return (
    <div className="sideBarWrapper">
      <ToastContainer />
      <div className="sidebar">
        {links.map((link, index) => (
          <a
            href={link.path}
            key={index}
            onClick={() => onLinkClick(index)}
            className="sideLinks"
          >
            <div className={`icon ${link.active ? "active" : ""}`}>
              {link.icon}
              <span className="text">{link.name}</span>
            </div>
          </a>
        ))}
        <button
          className="sideButton"
          disabled={isSigningOut}
          onClick={handleSignOut}
        >
          <LogOut />
          <span className="logText">
            {isSigningOut ? "Sign Out..." : "Sign Out"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
