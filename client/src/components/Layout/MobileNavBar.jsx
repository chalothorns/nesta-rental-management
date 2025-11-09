// client/src/components/Layout/MobileNavBar.jsx

import React from 'react';
// 🏡 นำเข้า Icon ที่คุณใช้ใน MobileNavBar
import { Home, Users, Gauge, Wrench, Send, TrendingUp } from 'lucide-react'; 
import { Link, useLocation } from 'react-router-dom'; //ใช้เปลี่ยนตำแหน่ง path ใน navbar

const navItems = [
        { name: 'แดชบอร์ด', icon: Home, link: '/'},
        { name: 'ผู้เช่า', icon: Users, link: '/tenants'},
        { name: 'มิเตอร์', icon: Gauge, link: '/meters'},
        { name: 'แจ้งซ่อม', icon: Wrench, link: '/repairs'},
        { name: 'ข้อความ', icon: Send, link: '/messages'},
        { name: 'การเงิน', icon: TrendingUp, link: '/finance'},
];

const MobileNavBar = () => {
        // 💡 2. ดึง Path ปัจจุบันออกมาจาก React Router
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        // 💡 Q1: Container นี้ควรใช้ Class อะไรเพื่อให้ 'ติดอยู่ด้านล่างสุด' 
        // และ 'ซ่อนตัว' เมื่ออยู่บนจอขนาดกลางขึ้นไป (md:)?
        <div className="
            fixed bottom-0 left-0 right-0 z-50 
            bg-white border-t 
            md:hidden 
            px-2 py-1
        ">
            
            {/* 💡 Q2: ใช้ Class อะไรเพื่อจัดเรียงเมนูให้กระจายตัวเท่าๆ กันในแนวนอน? */}
            <nav className="flex justify-around items-center h-full">
                {navItems.map((item) => {
                    const isCurrent = currentPath === item.link;
                    return (
                    <Link
                        key={item.name}
                        to={item.link}
                        className={`
                            flex flex-col items-center flex-grow
                            text-xs font-medium 
                            p-1 
                            min-w-0
                            ${isCurrent ? 'rounded-xl border bg-[#54b5db] text-white'
                                : 'text-gray-500 hover:text-blue-600 '}
                        `}
                    >
                        {/* Icon */}
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                        {/* Label */}
                        <span className="mt-1">{item.name}</span>
                    </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default MobileNavBar;