// client/src/components/Layout/Header.jsx

import React from 'react';
import { PanelLeftClose } from 'lucide-react'; 

const Header = () => {
    return (
        // ✅ สำคัญ: fixed top-0 w-full z-10
        <header className="fixed top-0 left-0 w-full h-16 bg-white border-b shadow-md z-10 lg:left-64 lg:w-[calc(100%-16rem)]">
            <div className="flex items-center h-full px-4 lg:px-6">

               

                {/* 2. ชื่อระบบ (Title) */}
                <div className="text-xl font-bold text-gray-800 hidden md:block">
                    ระบบจัดการห้องเช่า
                </div>
                <div className="text-2xl font-bold text-gray-800 md:hidden">
                    My Rental Hub 🏡
                </div>
            </div>
        </header>
    );
};

export default Header;