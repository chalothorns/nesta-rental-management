import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import FinancePage from "./pages/FinancePage";
import MessagePage from "./pages/MessagePage";
import MaintenancePage from "./pages/MaintenancePage";
import MeterPage from "./pages/MeterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    //มีไว้กรณี user พิมพ์ url ผิดหรือไป router ไหนไม่รู้
    errorElement: (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl">404 - Page Not Found 😭</h1>
      </div>
    ),
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "meters", element: <MeterPage /> },
      { path: "maintenance", element: <MaintenancePage /> },
      { path: "messages", element: <MessagePage /> },
      { path: "finance", element: <FinancePage /> },
    ],
  },
]); //ถูก design มาให้ใช้กับ array

export default function App() {
  return (
    <RouterProvider router={router} /> //มักจะมี attribute = key เพื่อบอกว่าจะใส่อะไรเข้าไปใน RouterProvider ไม่ใช่ชื่อไฟล์เป้น Component ที่มาจาก react-router-dom และทำหน้าที่ นำ โครงสร้างตรรกะที่สร้างไว้ไป เปิดใช้งาน ในแอปพลิเคชันจริง
  );
}

