// client/src/components/Meter/MonthDropdown.jsx

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react'; // ใช้ไอคอนลูกศร

// Array ของเดือน
const MONTHS =[
    'มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
    'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'
];

const MonthDropdown =({selectedMonth, onMonthChange}) =>{
    //state สำหรับควบคุมการแสดง/ซ่อน Dropdown list
    const [isOpen, setlsOpen] = useState(false);
    //ref สำหรับอ้างอิงถึง dropdown container เพื่อตรวจจับ click outside
    const dropdownRef= useRef(null);

    //logic สำหรับการปิด dropdown เมื่อคลิกนอกพื้นที่
    useEffect(() =>{
        const handleClickOutside = (event) =>{
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setlsOpen(false);
            }
        };
        //ผูก event listener เมื่อ component ถูก mount
        document.addEventListener('mousedowm',handleClickOutside);
        //ล้าง event listener เมื่อ component ถูก unmount
        return() =>{
            document.removeEventListener('mousedown',handleClickOutside);
        };
    },[dropdownRef]);
    
    //handler เมื่อเลือกเดือน
    const handleSelectMonth =(month) =>{
        //1.เรียกใช้ prop handler เพื่ออัปเดต state ใน meterPage
        //ต้องส่ง object {target:{value:month}}เพื่อให้เข้ากับ onMonthChange ที่รับ(e)
        onMonthChange({target:{value:month}});

        //2.ปิด dropdown
        setlsOpen(false);
    };
    return(
        //contrainer หลัก (relative เพื่อให้ list ลอยอยู่ด้านบน)
        <div className="relative inline-block"ref={dropdownRef}>
            {/* ปุ่มหลักที่แสดงเดือนที่ถูกเลือก */}
            <button
                onClick={() =>setlsOpen(!isOpen)}
                className="flex items-center justify-between w-32 px-3 py-2 text-base font-medium rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-custom-blue"
            
            >
                {selectedMonth}<ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180':'rotate-0'}`}/>
            </button>
            {/* Dropdown List(แสดงผลเมื่อ isOpen เป็น true) */}
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-60">
                    {MONTHS.map((month) =>(
                        <li
                        key={month}
                        onClick={() => handleSelectMonth(month)}
                        className={`px-3 py-2 text-base cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition
                                ${selectedMonth === month ? 'bg-blue-100 font-semibold text-blue-800' : 'text-gray-700'} 
                            `}
                            >
                            {month}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );

};
export default MonthDropdown;