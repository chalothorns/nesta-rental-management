// client/src/components/Meter/MeterRecord.jsx

import React, { useState } from 'react';

const MeterRecord = ({record, activeTab, onRecordChange, onDelete}) => {

    const [showConfirm, setShowConfirm] = useState(false);
    
    const prevField = activeTab === 'electric' ? 'prevElectric' : 'prevWater';
    const currentField = activeTab === 'electric' ? 'currentElectric' : 'currentWater';
    
    // ดึงค่ามิเตอร์มาแปลงเป็นตัวเลข (ถ้าไม่มีค่า ให้เป็น 0)
    const prevValue = Number(record[prevField]) || 0;
    const currentValue = Number(record[currentField]) || 0;

    // คำนวณหน่วยที่ใช้ (ถ้าค่าปัจจุบันน้อยกว่าครั้งก่อน หรือยังไม่ได้กรอก ให้เป็น '-')
    const usage = currentValue > prevValue ? currentValue - prevValue : '-';

// 🟢 2. ตรวจสอบเงื่อนไขการลบ: ถ้า currentValue มากกว่า 0
    const hasData = currentValue > 0;

    // 🟢 3. Handler หลักเมื่อกดปุ่ม 'X'
    const handleDeleteClick = () => {
        if (hasData) {
            // ถ้ามีข้อมูล: แสดง Pop-up ยืนยัน
            setShowConfirm(true);
        } else {
            // ไม่มีข้อมูล: ลบทันที
            onDelete(record.id);
        }
    };
    
    // 🟢 4. Handler เมื่อผู้ใช้ยืนยันการลบใน Pop-up
    const handleConfirmDelete = () => {
        onDelete(record.id);
        setShowConfirm(false);
    };

 return (
        <tr className="border-b hover:bg-gray-50">
            {/* 1. ห้อง */}
            <td className="p-3 text-sm font-semibold">{record.room}</td>
            
            {/* 2. ผู้เช่า */}
            <td className="p-3 text-sm text-gray-700">{record.name}</td>
            
            {/* 3. ครั้งก่อน (Read-Only) */}
            <td className="p-3">
                <input
                    type="number"
                    value={record[prevField]} 
                    readOnly 
                    className="w-20 px-2 py-1 text-sm text-center bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none"
                />
            </td>
            
            {/* 4. ครั้งนี้ (Input ที่แก้ไขได้) */}
            <td className="p-3">
                <input
                    type="number"
                    value={record[currentField]}
                    onChange={(e) => onRecordChange(record.id, currentField, e.target.value)}
                    placeholder="กรอกเลข"
                    className="w-20 px-2 py-1 text-sm text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </td>
            
            {/* 5. หน่วยใช้ (Usage) */}
            <td className="p-3 text-sm font-bold text-center text-blue-600">{usage}</td>
            
            {/* 6. ปุ่มลบ (ถ้ามี) */}
            <td className="p-3 text-sm text-center relative">
                <button
                onClick={handleDeleteClick}
                className="text-red-500 hover:text-red-700 transition font-bold">X</button>

                {/* 🟢 5. Confirmation Pop-up (แสดงเมื่อ showConfirm เป็น true) */}
                {showConfirm && (
                    <div className="absolute top-0 right-0 z-10 p-2 text-xs bg-white border border-yellow-400 rounded-lg shadow-xl -mt-10 w-48 text-left">
                        <p className="mb-1 font-semibold text-gray-700">ต้องการลบแถวนี้หรือไม่?</p>
                        <p className="text-yellow-700 mb-2">มีข้อมูลมิเตอร์ปัจจุบันอยู่</p>
                        
                        <div className="flex justify-end space-x-2">
                            {/* ปุ่มยกเลิก */}
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition"
                            >
                                ยกเลิก
                            </button>
                            {/* ปุ่มยืนยัน */}
                            <button
                                onClick={handleConfirmDelete}
                                className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600 transition"
                            >
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default MeterRecord;