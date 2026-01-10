import React from 'react'
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { LuStickyNote } from "react-icons/lu";

const PaymentHistoryCard = ({month, type, onPaid, onOverdue, amount}) => {
  


  const cardColor = 
        type === "overdue" 
        ? "border-4 border-[#E8867D] bg-[#f8e7e3] text-gray-700 "
        : type === "paid"
        ? "border-4 border-[#9FDFBA] bg-[#e9fff1] text-gray-700  " : "border-4 border-gray-300 bg-gray-100";

  return (
    <div className={`flex flex-col items-center justify-center shadow-lg rounded-2xl p-10 w-full max-w-[300px] ${cardColor}`} >
            {/* border-red-300 bg-[#f8e7ed] */}
            {/* 1. ส่วนเนื้อหาด้านบน (Title, Count, Icon) อยู้ชิดซ้าย */}
            <div className="w-full text-center">
                
                {/* 1.1 Text Content (Title, Count, Description) */}
                <div>
                    <div className="text-xl font-semibold mb-3 mr-3 ">
                       
                         {month} {/* แสดงไอคอนและชื่อหัวข้อ */}
                    </div>
                    <div className="text-lg font-bold mb-3">
                        ฿{amount}{/* แสดงตัวเลขสถิติ */}
                    </div>

                    <div className="mb-3">
                    <button className={`rounded-xl p-3 mr-2 border-2 border-gray-300 md:hover:bg-[#ecfdf7] transition ${type === "paid"
                                            ? "bg-[#9FDFBA]"
                                            : "bg-gray-100"}`}
                    onClick={onPaid}
                    >
                      <FaRegCircleCheck className="w-5 h-5  text-gray-700 "/>
                    </button>

                    <button className={`rounded-xl p-3 border-2 border-gray-300 md:hover:bg-[#ecfdf7] transition ${type === "overdue"
                                            ? "bg-[#E8867D]"
                                            : "bg-gray-100"}`}
                    onClick={onOverdue}
                    >
                    <FaRegCircleXmark className="w-5 h-5  text-gray-700" />
                    </button>

                    </div>
                 
                    
                    <div className="flex justify-center items-center cursor-pointer p-5 rounded-xl md:hover:bg-[#d4faed] transition">
                                    <LuStickyNote className="w-6 h-6 mr-2 text-gray-700 " />
                                    <p className="">เพิ่มโน้ต</p>
                                    
                                    </div>
                                    
                </div> 
                
               

            </div> 
            
        </div>
  )
}

export default PaymentHistoryCard