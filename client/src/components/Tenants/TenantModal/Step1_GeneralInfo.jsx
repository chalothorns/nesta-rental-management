import React from 'react'
import { LuUpload } from "react-icons/lu";

const Step1_GeneralInfo = ({setIsModalOpen,  setStep, formData, handleChange}) => {
  return (
    <>
    <form className="w-full ">
            <h3 className="mb-6 text-lg font-bold leading-none text-heading">
              ข้อมูลหลัก
            </h3>
    
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="mb-4 mr-4">
                <label className="font-medium text-gray-700">คำนำหน้า</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                />
              </div>
    
              <div className="mb-4 mr-4">
                <label className="font-medium text-gray-700">ชื่อ-นามสกุล</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                />
              </div>
    
              <div className="mb-4 mr-4">
                <label className="font-medium text-gray-700">ชื่อเล่น</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                />
              </div>
    
              <div className="mb-4 mr-4">
                <label className="font-medium text-gray-700">เบอร์โทรศัพท์</label>
                <input
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                />
              </div>
    
              <div className="mb-4 mr-4">
                <label className="font-medium text-gray-700">เลขบัตรประชาชน</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                />
              </div>
    
              <div className="mb-4 mr-4">
                <label className="font-medium text-gray-700">
                  วันเกิด (วว/ดด/ปปปป)
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                />
              </div>
    
              <div className="mb-4 mr-4">
                <label className="font-medium text-gray-700">วันที่เริ่มสัญญา</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                />
              </div>
    
              <div className="mb-4 mr-4">
                <label className="font-medium text-gray-700">
                  เงินมัดจำ
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                />
              </div>
            </div>
    
            <div className="mb-4 mr-4">
              <label className="font-medium text-gray-700">ที่อยู่ปัจจุบัน</label>
              <textarea
                id="subject"
                name="subject"
                row="10"
                className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
              />
            </div>
    
            <div className="mt-6">
              <label className="block text-lg font-medium mb-2">
                อัพโหลดรูปบัตรประชาชน
              </label>
    
              <div className="w-fit md:flex">
                {/* 💡 Dropzone Container */}
                <div
                  className="px-2 mb-2 md:mb-0 border border-gray-200 rounded-xl bg-white hover:bg-[#D1F0E5] cursor-pointer"
                  onClick={() => document.getElementById("file-upload").click()} //ใช้คลิกที่ div เพื่อทริกเกอร์ input
                >
                  <div className="flex mb-2 mt-2">
                    <LuUpload className="w-5 h-5 text-[#53b8e0] mr-2" />
                    <p className="text-base  text-gray-500">
                      อัพโหลดรูปบัตรประชาชน
                    </p>
                  </div>
    
                  {/* Input type="file" จริง ๆ (ซ่อนไว้) */}
                  <input
                    id="file-upload"
                    type="file"
                    multiple // อนุญาตให้อัปโหลดหลายไฟล์
                    accept="image/png, image/jpeg, image/jpg" // กรองเฉพาะไฟล์รูปภาพ
                    className="hidden" //ซ่อน Input HTML ดั้งเดิม
                  />
                </div>
    
                <div
                  className="px-2 md:ml-4 border border-gray-200 rounded-xl bg-white hover:bg-[#D1F0E5] cursor-pointer"
                  onClick={() => document.getElementById("file-upload-more").click()} //ใช้คลิกที่ div เพื่อทริกเกอร์ input
                >
                  <div className="flex mb-2 mt-2">
                    <LuUpload className="w-5 h-5 text-[#53b8e0] mr-2" />
                    <p className="text-base  text-gray-500">อัพโหลดรูปเพิ่มเติม</p>
                  </div>
    
                  <input
                    id="file-upload-more"
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
    
            <div className="flex rows justify-end mt-4">
              <button
                type="button"
                className="py-2 px-4 mr-3 rounded-xl hover:bg-[#ffc4c4] bg-white border-gray-300"
              onClick={() => setIsModalOpen(false)
              }>
                ยกเลิก
              </button>
    
              <button
                type="button"
                className="bg-custom-blue hover:bg-[#62bee2f3] text-white mr-4 rounded-xl"
                onClick={() => setStep(2)}
              >
                ถัดไป
              </button>
            </div>
          </form>
    </>
  )
}

export default Step1_GeneralInfo