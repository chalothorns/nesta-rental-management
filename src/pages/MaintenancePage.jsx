import React, {useState} from 'react';

import ReportIssues from '../components/Maintenance/ReportIssues';
import MaintenanceHistory from '../components/Maintenance/MaintenanceHistory';
import { useOutletContext } from 'react-router-dom';



const MaintenancePage = () => {

    const {adminUser,authLoading} = useOutletContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [maintenanceIssues, setMaintenanceIssues] = useState([
    // ...
    // { id: '1', room: 'Room 101', title: 'Leaking Faucet', status: 'pending', description: '...', date: '...', imageUrl: '' },
    // { id: '2', room: 'Room 203', title: 'AC Not Cooling', status: 'in_progress', description: '...', date: '...', imageUrl: '' }
    // ...
]);

    //function เอาไว้เปิด/ปิด modal
    const handleToggleForm = () => {
        setIsModalOpen(!isModalOpen); //ใช้ !isModalOpen เพื่อสลับค่าจาก true เป็น false หรือ false เป็น true
    };




    //ข้อมูลบน card issue history
    const handleAddNewIssue = (formData) => {
        //1.รวมข้อมูลที่ได้จาก form(dataForm) เข้ากับข้อมูลที่จำเป็นอื่นๆ
        const newIssue ={
            ...formData, // ข้อมูลที่มาจาก ReportIssues.jsx
            id: Date.now().toString(),
            status:'pending',
            date: new Date().toLocaleDateString('th-TH', {day:'2-digit', month:'short', year:'numeric'}),
            imageUrl: formData.imageFile || ""

        };

        setMaintenanceIssues(prevIssues => [newIssue, ...prevIssues]);
        setIsModalOpen(false); // ปิด Modal หลัง Save
    };

    const handleStatusChange = (id, newStatus) => {
        // 🟢 ตรวจสอบว่า id และ newStatus ถูกส่งมาถูกต้อง
        console.log(`Updating ID: ${id} to Status: ${newStatus}`); 
        
        setMaintenanceIssues(prevIssues => 
            prevIssues.map(issue => {
                // 1. ตรวจสอบว่า ID ตรงกันหรือไม่
                if (String(issue.id) === String(id)) {
                    // 2. ถ้าตรงกัน ให้คืนค่า Object ใหม่พร้อมสถานะที่ถูกเปลี่ยน
                    return { ...issue, status: newStatus };
                }
                // 3. ถ้าไม่ตรงกัน ให้คืนค่า Object เดิม
                return issue;
            })
        );
    };

    if (authLoading) {
    return <div className="p-10 text-center">กำลังตรวจสอบสิทธิ์...</div>;
  }

  // 2. เช็คว่าถ้าโหลดเสร็จแล้ว แต่ไม่มีข้อมูลผู้ใช้ (ไม่ได้ Login)
  if (!adminUser) {
    return <div className="p-10 text-center md:text-start text-red-500">สิทธิ์การเข้าถึงถูกปฏิเสธ กรุณาล็อกอิน</div>;
  }


    return (
        /*max-w-7xl เพื่อจำกัดความกว้างของจอ และง่ายต่อการจัดวางองค์ประกอบข้างใน*/ 
        <div className="flex flex-col  p-4 md:p-8 min-h-screen lg:max-w-5xl 2xl:max-w-7xl mb-20 md:mb-10"> 

            {/* Header Area */}
            <div className="flex justify-between items-center w-full">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 ">แจ้งซ่อม</h1>
                    <p className= "text-gray-500 mt-3 ">แจ้งและติดตามปัญหาการซ่อมแซม</p>
                </div>

            {/* 1. ปุ่มแจ้งปัญหา: ใช้ฟังก์ชันเปิด Modal */}
            <button
                onClick={handleToggleForm} //เรียกเปิด Modal
                className="flex items-center bg-custom-blue hover:bg-[#62bee2f3] text-white md:text-lg font-meduim md:py-4 md:px-14 rounded-xl shadow-md transition duration-150"
            >
                {/* ... icon และ text ... */}
                + แจ้งปัญหา
            </button>
        </div>

            {/* 2. Modal/Form (ซ่อนไว้ หรือแสดงอยู่บนสุด) */}
            <ReportIssues
                isOpen={isModalOpen}
                onClose={handleToggleForm}
                onSave={handleAddNewIssue}
                

            />
                
            
            {/* 3.ประวัติการแจ้งซ่อม */}
                <MaintenanceHistory
                         issues={maintenanceIssues} 
                onStatusChange={handleStatusChange}
                
                />
            
                
        </div>
       
    );
};

export default MaintenancePage;
