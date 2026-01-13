import React from "react";
import { LuMapPin } from "react-icons/lu";
import { TbPhone } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { PiNotePencil } from "react-icons/pi";

export const 
TenantInfo = ({  handleOpenEditModal, tenant }) => {
  

  
  return (
    <div>
      <div className="shadow-lg rounded-2xl p-6 mt-4 border-2 ">
        {/* 1. ส่วนเนื้อหาด้านบน (Title, Count, Icon) อยู้ชิดซ้าย */}
        <div className="md:grid grid-cols-3 items-center">
          <div className="col-span-1">
            <img
              src="./img/room1.png"
              alt="Description of the image"
              className="w-[450px] h-[320px] object-cover rounded-xl"
            />
          </div>

          <div className="col-span-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center ">
                <img
                  src={tenant?.profile === "woman" ? "./img/woman-profilepic.png" : "./img/men-profilepic.png"}
                  alt="Description of the image"
                  className="w-30 h-28"
                />

                <div className="mt-6">
                  <p className="text-2xl md:text-3xl font-semibold">
                    {tenant?.name || "ไม่ระบุชื่อ"}
                  </p>
                  <div className="flex mb-2 mt-2">
                    <LuMapPin className="w-5 h-5 text-[#53b8e0] mr-1" />
                    <p className="text-base  text-gray-500">
                      Room 101 - Building A
                    </p>
                  </div>
                  <button
                    className="flex md:hidden w-fit p-2 bg-custom-blue cursor-pointer hover:bg-[#62bee2f3] text-white md:text-lg font-medium  rounded-xl shadow-md transition duration-150 "
                    onClick={()=>handleOpenEditModal(tenant)}
                  >
                    <PiNotePencil className="w-5 h-5 text-white mr-2" />
                    <p className="text-base  text-white">แก้ไขข้อมูล</p>
                  </button>
                </div>
              </div>
              <button
                className="hidden md:flex p-3 bg-custom-blue cursor-pointer hover:bg-[#62bee2f3] text-white md:text-lg font-medium  rounded-xl shadow-md transition duration-150"
                onClick={()=>handleOpenEditModal(tenant)}
              >
                <PiNotePencil className="w-5 h-5 text-white mr-2" />
                <p className="text-base  text-white">แก้ไขข้อมูล</p>
              </button>
            </div>
            <div className="grid grid-cols-2 md:flex row mt-5 md:mt-1 md:ml-5 text-center">
              <p className="flex items-center font-semibold text-base mr-3 bg-green-500 rounded-2xl px-5 py-1">
                สัญญายังใช้อยู่
              </p>
              <p className="font-semibold mr-3 bg-green-500 rounded-2xl px-4 py-1">
                ชำระเงินล่าสุด: ชำระแล้ว
              </p>
              <p className="font-semibold mt-4 md:mt-0 text-base border boder-gray-200 rounded-2xl px-4 py-1">
                ครบกำหนด: 25 ต.ค.
              </p>
            </div>

            <div className="md:grid grid-cols-2 mt-6">
              <div className="md:ml-5">
                <h2 className="text-xl font-bold">ข้อมูลติดต่อ</h2>
                <div className="flex mb-2 mt-2">
                  <TbPhone className="w-5 h-5 text-[#53b8e0] mr-2" />
                  <p className="text-lg  text-gray-500">{tenant?.phone || "ไม่ระบุเบอร์โทร"}</p>
                </div>
                <div className="flex mb-3">
                  <HiOutlineMail className="w-5 h-5 text-[#53b8e0] mr-2" />
                  <p className="text-lg  text-gray-500">{tenant?.email || "-"}</p>
                </div>

                <div className="block md:hidden">
                  <h2 className="text-xl font-bold mb-2">รายละเอียดสัญญา</h2>
                  <div className="flex justify-between text-lg mb-2">
                    <p className="text-gray-500">ค่าเช่ารายเดือน: </p>
                    <p className="text-black font-semibold">฿8,500</p>
                  </div>

                  <div className="flex justify-between text-lg mb-2">
                    <p className=" text-gray-500 ">เงินมัดจำ: </p>
                    <p className="text-black font-semibold">฿{tenant?.depositAmount || "0"}</p>
                  </div>

                  <div className="flex justify-between text-lg mb-2">
                    <p className=" text-gray-500 ">วันเริ่มสัญญา: </p>
                    <p className="text-black font-semibold">
                      {new Date(tenant?.contractStartDate).toLocaleDateString('th-TH')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <h2 className="text-xl font-bold mb-2">รายละเอียดสัญญา</h2>
                <div className="flex justify-between text-lg mb-2">
                  <p className="text-gray-500">ค่าเช่ารายเดือน: </p>
                  <p className="text-black font-semibold">฿8,500</p>
                </div>

                <div className="flex justify-between text-lg mb-2">
                  <p className=" text-gray-500 ">เงินมัดจำ: </p>
                  <p className="text-black font-semibold">฿{tenant?.depositAmount || "0"}</p>
                </div>

                <div className="flex justify-between text-lg mb-2">
                  <p className=" text-gray-500 ">วันเริ่มสัญญา: </p>
                  <p className="text-black font-semibold">
                    {new Date(tenant?.contractStartDate).toLocaleDateString('th-TH')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
