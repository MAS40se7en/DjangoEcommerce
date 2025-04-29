'use client'

import Products from "@/components/Products";
import apiService from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {

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
