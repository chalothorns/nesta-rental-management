// client/src/pages/FinancePage.jsx

import React from 'react';
import FinanceStatCard from '../components/Finance/FinanceStatCard'; 
import RevenueChart from '../components/Finance/RevenueChart'; 
import ExpenseTable from '../components/Finance/ExpenseTable';

function FinancePage () {
    const financeStats = [
        {
            title:'รายได้รวมต่อเดือน',
            value:'฿74,300',
            period:'ตุลาคม 2025',
            type: 'revenue',
            borderColor: 'border-blue-400'
        },
        {
            title:'ค่าใช้จ่ายรวมต่อเดือน',
            value:'฿14,200',
            period:'ตุลาคม 2025',
            type: 'expense'
        },
        {
            title:'กำไรสุทธิ',
            value:'฿60,100',
            period:'ตุลาคม 2025',
            type: 'profit'
        }
    ];
    return (
        <div className="p-6 md:p-8 min-h-screen lg:max-w-5xl 2xl:max-w-7xl justify-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 ">สรุปการเงิน</h1>
            <p className="text-gray-600 mt-3">ติดตามรายรับรายจ่ายของการเช่า</p>
            
            {/* ส่วนที่ 1: Stat Cards สรุปตัวเลขสำคัญ */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3 mt-8 ">
            {financeStats.map((stat) => (
        <FinanceStatCard
            key={stat.title + stat.value} // ใช้ key ที่เหมาะสม
            title={stat.title}
            value={stat.value}
            period={stat.period}
            type={stat.type}
        />
    ))}
            </div>

            {/* ส่วนที่ 2: กราฟ (พื้นที่แสดงผลใหญ่) */}
            <div className=" bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-200 mt-8 ">
                <h2 className="text-2xl font-semibold mb-4">แนวโน้มรายได้รายเดือน</h2>
                {/*  Chart Library (เช่น Chart.js, Recharts) */}
                <RevenueChart />
            </div>
            
            {/* ส่วนที่ 3: ตารางสรุปรายการ (Table) */}
            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 mb-14 md:mb-4">
                {/* 💡 Q3: คุณจะใช้โครงสร้างตารางคล้ายกับ UpcomingBillsTable เพื่อแสดงรายการ รายรับ/รายจ่าย ล่าสุดอย่างไร? */}
                <ExpenseTable />
            </div>
        </div>

    );
};

export default FinancePage;