// client/src/components/Meter/MeterHeader.jsx

import React from 'react';
import { Gauge } from 'lucide-react';
import MonthDropdown from './MonthDropdown';

// 💡 Component นี้รับค่าที่ต้องการแสดงผล (เช่น เดือน/ปี) เป็น Props
const MeterHeader = ({selectedMonth, selectedYear, onMonthChange, onYearChange}) => {
    return(
        //component หลักที่ประกอบด้วย หัวข้อ และ Dropdown รอบบิล
        <div className="space-y-6">

            {/* 1.หัวข้อหลัก(บันทึกมิเตอร์) */}
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                <Gauge className="w-7 h-7 mr-2" color="#53B8E0"/>
                บันทึกมิเตอร์
            </h3>

            {/* 2.ส่วนรอบบิล(เดือน/ปี) */}
            <div className="p-5 bg-[#F7FBFD]  border border-[#cfe7f1] rounded-xl">
                <h3 className="text-sm font-semibold">รอบบิล(เดือน/ปี)</h3>
                <div className="mt-4 mb-2 flex items-center">
                    {/* Input หรือ Dropdown สำหรับเตือน */}
                    <MonthDropdown 
                        selectedMonth={selectedMonth}
                        onMonthChange={onMonthChange}
                        />

                        {/* Input สำหรับปี */}
                        <input 
                        type="text"
                        name="title"
                        value={selectedYear} //สามารถใช้ state จาก meterpage มาแสดงผล
                        onChange={onYearChange} //ถ้าจะให้แก้ปีได้ ต้องมีฟังก์ชันนี้
                        placeholder="เช่น ปี 2025"
                        className="px-3 py-2 w-32 rounded-xl ml-5 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                        />

                        <span className="ml-5 text-sm text-gray-500 hidden md:block">
                            กำลังบันทึกข้อมูลสำหรับเดือน
                            <span className="font-semibold text-gray-800"> {selectedMonth}{selectedYear}

                            </span>
                        </span>
                </div>
                <div className=" ml-5 text-sm text-gray-500 md:hidden">
                            กำลังบันทึกข้อมูลสำหรับเดือน
                            <span className="font-semibold text-gray-800"> {selectedMonth}{selectedYear}

                            </span>
                        </div>
            </div>
        </div>
    );
};

export default MeterHeader;






