import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNavBar from "./MobileNavBar";

export default function Layout() {
  return (
    <div className="min-h-screen  bg-white">
      {/* 1. HEADER (Fixed) */}
      <Header />

      {/* 2.1 Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r shadow-xl flex-shrink-0 fixed top-0 h-screen z-10">
        <Sidebar />
      </aside>

      {/* 3. Main Content (DashboardPage) */}
      <main className="flex-1 lg:ml-64 w-full">
        <div className="pt-16">
          {/* outlet(ตัวอ่าน context) เป็นจุดวางของ มันจะตรวจว่า user คลิกลิงก์ไหน แล้วจะอัปเดต component ตรงนี้ให้ตรงตาม RouterProvider(ตัวจับข้อมูล)*/}
          <Outlet />
        </div>
      </main>

      {/* 4. Mobile Bottom Nav */}
      <MobileNavBar />
    </div>
  );
}
