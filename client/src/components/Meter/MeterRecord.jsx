// client/src/components/Meter/MeterRecord.jsx

import React from 'react';

const MeterRecord = ({record, activeTab, onRecordChange, onDeleteCheck, meterData,selectedMonth, prevMonthName}) => {

    const roomData = meterData.find(m => m.id === record.id)
    const currentMonthData = roomData.monthlyRecords?.[selectedMonth] || {};
    const prevMonthData = roomData.monthlyRecords?.[prevMonthName] || {};
    
    
    const currentField = activeTab === 'electric' ? 'currentElectric' : 'currentWater';

    const displayPrevValue = prevMonthData[currentField] || 0;
    const displayValue = currentMonthData[currentField] || "";
   
    
    // ดึงค่ามิเตอร์มาแปลงเป็นตัวเลข (ถ้าไม่มีค่า ให้เป็น 0)
    const prevValue = Number(displayPrevValue) || 0;
    const currentValue = Number(displayValue) || 0;

    // คำนวณหน่วยที่ใช้ (ถ้าค่าปัจจุบันน้อยกว่าครั้งก่อน หรือยังไม่ได้กรอก ให้เป็น '-')
    const usage = currentValue > prevValue ? currentValue - prevValue : '-';

// 🟢 2. ตรวจสอบเงื่อนไขการลบ: ถ้า currentValue มากกว่า 0
    const hasData = currentValue > 0;

    // 🟢 3. Handler หลักเมื่อกดปุ่ม 'X'
    const handleDeleteClick = () => {
        // ส่ง ID ของแถว และสถานะ hasData กลับไปให้ MeterPage จัดการ Modal
        onDeleteCheck(record.id, hasData); 
    };
    

 return (
    
    
        <tr className="border-b hover:bg-gray-50 ">
            {/* 1. ห้อง */}
            <td className=" p-3 text-sm font-semibold">{record.room}</td>
            
            {/* 2. ผู้เช่า */}
            <td className=" p-3 text-base text-gray-700">{record.name}</td>
            
            {/* 3. ครั้งก่อน (Read-Only) */}
            <td className="p-3 w-40">
                <input
                    type="number"
                    value={displayPrevValue}
                    readOnly
                    onChange={() => {}}
                    className="w-32 h-10 px-2 py-1 text-base text-left bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none"
                />
            </td>
            
            {/* 4. ครั้งนี้ (Input ที่แก้ไขได้) */}
            <td className="p-3 text-center">
                <input
                    type="number"
                    value={displayValue}
                    onChange={(e) => onRecordChange(record.id, selectedMonth, currentField, e.target.value)}
                    placeholder="0"
                    className="w-32 h-10 px-2 py-1 text-base text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </td>
            
            {/* 5. หน่วยใช้ (Usage) */}
            <td className="p-3 text-base font-medium text-center text-gray-800">{usage}</td>
            
            {/* 6. ปุ่มลบ  */}
            <td className="p-3 text-sm text-center relative">
                <button
                onClick={handleDeleteClick}
                className="text-gray-700 rounded-xl hover:text-[#fa8585] transition font-bold bg-white hover:bg-[#fa858544]">X</button>



           

                
            </td>
        </tr>
       
        
    );
};

export default MeterRecord;