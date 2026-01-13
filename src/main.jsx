import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import { createRoot } from 'react-dom/client'
import Layout from "./components/Layout/Layout.jsx";
import App from './App.jsx'
import DashboardPage from "./pages/DashboardPage";
import FinancePage from "./pages/FinancePage";
import MessagePage from "./pages/MessagePage";
import MaintenancePage from "./pages/MaintenancePage";
import MeterPage from "./pages/MeterPage";
import TenantsPage from "./pages/TenantsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //มีไว้กรณี user พิมพ์ url ผิดหรือไป router ไหนไม่รู้
    errorElement: (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl">404 - Page Not Found 😭</h1>
      </div>
    ),
    children: [
      {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <DashboardPage /> },
        { path: "tenants", element: <TenantsPage /> },
        { path: "meters", element: <MeterPage /> },
        { path: "maintenance", element: <MaintenancePage /> },
        { path: "messages", element: <MessagePage /> },
        { path: "finance", element: <FinancePage /> },
        ],
      },
    ],
  },
]); //ถูก design มาให้ใช้กับ array

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>);

