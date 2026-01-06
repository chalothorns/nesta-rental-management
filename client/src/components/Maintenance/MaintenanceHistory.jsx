// src/components/Message/MaintenanceHistory.jsx

import React, {  useState, useRef, useEffect } from 'react';
import { FaClock } from 'react-icons/fa'; // ไอคอนนาฬิกาสำหรับประวัติ

const StatusDropdownCustom = ({ issue, onStatusChange}) => {
    
    
    const statusOptions =[
        {text: 'รอดำเนินการ', value: 'pending'},
        {text: 'กำลังดำเนินการ', value:'in_progress'},
        {text: 'เสร็จสิ้น', value:'completed'},
        {text:'ยกเลิก', value:'cancelled'}

    ];

    
//  prop ที่ต้องกาต issue เพื่อเข้าถึง id และสถานะเดิม, onstatuschange ฟังชันอัปเดตสถานะ

   //isOpen	ควบคุมว่า Dropdown เปิด หรือ ปิด อยู่
    const [isOpen, setIsOpen] = useState(false);
    //stagedStatus	สถานะใหม่ที่ ถูกเลือกแล้ว แต่ ยังไม่บันทึก
    const [stagedStatus, setStagedStatus] = useState(issue.status);

    const dropdownRef = useRef(null); //เอาไว้กันไม่ให้ของออกไปนอกพื้นหลัง

    const getStatusText = (value) => {
        const option = statusOptions.find(opt => opt.value === value);
        return option ? option.text : 'ไม่ระบุสถานะ';
    };


    const handleItemClick = (newStatusValue) => {
        setStagedStatus(newStatusValue); //จำค่าใหม่ไว้
        setIsOpen(false); //ปิดเมนู

    };

    //สำคัญ** เอาไว้กดเปลี่ยนสถานะ จากค่าที่พักไว้เป็นค่าที่ต้องการบันทึก พอเลือกปุ๊บ dropdown ก็จะบันทึกค่าและปิด dropdown
    const handleDisplayClick =()=>{
        if(!isOpen && stagedStatus !== issue.status){
            //บันทึก/อัปเดตสถานะจริง! (เรียก Prop function)
            onStatusChange(issue.id, stagedStatus)
        }
        setIsOpen(!isOpen); // สลับเปิด/ปิด
        };


        // 3. 🟢 Hook สำหรับจัดการการคลิกนอกพื้นที่ (เพื่อปิด Dropdown)
    // จำเป็นต้องมี useEffect เข้ามา
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 💡 กำหนด URL รูปภาพ: ใช้ issue.imageUrl หรือ placeholder
const imageUrl =
  issue.imageUrl instanceof File
    ? URL.createObjectURL(issue.imageUrl)
    : issue.imageUrl;



<StatusDropdownCustom 
  key={issue.id} 
  issue={issue}
  onStatusChange={onStatusChange}
/>


     return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 transition duration-300 hover:shadow-xl">
            

            {/* 💡 ส่วนรูปภาพ  */}
            {/* ใส่ overflow-hidden เพื่อบอกว่า เนื้อหาที่เกินขอบเขตของ Element นี้ จะต้องถูกซ่อน */}
            <div className="h-56 bg-gray-200  mb-3 overflow-hidden">
                {imageUrl ? (
                <img 
                    src={imageUrl}
                    alt={issue.title}
                    className="w-full h-full object-cover" 
                />
                ) : (
                    <div className="w-full h-full flex justify-center items-center text-gray-400">
      ไม่มีรูปภาพ
    </div>
  )}

            </div>
            
            
            <div className="p-4">
            

                {/* 2. หัวข้อและการจัดการสถานะ // min-w-0 ใช้เพื่อให้มันยอมบีบความกว้างลงและไม่ให้มันดัน element ข้างๆ truncate เอาไว้ใช้เมื่อ element แม่มีความกว้างจำกัด*/}
                <div className="flex justify-between items-start mb-2 ">

                    <h3 className="text-lg font-semibold mb-1 min-w-0 truncate">{issue.title}</h3>
                

                <div className="relative inline-block  " ref={dropdownRef}>
                
                  {/* สถานะและ Dropdown  */}
                <button className={`text-lg font-semibold  ${getStatusClasses(stagedStatus)}`}
                onClick={handleDisplayClick}>
                    {getStatusText(stagedStatus)} {stagedStatus !== issue.status}
                </button>
                


                {isOpen &&(
                    <ul className="absolute z-10 bg-white border border-gray-300 rounded-xl shadow-lg mt-1 w-full min-w-[100px] md:min-w-[150px] right-0"> 
                        {statusOptions.map(option => (
                            //mx = margin x แนวนอน เปนการลบค่าขอบนอกในแนวนอน
                            <li 
                            key={option.value}
                            className="text-gray-600  cursor-pointer p-2 md:p-3 hover:bg-[#e1fcea] hover:rounded-xl my-1 mx-1" 
                            onClick={() => handleItemClick(option.value)}>
                                {option.text}
                            </li>
                        ))}
                    </ul>
                )}
                </div>
            </div>

            {/* รายละเอียด */}
            <p className="text-base text-gray-600">{issue.room}</p>
            <p className="text-base text-gray-500 mt-3 mb-2 line-clamp-3 block">{issue.description}</p>
            

            
            {/* วันที่แจ้ง */}
           
            <p className="text-sm text-gray-400 mt-2 ">แจ้งเมื่อ: {issue.date}</p>
          </div>
        </div>
    );
};

const getStatusClasses = (statusValue) => {
    switch (statusValue) {
        case 'completed':
            return 'bg-[#9FDFBA] text-[#293545] hover:bg-[#ace6c4]';
        case 'in_progress':
            return 'bg-[#F5DA89] text-[#293545] hover:bg-[#f7de96]';
        case 'pending':
            return 'bg-blue-300 text-[#293545] hover:bg-blue-200';
        case 'cancelled':
            return 'bg-[#E8867D] text-[#FFFFFF] hover:bg-[#e79088]';
        default:
            return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
};


const MaintenanceHistory = ({ issues, onStatusChange }) => {
    return (
        <div className="mt-8">

            {/* หัวข้อ ประวัติการแจ้งซ่อม */}
            <div className="flex items-center mt-10 text-lg font-semibold text-gray-800 mb-4">
                <FaClock className="w-5 h-5 mr-2" />
                ประวัติการแจ้งซ่อม
            </div>
            
            {/* 💡 Grid Layout สำหรับการ์ด: 3 คอลัมน์ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {issues.length > 0 ? (
                    issues.map((issue) => (
                        <StatusDropdownCustom key={issue.id} 
                        issue={issue}
                        onStatusChange={onStatusChange}
                         />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">ยังไม่มีประวัติการแจ้งซ่อม
                    <FaClock className="w-6 h-6 inline mr-2 ml-2" />
                    </p>
                )}
            </div>
        </div>
    );
};

export default MaintenanceHistory;

// focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2