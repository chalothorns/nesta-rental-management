// client/src/components/Dashboard/UpcomingBillsTable.jsx

import React from 'react';
import { Calendar } from 'lucide-react'; 

// Mock Data: ข้อมูลจำลองสำหรับแสดงผลตาราง
const mockBills = [
    { tenant: 'Room 101 - John Smith', property: 'Building A', amount: '8,500', note: 'Rent', date: 'ต.ค. 25' },
    { tenant: 'Room 203 - Sarah Johnson', property: 'Building A', amount: '9,200', note: 'Rent + Utils', date: 'ต.ค. 28' },
    { tenant: 'House 5 - Mike Davis', property: 'Villa Complex', amount: '15,000', note: 'Rent', date: 'ต.ค. 30' },
    { tenant: 'Room 305 - Lisa Wong', property: 'Building B', amount: '8,800', note: 'Rent + Utils', date: 'พ.ย. 1' },
];

const UpcomingBillsTable = () => {
    return (
        // Container Card: พื้นหลังสีขาว, Shadow, และ Padding
        <div className="p-6 shadow-lg rounded-2xl mt-5 bg-grey-400 border border-gray-300 mb-16 md:mb-6">
            
            {/* Header */}
            <div className="flex items-center mb-6 ">
                <Calendar className="w-6 h-6 text-[#53b8e0] mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">บิลที่กำลังจะถึงกำหนด</h2>
            </div>
            
            {/* Table: Responsive Container */}
            <div className="overflow-x-auto 
            ">
                <table className="w-full divide-y divide-gray-200">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th className=" px-4 py-3 text-left text-sm font-semi-bold  text-black-500 uppercase tracking-wider">ผู้เช่า</th>
                            <th className="px-4 py-3 text-left text-sm font-semi-blod text-black-500 uppercase tracking-wider hidden sm:table-cell ">ห้อง</th>
                            <th className="
                            px-4 py-3 text-right text-sm font-semi-blod text-black-500 uppercase tracking-wider">จำนวนเงิน</th>
                            <th className="
                            px-4 py-3 text-center text-sm font-semi-blod text-black-500 uppercase tracking-wider">กำหนดชำระ</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body: ใช้ .map() เพื่อวนลูปแสดงข้อมูล */}
                    <tbody className="bg-white divide-y divide-gray-100">
                        {mockBills.map((bill, index) => (
                            <tr key={index} className="hover:bg-[#e1fcea]">
                                
                                {/* Tenant (ผู้เช่า) */}
                                <td className="px-4 py-4 ">
                                    <div className="text-base font-medium text-gray-900">{bill.tenant}</div>
                                    <div className="text-sm text-gray-500 sm:hidden">{bill.property}</div>
                                </td>
                                
                                {/* Property (ห้อง) */}
                                <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                                    <div className="text-base text-gray-500">{bill.property}</div>
                                </td>
                                
                                {/* Amount (จำนวนเงิน) */}
                                <td className="px-4 py-4 whitespace-nowrap text-right">
                                    <div className="text-md  font-semibold text-gray-800">฿{bill.amount}</div>
                                    <div className="text-sm   text-gray-400">{bill.note}</div>
                                </td>
                                
                                {/* Due Date (กำหนดชำระ) */}
                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                    <span className="inline-flex items-center px-3 py-1 text-sm  font-semibold text-gray-700 rounded-3xl border border-gray-300">
                                        {bill.date}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UpcomingBillsTable;