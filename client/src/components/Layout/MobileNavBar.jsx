// client/src/components/Layout/MobileNavBar.jsx

import React from 'react';
// 🏡 นำเข้า Icon ที่คุณใช้ใน MobileNavBar
import { Home, Users, Gauge, Wrench, Send, TrendingUp } from 'lucide-react'; 
import { Link, useLocation } from 'react-router-dom'; //ใช้เปลี่ยนตำแหน่ง path ใน navbar

const navItems = [
        { name: 'แดชบอร์ด', icon: Home, link: '/'},
        { name: 'ผู้เช่า', icon: Users, link: '/tenants'},
        { name: 'มิเตอร์', icon: Gauge, link: '/meters'},
        { name: 'แจ้งซ่อม', icon: Wrench, link: '/maintenance'},
        { name: 'ข้อความ', icon: Send, link: '/messages'},
        { name: 'การเงิน', icon: TrendingUp, link: '/finance'},
];

const MobileNavBar = () => {
        // 💡 2. ดึง Path ปัจจุบันออกมาจาก React Router
    const location = useLocation(); //useLocation เปน hook ตัวหนึ่ง หน้าที่ของมันคือคืนค่าเกี่ยวกับตำแหน่งให้ออกมาเป็น object เช่น pathname,search,key ต่างๆ
    const currentPath = location.pathname; //location.pathname เป็นการเข้าถึง object ด้วย key(pathname= /meters ต่างๆ)
    return (
        // ใช้ fixed เพื่อให้ nav ติดอยู่ด้านล่าง มีขีดบนคั่นและไม่โชว์บนหน้าจอ md ขึ้นไป
        <div className="
            fixed bottom-0 left-0 right-0 z-50 
            bg-white border-t 
            md:hidden 
            px-2 py-1
        ">
            
            
            {/* tag nav ทำหน้าที่เหมือน div แต่อีกนัยนึงมันเป็นส่วนที่บอกเบราเซอร์ว่า กล่องนี้มีลิงก์สำคัญที่ใช้ในการนำทางไปยังส่วนอื่น ๆ ของเว็บไซต์นะ
            การใช้ .map เป็นการเอาของใน array ด้านบนซึ่งของจะออกมา 6 อันเหมือนเดิม ที่เปลี่ยนคือ อยู่ที่เรากำหนดว่าจะให้เข้าถึง key อะไร จะใช้ filter ก่อนก็ได้ถ้าไม่อยากได้ 6 ตัวแล้วค่อย map */}
            <nav className="flex justify-around items-center h-full">
                {navItems.map((item) => {
                    const isCurrent = currentPath === item.link;
                    return (
                    <Link
                        key={item.name}
                        to={item.link} //มันคือ <Link to="/"> Component นี้จะสั่งให้ React Router เปลี่ยนเส้นทาง (Route) ไปยัง URL /
                        //flex-grow เอาไว้ขยายพื้นหลังของปุ่มบน nav ให้มันใหญ่เต็มพื้นที่เพื่อความสวยงาม
                        className={`
                            flex flex-col items-center flex-grow 
                            text-xs font-medium 
                            p-1 
                            min-w-0
                            ${isCurrent ? 'rounded-xl bg-custom-blue text-white'
                                : 'text-gray-500 hover:bg-[#e1fcea] hover:text-gray-700 hover:rounded-lg'}
                        `}
                    >
                        {/* Icon */}
                        
                        <item.icon className="h-5 w-5" />
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