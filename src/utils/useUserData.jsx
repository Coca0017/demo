/*{import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "./authContex"; 
import { doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase/config";

const useUserData = () => {
  const { user } = useContext(Context);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const userRef = doc(db, "Users", user.uid);

        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
         // console.log("User data:", docSnap.data());
          setUserData(docSnap.data());
        } else {
          // Redirect to login if document doesn't exist
          console.log("No such document!");
          
          return <Navigate to="/login" replace />;
        }
      };

      fetchData();
    }
  }, [user]);

  return userData;
};

export default useUserData;
} */