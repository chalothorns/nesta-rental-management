//Component สำหรับตัวเลือกวิธีการส่ง (LINE Notify, Email) พร้อม Toggle Switch

import React, { useState } from 'react';

const SendingOptions = () => {

    //State สำหรับ สวิทช์ปิดเปิด line
    const [isLineEnable, setIsLineEnabled] = useState(true);

    const toggleLine = () => {
        setIsLineEnabled(!isLineEnable);
    };

    const [isEmailEnable, setIsEmailEnabled] = useState(true);

    const toggleEmail= () => {
        setIsEmailEnabled(!isEmailEnable)

    };
    return (
<div className="bg-[#edfaf3] rounded-xl p-5">
            <h2 className="text-lg font-semibold text-gray-800 ml-4 mt-3 w-full">วิธีการส่ง</h2>

            {/* ----------------- สวิตช์ LINE Notify ----------------- */}
            
            
                <div className=" bg-white  rounded-lg mt-5 p-4 text-gray-800 flex items-center justify-between">
                
                {/* 1. คอลัมน์ซ้าย (ข้อความ) */}
                <div className="flex flex-col">
                    <h3 className="text-lg cursor-pointer ">ส่งผ่าน <span className="font-bold">LINE Notify</span></h3>
                    <p className="text-sm  text-gray-500">แจ้งเตือนทันทีผ่านแอพ LINE</p>
                    
                </div>
            {/* โค้ด Toggle Switch */}
           <label htmlFor="line-toggle" className="relative inline-flex items-center cursor-pointer">
                <input 
                      type="checkbox"
                      id="line-toggle"
                      className="sr-only peer" //sr-only ซ่อน Checkbox
                      checked={isLineEnable}
                      onChange={toggleLine}
                />

                {/* 2.คมลัมน์ขวา  รูปร่างของ Switch 
                translate-x-[19px] คือให้สิ่งของนั้นๆในที่นี้ก็คือ toggle เลื่อนไปตามแกนx หรือแนวนอนจำนวน 22px
                */} 
                <div className={`w-12 h-7 bg-gray-300 rounded-full peer
                peer-checked:after:translate-x-[19px]  
                peer-checked:afterborder-white
                after:content-[''] after:absolute after:top-0.5 after:left-[1px] 
                after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6
                after:transition-all peer-checked:bg-custom-blue`}>

                </div>
           </label>
               </div>
            



                <div className="bg-white rounded-lg mt-5 p-4 flex items-center justify-between">
                    {/* ----------------- สวิตช์ Email Notify ----------------- */}
                    {/* 1. คอลัมน์ซ้าย (ข้อความ) */}
                <div className="flex flex-col">
                    <h3 className="text-gray-800 text-lg cursor-pointer ">ส่งผ่านอีเมล</h3>
                    <p className="text-sm  text-gray-500">ส่งอีเมลไปยังที่อยู่ที่ลงทะเบียน</p>

                 </div>
              {/* โค้ด Toggle Switch */}
              <label htmlFor="email-toggle" className="relative inline-flex items-center cursor-pointer">
                <input 
                      type="checkbox"
                      id="email-toggle"
                      className="sr-only peer" //sr-only ซ่อน Checkbox
                      checked={isEmailEnable}
                      onChange={toggleEmail}
                />

                {/* โค้ดฝั่งขวา รูปร่างของ Switch 
                translate-x-[19px] คือให้สิ่งของนั้นๆในที่นี้ก็คือ toggle เลื่อนไปตามแกนx หรือแนวนอนจำนวน 22px
                */} 
                <div className={`w-12 h-7 bg-gray-300 rounded-full peer
                peer-checked:after:translate-x-[19px]  
                peer-checked:afterborder-white
                after:content-[''] after:absolute after:top-0.5 after:left-[1px] 
                after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6
                after:transition-all peer-checked:bg-custom-blue`}>

                </div>
            </label>

            </div>
            </div>
    );
    
};

export default SendingOptions;