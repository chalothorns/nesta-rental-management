// client/src/components/Dashboard/StatCard.jsx
import React from 'react';
import { Home, CheckCircle, AlertCircle} from 'lucide-react';

//นี่คือการประกาศฟังชัน(component) ชื่อ statcard ค่าใน {} คือ props ที่รับมาจาก component แม่ที่เรียกใช้ statcard และสิ่งนี้คือการ destructuring ทำให้เราสามารถรับค่าพวกนี้มาได้ด้วยการเขียน key ตรงๆไม่ต้อง props.title เป็นต้น
const StatCard = ({ title, count, description, buttonText, type }) => {
    // baseColor มีค่าข้างในเป็น string จึงไม่สามารถเรียกใช้งานแบบ <baseColor /> เราจะแยกมันด้วยการตั้งชื่อตัวอักษรแบบ pascal case/camel case
    const baseColor = type === 'overdue' ? 'border-red-300 bg-[#f8e7ed]':
                      type === 'paid' ? 'border-[#96e2c2] bg-[#F3F8F8]' :  
                      'border-gray-300 ';
    
    
    // สามารถใช้ IconComponent ได้ แบบนีั <IconComponent /> เพราะมันคือ React Functional Component(ต้องเป็น Class หรือ Function เท่านั้น) ค่าข้างในกล่องนี้ มันมีค่าเป็น function
    const IconComponent = 
        type === 'overdue' ? AlertCircle  : // ⚠️ สำหรับค้างชำระ
        type === 'paid' ? CheckCircle :       // ✅ สำหรับชำระแล้ว
        Home;

const buttonStyle = 
        type === 'overdue' ? 
            'bg-[#fa8585] hover:bg-[#f89292]' : // สำหรับค้างชำระ (สีแดง)
        (type === 'paid' || type === 'total') ?  
        'bg-[#67BBE4] hover:bg-[#65c6ec] ' : // สำหรับชำระแล้วและทั้งหมด (สีฟ้า)
        ''; // ค่าว่างเผื่อไว้ ถ้า type ไม่ตรงกับอันไหนเลยr

    const countColor = type === 'overdue' ? 'text-red-400' : 
                       type === 'paid' ? 'text-black-700' : 'text-[#53b8e0]'

    //จะเห็นได้ว่าด้านบน return เงื่อนไขส่วนใหญ่ การตัดสินใจใหญ่ๆเราจะอิงตามแต่ type อย่างเดียว การ์ดจะถูกสร้างกี่ใบก็อยุ่ที่ component แม่จะบอกว่ามีกี่ type

    return (
        <div className={`shadow-lg rounded-2xl p-6 border-2  ${baseColor} transition duration-300`}>
            
            {/* 1. ส่วนเนื้อหาด้านบน (Title, Count, Icon) อยู้ชิดซ้าย */}
            <div className="flex items-start justify-between">
                
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
            
            {/* Logical AND Operator ตรงนี้หมายถึง ถ้ามีตัวแปรใน buttonTextจริง ให้แสดงปุ่ม/โค้ดที่อยู่หลัง && ในที่นี้ buttonText มี 3 ค่าจริงแต่มีค่านึงเปน undefine จึงโชว์แค่ 2 อย่างและแสดงแค่2ปุ่ม */}
            {(buttonText) && (
        <button className={`mt-4 w-full py-2 text-white rounded-xl text-sm font-medium ${buttonStyle}`}> 
            {buttonText} 
        </button>
    )}
        </div>
    );
};  

export default StatCard;