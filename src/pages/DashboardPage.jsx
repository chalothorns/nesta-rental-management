// client/src/pages/DashboardPage.jsx

import React from 'react';
import StatCard from '../components/Dashboard/StatCard'; 
import UpcomingBillsTable from '../components/Dashboard/UpcomingBillsTable'; // ตารางบิล
import { useOutletContext } from 'react-router-dom';

function DashboardPage() {

    const {adminUser,authLoading} = useOutletContext();
    // ข้อมูล Stat Cards (ตัวอย่าง) เพื่อจะส่งเข้าไปให้ component statcard+upcomingbill
    const stats = [
        { type: 'overdue', title: 'ค้างชำระ', count: 2, description: 'ผู้เช่าที่ค้างชำระค่าเช่า', buttonText: 'ดูรายละเอียด' },
        { type: 'paid', title: 'ชำระแล้ว', count: 6, description: 'ผู้เช่าที่ชำระเงินแล้ว', buttonText: 'ดูรายชื่อผู้เช่า' },
        { type: 'total', title: 'จำนวนห้องทั้งหมด', count: 8, description: 'ห้องเช่าที่ใช้งานอยู่' }
    ];

    if (authLoading) {
    return <div className="p-10 text-center">กำลังตรวจสอบสิทธิ์...</div>;
  }

  // 2. เช็คว่าถ้าโหลดเสร็จแล้ว แต่ไม่มีข้อมูลผู้ใช้ (ไม่ได้ Login)
  if (!adminUser) {
    return <div className="p-10 text-center md:text-start text-red-500">สิทธิ์การเข้าถึงถูกปฏิเสธ กรุณาล็อกอิน</div>;
  }

    return (
        <div className="flex-1  p-4 md:p-8  text-gray-800 min-h-screen lg:max-w-5xl 2xl:max-w-7xl"> 
            
            {/* 1.Title และ Subtitle */}
            <div className="mb-6 ">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">แดชบอร์ด</h1>
                <p className="text-gray-500 mt-1 ">ภาพรวมของห้องเช่าทั้งหมด</p>
            </div>
            
            
            {/* 2. CONTAINER สำหรับ STAT CARDS (Grid 2 คอลัมน์) <statcard /> เป็นการส่งข้อมูลให้ stat index 0 กับ 1 ให้ statcard อีกทั้งยังใช้ {} เพื่อบอกว่าของข้างในคือ JS เราใช้ spread เพื่อunfold ของในกล่อง stat ทำให้ไม่ต้องเขียน title={...} count={...} ยาว ๆ กรณีที่มี object เยอะๆจะสะดวกมาก แต่**ห้ามใช้** props ชื่อเดียวกัน เพราะตัวล่าสุดจะทับตัวเก่า และสุดท้าย dash เตรียมข้อมูล JS และส่ง props ลงไป และให้ statcard รับ prop เพื่อ return ค่า ui ของตัวเองอีกที */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ">
                
                {/* ส่ง index 0 ค้างชำระไป */}
                <StatCard {...stats[0]} /> 

                {/* ส่ง index 1 ชำระแล้ว */}
                <StatCard {...stats[1]} /> 

            </div>
            
            {/* เรียก index 2 ใส่กล่องที่3 หรือ จำนวนห้องทั้งหมด */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
                
                <StatCard 
                    {...stats[2]} 
                />
            </div>



            {/* ถึงจะไม่ได้ส่ง prop/children ไปให้ แต่ dashboard ก็ยังต้องเป็นตัวกำหนดว่า upcomingbillstable จะอยู่ตรงไหนของเว็บ */}
            <div className="grid grid-cols-1 md:gap-6 ">

                    <UpcomingBillsTable /> 
            </div>
        </div>
    );
}

export default DashboardPage;