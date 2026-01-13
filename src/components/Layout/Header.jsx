// client/src/components/Layout/Header.jsx

import React from 'react';

const Header = () => {
    return (
        // fixed top-0 w-full z-10 ส่วนนี้เป็นส่วนกรอบด้านบนกล่องใหญ่ กล่องเล็กลงมาเอาไว้กำหนด
        //lg:left-64 คือข้อความจะถูกเขยิบไปทางซ้าย 64px และ ขนาดจอ lg ขึ้นไป lg:w-[calc(100%-16rem)] ความกว้างของจอทั้งหมด 100%จะถูกลบด้วย 16rem หรือ w-64 เพื่อให้ข้อความ ระบบจัดการห้องเช่า ไม่ถูก sidebar ทับจนมองไม่เห็น
        <header className="fixed top-0 left-0 w-full h-16 bg-white border-b shadow-md z-10 lg:left-64 lg:w-[calc(100%-16rem)]">
             <div className="flex items-center h-full px-4 lg:px-6">


                {/* 2. ชื่อระบบ (Title) */}
                <div className="text-xl font-bold text-gray-800 hidden md:block">
                    ระบบจัดการห้องเช่า
                </div>
                
                <div className="text-2xl font-bold text-gray-800 md:hidden">
                    NESTA 🏡
                    
                </div>
            </div>
            
        </header>
    );
};

export default Header;

