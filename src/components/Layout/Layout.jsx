import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import MobileNavBar from "./MobileNavBar.jsx";
import axios from "axios";

export default function Layout() {

  const apiBase = import.meta.env.VITE_API_URL;

  const [adminUser, setadminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);

      try {
        const response = await axios.get(`${apiBase}/admin/auth/cookie/me`, {
          withCredentials: true,
        });

        setadminUser(response.data.user);

      } catch (error) {
        console.log(error);
        setadminUser(null);
      } finally {
        setAuthLoading(false);
      }
     };

     checkAuth();
    },[apiBase]);


  const login = async ({email, password}) => {
    setAuthError(null);
    //ปกติ browser frontend จะไม่รับ cookies ถ้าไม่ได้รับการอนุญาตจากเจ้าของเว็บ ค่า default= false พอ backend ส่ง cookies มา frontend จะโยนทิ้งไม่เอา จึงต้องกำชับว่าให้เป็น true
    try {
      const response = await axios.post(
        `${apiBase}/admin/auth/cookie/login`, 
        {email, password}, 
        {withCredentials: true}
      );

      setadminUser(response.data.user)
      return true;
    } catch (error) {
      const message =
      error.response.data.message ||
      error.response.data.error ||
      error.message;

      setAuthError(message || "Login failed");
      setadminUser(null)
      return null;

    }
  }

  const logout = async () => {
    setAuthError(null)
    try {
      await axios.post(
        `${apiBase}/admin/auth/cookie/logout`,
         {}, 
         {withCredentials: true}
        );
    } catch (error) {
      console.log(error)
    } finally {
      setadminUser(null);
    }
 };

  return (
    <div className="min-h-screen  bg-white">
      {/* 1. HEADER (Fixed) */}
      <Navbar 
      adminUser={adminUser}
      authLoading={authLoading}
      authError={authError}
      login={login}
      logout={logout}
      />

      {/* 2.1 Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r shadow-xl flex-shrink-0 fixed top-0 h-screen z-10">
        <Sidebar />
      </aside>

      {/* 3. Main Content (DashboardPage) */}
      <main className="flex-1 lg:ml-64 w-full">
        <div className="pt-16">
          {/* outlet(ตัวอ่าน context) เป็นจุดวางของ มันจะตรวจว่า user คลิกลิงก์ไหน แล้วจะอัปเดต component ตรงนี้ให้ตรงตาม RouterProvider(ตัวจับข้อมูล)*/}
          <Outlet context={{adminUser,authLoading, apiBase}}/>
        </div>
      </main>

      {/* 4. Mobile Bottom Nav */}
      <MobileNavBar />
    </div>
  );
}
