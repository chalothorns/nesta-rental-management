import React from 'react';
import Header from './components/Layout/Header';
import DashboardPage from './pages/DashboardPage';
import Sidebar from './components/Layout/Sidebar';

function App() {
  return (
    // Component หลักที่จะประกอบ  Sidebar และ Main Content
    <div className="min-h-screen bg-gray-50">
       
          {/* 1. HEADER (Fixed) */}
      <Header />

          {/* 2.1 Sidebar (จะถูกสร้างในขั้นตอนถัดไป) */}
          {/* ในตอนนี้เราจะสร้าง div เปล่าๆ เพื่อกันพื้นที่ไว้ก่อน และซ่อนใน Mobile */}
          <aside className="hidden lg:block w-64 bg-white border-r shadow-xl flex-shrink-0 fixed top-0 h-screen z-10]">
          <Sidebar />
          {/* Sidebar Component จะอยู่ที่นี่ */}
          </aside>



          {/* 3. Main Content (DashboardPage) */}
                <main className="flex-1 lg:ml-64 w-full">
                  <div className="pt-16">
                <DashboardPage />
                </div>
          </main>
          {/* 4. Mobile Bottom Nav (จะถูกสร้างในขั้นตอนถัดไป) */}
          {/* วางไว้ใน div นอกสุดเพื่อจัดการตำแหน่ง Fixed */}
          </div>
   


  );
}

export default App;
