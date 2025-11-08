// client/src/pages/DashboardPage.jsx

import React from 'react';
import StatCard from '../components/Dashboard/StatCard'; 
import UpcomingBillsTable from '../components/Dashboard/UpcomingBillsTable'; // ตารางบิล

function DashboardPage() {
    // ข้อมูล Stat Cards (ตัวอย่าง)
    const stats = [
        { type: 'overdue', title: 'ค้างชำระ', count: 2, description: 'ผู้เช่าที่ค้างชำระค่าเช่า', buttonText: 'ดูรายละเอียด' },
        { type: 'paid', title: 'ชำระแล้ว', count: 6, description: 'ผู้เช่าที่ชำระเงินแล้ว', buttonText: 'ดูรายชื่อผู้เช่า' },
        { type: 'total', title: 'จำนวนห้องทั้งหมด', count: 8, description: 'ห้องเช่าที่ใช้งานอยู่' }
    ];

    return (
        <div className="flex-1  p-4 lg:p-8  text-gray-800 "> 
            
            {/* ✅ 1. WRAPPER สำหรับ Title และ Subtitle */}
            <div className="mb-6 ">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">แดชบอร์ด</h1>
                <p className="text-gray-500 mt-1 ">ภาพรวมของห้องเช่าทั้งหมด</p>
            </div>
            {/* ✅ 1. ปิด div ของ Title/Subtitle */}
            
            
            {/* 2. CONTAINER สำหรับ STAT CARDS (Grid 2 คอลัมน์) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ">
                
                {/* 1. ค้างชำระ */}
                <StatCard {...stats[0]} /> 

                {/* 2. ชำระแล้ว */}
                <StatCard {...stats[1]} /> 

            </div>
            
            {/* 2.1 CONTAINER สำหรับ STAT CARDS total 1 คอลัมเต็ม */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
                
                <StatCard 
                    {...stats[2]} 
                />
            </div>



            {/* 3. CONTAINER สำหรับตารางบิล: ใช้ 2 คอลัมน์เต็ม */}
            <div className="grid grid-cols-1 md:gap-6 ">
                
                    {/* UpcomingBillsTable Component ควรมี Card/Container ห่อหุ้มในตัวมันเอง */}
                    <UpcomingBillsTable /> 
            </div>
        </div>
    );
}

export default DashboardPage;