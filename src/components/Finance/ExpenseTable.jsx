// client/src/components/Dashboard/ExpenseTable.jsx

import React from 'react';

// Mock Data: ข้อมูลจำลองสำหรับแสดงผลตาราง (ต้องมี!)
const mockexTable = [
    { date: '25 ต.ค.', details: 'Room 101 - October Rent', category: 'รายรับ', amount: '8,500' },
    { date: '30 ต.ค.', details: 'House 5 - October Rent', category: 'รายรับ', amount: '15,000' },
    { date: '20 ต.ค.', details: 'AC Repair - Room 203', category: 'รายจ่าย', amount: '-3,500' },
    { date: '1 พ.ย.', details: 'Room 305 - October Rent', category: 'รายรับ', amount: '8,800' },
    { date: '15 พ.ย.', details: 'Plumbing Service', category: 'รายจ่าย', amount: '-2,200' }
];

// 💡 Logic Mapping เพื่อกำหนดสีตาม Amount (รายรับ/รายจ่าย)
const getAmountClasses = (amount) => {
    const num = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
    if (num > 0) {
        return { text: 'text-green-600', sign: '+' }; // รายรับ (สีเขียว)
    } else if (num < 0) {
        return { text: 'text-red-500', sign: '' };  // รายจ่าย (สีแดง)
    }
    return { text: 'text-gray-700', sign: '' }; // อื่นๆ
};

const ExpenseTable = () => {
    return (
        // Container Card: เพิ่ม mb-8 สำหรับระยะห่างด้านล่าง
        <div className="lg:p-6 rounded-xl mt-1 lg:mt-0 bg-white mb-8 ">
            
            {/* Header */}
            <div className="flex items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">รายการล่าสุด</h2>
            </div>
            
            {/* Table: Responsive Container */}
            <div className="overflow-x-auto">
                <table className="w-full  divide-y divide-gray-200">
                    {/* Table Head: กำหนด 4 คอลัมน์ */}
                    <thead>
                        <tr>
                            {/* 1. วันที่ (แคบสุด) */}
                            <th className="w-[10%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">วันที่</th>
                            {/* 2. รายละเอียด (กว้างที่สุด) */}
                            <th className="w-[45%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">รายละเอียด</th>
                            {/* 3. ประเภท (กลาง) */}
                            <th className="w-[20%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ประเภท</th>
                            {/* 4. จำนวนเงิน (ชิดขวา) */}
                            <th className="w-[25%] px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">จำนวนเงิน</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body: ใช้ .map() เพื่อวนลูปแสดงข้อมูล */}
                    <tbody className="bg-white divide-y divide-gray-100">
                        {/* 🟢 แก้ไขตรงนี้: ใช้ mockexTable.map แทน ExpenseTable.map */}
                        {mockexTable.map((expense, index) => {
                            const amountClasses = getAmountClasses(expense.amount);
                            // ใช้ expense.category แทนการคำนวณ isExpense จาก amount เพื่อให้ตรงกับ Mock Data ใหม่
                            const isExpense = expense.category === 'รายจ่าย'; 
                            
                            return (
                                <tr key={index} className="hover:bg-gray-50">
                                    
                                    {/* 1. Date (วันที่) */}
                                    <td className="px-4 py-3 text-sm text-gray-500">{expense.date}</td>
                                    
                                    {/* 2. Details (รายละเอียด) */}
                                    <td className="px-4 py-3 text-sm text-gray-800">
                                        <div className="font-medium">{expense.details}</div>
                                    </td>
                                    
                                    {/* 3. Category (ประเภท - Badge) */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className={`
                                            px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${isExpense ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}
                                        `}>
                                            {expense.category}
                                        </span>
                                    </td>
                                    
                                    {/* 4. Amount (จำนวนเงิน) */}
                                    <td className={`px-4 py-3 text-right whitespace-nowrap font-semibold ${amountClasses.text}`}>
                                        {amountClasses.sign}฿{Math.abs(parseFloat(expense.amount.replace(/[^0-9.-]+/g, ""))).toLocaleString()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseTable;