'use client';

import apiService from "@/lib/utils";
import { useEffect, useState } from "react";
import Products from "./Products";

const ProfileData = ({}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        apiService.get('/api/user_info/').then((response) => {
          console.log(response)
          setUser(response)
        });
    }, [])
  
    const handleLogout = () => {
      apiService.logout('/api/logout/')
    }
    
    return (
      <div>
        <Products />
        {user ? <h1>{user.username}</h1> : null}
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
}

export default ProfileData