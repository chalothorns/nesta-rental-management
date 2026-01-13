// client/src/components/Layout/Sidebar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom'; //ใช้เปลี่ยนตำแหน่ง path ใน navbar
import { Home, Users, Gauge, Wrench, TrendingUp, Send } from 'lucide-react'; 

const Sidebar = () => {
    // 💡 2. ดึง Path ปัจจุบันออกมาจาก React Router
    const location = useLocation();
    const currentPath = location.pathname;

    // กำหนดรายการเมนู
    const navItems = [
        { name: 'แดชบอร์ด', icon: Home, link: '/'},
        { name: 'ผู้เช่า', icon: Users, link: '/tenants'},
        { name: 'มิเตอร์', icon: Gauge, link: '/meters'},
        { name: 'แจ้งซ่อม', icon: Wrench, link: '/maintenance'},
        { name: 'ข้อความ', icon: Send, link: '/messages'},
        { name: 'การเงิน', icon: TrendingUp, link: '/finance'},
    ];

    
    return (
        // นี่คือ Root Container หลัก กล่องใหญ่ของทั้ง sidebar
        <div className="flex flex-col h-full bg-white"> 

            {/* กำหนดส่วน Header/Title ของ Sidebar ส่วนใหญ่ก็คือชื่อแอปเรา logo ต่างๆ 
            มีการกำหนด flex-shrink-0 ส่วนใหญ่ใช้กับ header/sidebar เพื่อไม่ให้ความกว้างยาว หดตัว แต่ถ้าใส่ 1 แปลว่าให้มันหดยืดได้*/}
            <div className="h-16 flex items-center lg:px-6 flex-shrink-0 "> 
                {/* ชื่อระบบ */}
                <div className="text-xl font-bold text-gray-800 hidden md:block">
                    NESTA 🏡
                </div>
            </div>
            
            {/* Navigation Link
            space-y-1 เป็นการกำหนดความห่างระหว่าง ของในกล่องแนวตั้ง และ overflow-y-auto คือจำกัดขอบเขตแนวตั้ง ให้เนื้อหาไม่ล้นเกินกรอบ  */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {

                    // คำนวณว่าเมนูนี้คือเมนูปัจจุบันหรือไม่
                    const isCurrent = currentPath === item.link;
                    
                    return (
                    <Link
                        key={item.name}
                        to={item.link}
                        className={`
                           ${isCurrent ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}
                            group flex items-center px-3 py-2 text-lg  rounded-lg transition duration-150 ease-in-out 
                        `}
                    >
                        {/* Icon */}
                        <item.icon className="mr-3 h-5 w-5" />
                        {/* Menu Name */}
                        {item.name}
                    </Link>
                    );
                })}
            </nav>
        </div> 
    );
};
    
export default Sidebar;