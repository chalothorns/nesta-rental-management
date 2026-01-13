import React from 'react'
import { LuMapPin } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbPhone } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";


const TenantCard = ({onClickDetail, tenant, onDelete}) => {
    
  return (
   
    <div className="w-full md:w-[350px] shadow-lg rounded-2xl p-6 mt-4 border-2 hover:-translate-y-3 transition duration-300 ">
            
            {/* 1. ส่วนเนื้อหาด้านบน (Title, Count, Icon) อยู้ชิดซ้าย */}
            <div className="relative flex col items-center">
                <div>
                    <img src={tenant?.profile === "woman" ? "./img/woman-profilepic.png" : "./img/men-profilepic.png"} alt="Description of the image" className="w-22 h-20"/>
                </div>

                <div>
                <p className="text-lg font-semibold">{tenant?.name || "ไม่ระบุชื่อ"}</p>
                <div className="flex mb-6 mt-2">
                <LuMapPin className="w-4 h-4 text-[#53b8e0] mr-1" />
                <p className="text-sm  text-gray-500">Room 101 - Building A</p>
                </div>
                
                <button
                onClick={onDelete}
                className="absolute right-1 top-1 cursor-pointer p-2 rounded-xl transition hover:bg-[#fa858544] ">
                <RiDeleteBinLine className="w-6 h-6 text-gray-700 transition hover:text-[#fa8585]" />
                </button>
                </div>
                
        
            </div>

            <div className="flex row mt-1">
                <p className="font-semibold text-sm mr-3 bg-green-500 rounded-xl px-4 py-1">กำลังเช่า</p>
                <p className="font-semibold text-sm bg-green-500 rounded-xl px-4 py-1">ชำระแล้ว</p>
            </div>
            <div className="flex mb-2 mt-2">
                <TbPhone className="w-5 h-5 text-[#53b8e0] mr-2" />
                <p className="text-sm  text-gray-500">{tenant?.phone || "ไม่ระบุเบอร์โทร"}</p>
            </div>
            <div className="flex mb-3">
                <HiOutlineMail className="w-5 h-5 text-[#53b8e0] mr-2" />
                <p className="text-sm  text-gray-500">{tenant?.email || "ไม่ระบุอีเมล"}</p>
            </div>
            
            
            <div className="flex justify-between items-center border-t">
            <p className="py-3 text-gray-500">ค่าเช่ารายเดือน</p>
            <p className="text-black text-xl">฿8,500</p>
            </div>
            
            <div className="flex justify-between items-center">
            <p className="text-gray-500">ครบกำหนด</p>
            <p className="text-black text-base">25 ต.ค. 2568</p>
            </div>

            
            <button className="btn-detail w-full mt-6 rounded-xl border border-gray-300 bg-gray-50 text-black hover:bg-[#D1F0E5] transition"
            onClick={onClickDetail}
            >
                ดูรายละเอียด
            </button>
            


            
           
        </div>
       
  )
}

export default TenantCard