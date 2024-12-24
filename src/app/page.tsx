'use client'

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import LoginPage from "./(user)/login/page";
import { useAuth } from "./(user)/AuthContext";
import AdminDashboard from "./admin/dashboard/page";

const Home = () => {
  const {isAuthenticated} = useAuth()
  // const router = useRouter();

  // useEffect(() => {
  //   // Redirect root route to login page
  //   router.replace("/login");
  // }, [router]);

  // return null;
  if(!isAuthenticated) {
    redirect('/login')
  }
  else {
    redirect('/admin/dashboard')
  }

};


export default Home;
