import React, { useState, useEffect } from "react";
import { account } from "../../utils/Appwrite/config";

import "./layout.scss";
import Nav from "../../Components/dashboardComponents/Header/app";
import Sidebar from "../../Components/dashboardComponents/Sidebar/app";
import {
  LayoutDashboard,
  CircleUser,
  Landmark,
  Receipt,
  FileClock
} from "lucide-react";
import { useLocation } from 'react-router-dom';



function Layout({ children }) {
  const [username, setUsername] = useState("");


  //get user info
  const fetchUserInfo = async () =>{
    try{
      const user = await account.get(); // This fetches the current user
      setUsername(user.name);
    }catch(error){
      setUsername("N/A");
      console.log(error);
    }
  }

  useEffect(() => {
   fetchUserInfo();
  }, []);


 // const userData = useUserData();
  const location = useLocation();

  const [activeLink, setActiveLink] = useState(0);

  // Function to handle sidebar link clicks
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const Links = [
    {
      name: "Dashboard",
      path: "/Dashboard",
      icon: <LayoutDashboard />,
      active: activeLink === 0,
    },
    {
      name: "Investment Plans",
      path: "/Dashboard/AI",
      icon: <Landmark />,
      active: activeLink === 1,
    },
    {
      name: "Withdraw Funds",
      path: "/Dashboard/New-Upload",
      icon: <Receipt />,
      active: activeLink === 3,
    },
    {
      name: "Transaction History",
      path: "/Dashboard/Edit-Profile",
      icon: <FileClock />,
      active: activeLink === 4,
    },
    {
      name: "Edit Profile",
      path: "/Dashboard/Edit-Profile",
      icon: <CircleUser />,
      active: activeLink === 4,
    },
  ];

  useEffect(() => {
    // Update active link based on the current path
    const currentPath = location.pathname;
    const activeLinkIndex = Links.findIndex(link => link.path === currentPath);
    if (activeLinkIndex !== -1) {
      setActiveLink(activeLinkIndex);
    }
  }, [location]);

  return (
    <>
    
      <div className="layout">
        <Nav plan={username} />

        <div className="mainConFlex">
          <div className="sideWrapper">
            <Sidebar links={Links} onLinkClick={handleLinkClick} />
          </div>
          <div className="contentWrapper">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;