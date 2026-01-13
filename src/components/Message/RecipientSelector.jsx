//Component สำหรับรายการห้องเช่าทั้งหมดพร้อม Checkbox เพื่อเลือกผู้รับ

import React, { useState } from 'react'; //ถ้าเราต้องการให้ Component "จำ" ค่าบางอย่างที่เปลี่ยนแปลงได้ (เช่น รายการที่ถูกเลือก, ข้อความที่ถูกพิมพ์, หรือสถานะเปิด/ปิดของ Toggle) ต้องใช้ useState
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';

// ข้อมูลผู้รับ (ตัวอย่าง)
const allRecipients = [
    { id: 101, name: 'Mr. Somsak', room: 'Room 101' },
    { id: 102, name: 'Ms. Praew', room: 'Room 102' },
    { id: 103, name: 'Mr. Lek', room: 'Room 103' },
    { id: 201, name: 'Ms. Noi', room: 'Room 201' },
    { id: 202, name: 'Mr. Somchai', room: 'Room 202' },
    { id: 203, name: 'Ms. Mai', room: 'Room 203' },
];

const RecipientSelector = () => {
      // State สำหรับเก็บ ID ของผู้รับที่ถูกเลือก (เริ่มต้นเลือกทั้งหมด)
    const [selectedIds, setSelectedIds] = useState(allRecipients.map(r => r.id));

    // 💡 ฟังก์ชันสำหรับจัดการการคลิก
    const handleToggleRecipient = (recipientId) => {
        //ตรวจสอบว่าไอดีนี้ถูกเลือกไปแล้วหรือยัง
        const isSelected = selectedIds.includes(recipientId);

        if (isSelected) {
            //ถ้าถูกเลือกอยู่แล้ว: ยกเลิกการเลือก (ลบ ID ออกจาก Array)
            setSelectedIds(selectedIds.filter(id => id !== recipientId));
        } else {
            //ถ้ายังไม่ถูกเลือก ก็เพิ่ม ID เข้า array ไป
            setSelectedIds([...selectedIds, recipientId]);

        }
    };

    // 💡 สถานะ 'เลือกทั้งหมด'
    const isAllSelected = selectedIds.length === allRecipients.length;

    const handleSelectAll = () =>{
        if (isAllSelected) {
            setSelectedIds([]); //ถ้าถูกเลือกทั้งหมด ให้ยกเลิกทั้งหมด
        } else {
            setSelectedIds(allRecipients.map(r => r.id)); //ให้เลือกทั้งหมด
        }

    };

    return (

        // Container Card: พื้นหลังสีขาว, Shadow, และ Padding
        //flex justify-between items-center ตรง h3 บรรทัด 31 ช่วยเปลี่ยนให้บรรทัดนั้นเปน flex container และใช้ justify-between เพื่อให้ข้อความ 2 อันผลักออกจากกันไปคนละฝั่ง
        <div className=" p-6  rounded-2xl mt-5 bg-[#adddf51c] border border-[#8ecae74d] mb-16 divide-y divide-gray-200  ">


               {/* ----------------- หัวข้อ ผู้รับ ----------------- */}
                <div className="flex flex-col 
                ">
                    
                    <h3 className="text-lg font-semibold text-gray-800 flex justify-between items-center 
                    ">
                    <span>ผู้รับ</span>
                    <span className="text-custom-blue font-bold text-4xl">{selectedIds.length}</span> {/* 💡 แสดงจำนวนที่ถูกเลือกจริง */}

                    </h3>
                    <p className="text-sm  text-gray-500 mb-4">เลือกผู้เช่าที่จะรับข้อความ</p>
                    
                </div>

           {/* ----------------- ส่วนเลือกทั้งหมด (Option) ----------------- */}

            <div className="overflow-x-auto divide-y divide-gray-200
            ">
                
                   <div className={`flex items-center font-semibold  cursor-pointer transition duration-150 p-3 ${isAllSelected ? 'text-custom-blue' : 'text-gray-600'}`}
                onClick={handleSelectAll}> 
                                
                {/* 💡 เปลี่ยนไอคอนตามสถานะ isAllSelected */}
                {isAllSelected 
                    ? <FaCheckCircle className="w-5 h-5 mr-2" /> 
                    : <FaRegCircle className="w-5 h-5 mr-2" />
                }
                เลือกทั้งหมด
            </div>
                      

                  {/* ----------------- รายการผู้รับ ----------------- */}
                    {/*  Container ที่กำหนด Grid 2 คอลัมน์  */}
                    <div className=" grid grid-cols-2 
                    ">
                        {allRecipients.map((recipient) => {
                    const isRecipientSelected = selectedIds.includes(recipient.id);
                    
                    return (
                        
                            <div key={recipient.id}
                            onClick={() => handleToggleRecipient(recipient.id)}
                            className="flex items-center text-gray-700 cursor-pointer p-2 rounded-lg hover:bg-[#e1fcea] transition duration-75
                            ">
                                
                                {/* 💡 Conditional Rendering: สลับไอคอนตามสถานะ isRecipientSelected */}
                                {isRecipientSelected 
                                ? <FaCheckCircle className="w-4 h-4 mr-2 text-custom-blue" /> 
                                : <FaRegCircle className="w-4 h-4 mr-2 text-gray-400" />
                            }
                                
                                
                                {/* Text */}
                                <span className="text-sm
                                ">
                                    {recipient.room} - {recipient.name}
                                </span>

                                
                                

                            </div>
                    )
                            
                        })}
                    </div>
                
            </div>
        </div>



    );
};

export default RecipientSelector;