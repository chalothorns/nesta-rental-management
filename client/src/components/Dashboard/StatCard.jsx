// client/src/components/Dashboard/StatCard.jsx
import React from 'react';
import { Home, CheckCircle, AlertCircle} from 'lucide-react';

const StatCard = ({ title, count, description, buttonText, type }) => {
    // กำหนดสีตามประเภทการ์ด (ใช้สีตามรูปที่คุณต้องการ)
    const baseColor = type === 'overdue' ? 'border-red-300 bg-[#fac7c729]':
                      type === 'paid' ? 'border-[#96e2c2] bg-[#bafcd014]' :  
                      'border-gray-300 bg-blue-50';
    
    
    const IconComponent = 
        type === 'overdue' ? AlertCircle  : // ⚠️ สำหรับค้างชำระ
        type === 'paid' ? CheckCircle :       // ✅ สำหรับชำระแล้ว
        Home;

const buttonStyle = 
        type === 'overdue' ? 
            'bg-[#fa8585] hover:bg-[#f89292]' : // สำหรับค้างชำระ (สีแดง)
        (type === 'paid' || type === 'total') ?  
        'bg-[#62bee2] hover:bg-[#65c6ec] ' : // สำหรับชำระแล้วและทั้งหมด (สีฟ้า)
        ''; // ค่าว่างเผื่อไว้ ถ้า type ไม่ตรงกับอันไหนเลย

    const countColor = type === 'overdue' ? 'text-red-400' : 
                       type === 'paid' ? 'text-black-700' : 'text-[#53b8e0]'

    return (
        <div className={`bg-white  shadow-lg rounded-2xl p-6 border-2  ${baseColor} transition duration-300`}>
            
            {/* 1. ส่วนเนื้อหาด้านบน (Title, Count, Icon) */}
            <div className="flex items-start justify-between ">
                
                {/* 1.1 Text Content (Title, Count, Description) */}
                <div>
                    <div className={`text-xl md:text-2xl font-semibold mb-1 flex items-center  mr-3 ${countColor}`}>
                        <IconComponent className="h-6 w-6 flex-shrink-0  mr-2"/> {/*เอาไว้ปรับขนาดไอคอน*/}
                         {title} {/* แสดงไอคอนและชื่อหัวข้อ */}
                    </div>
                    <div className={`text-4xl font-bold ${countColor} mb-2`}>
                        {count} {/* แสดงตัวเลขสถิติ */}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{description}</p> {/* แสดงคำอธิบาย */}
                </div>
                
               

            </div>
            
            {/* 2. ปุ่มอยู่ด้านล่างสุดของ Card */}
            {(buttonText) && (
        <button className={`mt-4 w-full py-2 text-white rounded-xl text-sm font-medium ${buttonStyle}`}> 
            {buttonText} 
        </button>
    )}
        </div>
    );
};

export default StatCard;