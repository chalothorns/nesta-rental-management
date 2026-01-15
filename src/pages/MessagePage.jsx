// client/src/pages/MessagePage.jsx เอาไว้จัดวาง component ย่อยๆและ usestate จาก compo
import React from 'react';
import { FaPaperPlane} from 'react-icons/fa';
import MessageForm from '../components/Message/MessageForm';
import SendingOptions from '../components/Message/SendingOptions';
import RecipientSelector from '../components/Message/RecipientSelector';
import { useOutletContext } from 'react-router-dom';


const MessagePage = () => {
    const {adminUser,authLoading} = useOutletContext();

    if (authLoading) {
    return <div className="p-10 text-center">กำลังตรวจสอบสิทธิ์...</div>;
  }

  // 2. เช็คว่าถ้าโหลดเสร็จแล้ว แต่ไม่มีข้อมูลผู้ใช้ (ไม่ได้ Login)
  if (!adminUser) {
    return <div className="p-10 text-center md:text-start text-red-500">สิทธิ์การเข้าถึงถูกปฏิเสธ กรุณาล็อกอิน</div>;
  }
    return (
        /*max-w-7xl เพื่อจำกัดความกว้างของจอ และง่ายต่อการจัดวางองค์ประกอบข้างใน*/ 
        <div className="flex flex-col  gap-6 p-4 md:p-8 min-h-screen md:max-w-7xl mb-20 md:mb-0"> 
            <h1 className="text-3xl font-bold text-gray-900 ">ส่งข้อความ </h1>
            <p className= "text-gray-500 -mt-3">ส่งข้อความถึงผู้เช่าทั้งหมด</p>

            {/* Layout หลักใช้ Grid หรือ Flexbox เพื่อจัดองค์ประกอบ */}
            <div className="space-y-6 md:w-2/3 md:ml-6  bg-white p-6 rounded-xl shadow-lg border border-gray-200"> {/* ใช้ space-y-6 จัดช่องว่างระหว่าง Component max-w ใช้ค่านี้เพื่อจำกัดความกว้าง mx-auto อันนี้คือให้ระบบ auto margin ซ้ายขวาให้*/}
                
                {/* 1. ส่วนฟอร์มข้อความ */}
                <MessageForm /> 

                {/* 2. ส่วนวิธีการส่ง */}
                <SendingOptions />
                
                {/* 3. ส่วนรายการผู้รับ */}
                <RecipientSelector />
                
                {/* 4. ปุ่มส่ง */}
                <div className="mt-8">
                    <button className="w-full py-3 bg-custom-blue text-white font-semibold rounded-lg shadow-md hover:bg-[#62bee2f3] transition duration-150 flex items-center justify-center">
                        <FaPaperPlane className="w-5 h-5 mr-2"/>
                        ส่งข้อความถึง 6 คน 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagePage;



