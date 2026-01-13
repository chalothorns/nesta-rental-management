//Component หลักสำหรับฟอร์มข้อความ (หัวข้อ, เนื้อหา)

// client/src/components/Message/MessageForm.jsx
import React from 'react';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';

const MessageForm = () => {
    return (
        
        <div>
            {/*ใช้ color เพื่อกำหนด สี icon */}
            <h3 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center"> <MdOutlineChatBubbleOutline className="w-5 h-5 mr-2" color="#53b8e0"/>
                
                เขียนข้อความ
            </h3>

            <div className="mb-4">
                <label className="font-medium text-gray-700">หัวข้อข้อความ *</label>
                    <input 
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="เช่น ประกาศสำคัญ"
                    /*focus:ring เอาไว้เพิ่มวงแหวนหรือกรอบเพื่อเน้น input/ focus:ring-offset-2 คือสั่งให้วงแหวน เยื้องออกมาจากขอบ 2px ทำให้เกิดช่องว่างระหว่าง Focus Border และ Focus Ring*/
                    className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                    />

            </div>


             <div className="mt-8">
                <label className="font-medium text-gray-700">เนื้อหาข้อความ *</label> 
                    <textarea 
                    id="content"
                    name="content"
                    rows="8"
                    placeholder="พิมพ์ข้อความที่นี่..."
                     className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                    ></textarea>
                    <p className="text-gray-500 text-sm">0 ตัวอักษร</p>


            </div>
        </div>
    );
};

export default MessageForm;