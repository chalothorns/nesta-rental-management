import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import DashboardPage from './pages/DashboardPage';
import Sidebar from './components/Layout/Sidebar';
import MobileNavBar from './components/Layout/MobileNavBar';
import FinancePage from './pages/FinancePage';
import MessagePage from './pages/MessagePage';
import MaintenancePage from './pages/MaintenancePage';
import MeterPage from './pages/MeterPage';


function App() {
  return (
    <BrowserRouter>
    {/*// Component หลักที่จะประกอบ  Sidebar และ Main Content*/}
    <div className="min-h-screen  bg-white">
       
          {/* 1. HEADER (Fixed) */}
      <Header />

          {/* 2.1 Sidebar (จะถูกสร้างในขั้นตอนถัดไป) */}
          {/* ในตอนนี้เราจะสร้าง div เปล่าๆ เพื่อกันพื้นที่ไว้ก่อน และซ่อนใน Mobile */}
          <aside className="hidden lg:block w-64 bg-white border-r shadow-xl flex-shrink-0 fixed top-0 h-screen z-10">
          <Sidebar />
          {/* Sidebar Component จะอยู่ที่นี่ */}
          </aside>



          {/* 3. Main Content (DashboardPage) */}
                <main className="flex-1 lg:ml-64 w-full">
                  <div className="pt-16">
                    {/* **ใช้ Routes และ Route เพื่อกำหนดการเปลี่ยนหน้า** */}
            <Routes>
              <Route path="/" element={<DashboardPage />} />

              <Route path="/meters" element={<MeterPage />} />
              <Route path="/maintenance" element={<MaintenancePage />} />
              <Route path="/messages" element={<MessagePage />} />
              <Route path="/finance" element={<FinancePage />} />
            </Routes>
              </div>
            </main>

          {/* 4. Mobile Bottom Nav (จะถูกสร้างในขั้นตอนถัดไป) */}
          {/* วางไว้ใน div นอกสุดเพื่อจัดการตำแหน่ง Fixed */}
          <MobileNavBar />
          </div>
    </BrowserRouter>


  );
}

export default App;
