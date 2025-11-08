// client/src/components/Layout/Sidebar.jsx

import React from 'react';
import { Home, Users, Gauge, Wrench, TrendingUp, Send } from 'lucide-react'; 

const Sidebar = () => {
    // กำหนดรายการเมนู
    const navItems = [
        { name: 'แดชบอร์ด', icon: Home, link: '#', current: true },
        { name: 'ผู้เช่า', icon: Users, link: '#', current: false },
        { name: 'มิเตอร์', icon: Gauge, link: '#', current: false },
        { name: 'แจ้งซ่อม', icon: Wrench, link: '#', current: false },
        { name: 'ข้อความ', icon: Send, link: '#', current: false },
        { name: 'การเงิน', icon: TrendingUp, link: '#', current: false },
    ];

    return (
        // ✅ 2. นี่คือ Root Container หลัก (div className="flex flex-col h-full bg-white")
        <div className="flex flex-col h-full bg-white"> 

            {/* ✅ 1. ส่วน Header/Title ของ Sidebar */}
            <div className="h-16 flex items-center lg:px-6 flex-shrink-0 "> 
                {/* ชื่อระบบ */}
                <div className="text-xl font-bold text-gray-800 hidden md:block">
                    My Rental Hub 🏡
                </div>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.link}
                        className={`
                            ${item.current ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}
                            group flex items-center px-3 py-2 text-lg  rounded-lg transition duration-150 ease-in-out 
                        `}
                    >
                        {/* Icon */}
                        <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                        {/* Menu Name */}
                        {item.name}
                    </a>
                ))}
            </nav>
        </div> // ✅ 3. ปิด Root Container ให้ถูกต้อง
    );
};
    
export default Sidebar;