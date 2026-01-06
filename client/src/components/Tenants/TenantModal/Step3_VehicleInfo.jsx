import React from 'react'
import { LuUpload } from 'react-icons/lu'

const Step3_VehicleInfo = ({setStep, setIsModalOpen, formData, handleChange, handleSaveTenant, modalMode }) => {
  return (
    <>
        <form className="w-full">
        <h3 className="mb-6 text-lg font-semibold leading-none text-heading">
              ยานพาหนะ
            </h3>
    
            <div className="  shadow-lg rounded-2xl p-6 mt-4 border-2 ">
              <h3 className="mb-6 text-lg font-semibold leading-none">
                ยานพาหนะคันที่ 1
              </h3>
    
              <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="mb-4 mr-4">
                    <label className="font-medium text-gray-700">ประเภทยานพาหนะ</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                    />
                  </div>
    
                  <div className="mb-4 mr-4">
                    <label className="font-medium text-gray-700">ทะเบียนรถ</label>
                    <input
                      name="phone"
                      type="text"
                      value={formData.carPlate}
                      onChange={handleChange}
                      className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                    />
                  </div>
                  </div>
                   <div className="mb-4 mr-4">
                  <label className="font-medium text-gray-700">รายละเอียดยานพาหนะ</label>
                  <textarea
                    id="subject"
                    name="subject"
                    row="8"
                    className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                  />
                </div>
    
                <div className="mt-6">
                          <label className="block text-lg font-medium mb-2">
                            รูปภาพยานพาหนะ
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
                                  อัพโหลดรูปยานพาหนะ
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
                            </div>
                </div>
    
            </div>
    
             <div className="flex rows justify-between mt-4">
              <button
                type="button"
                className="py-2 px-4 mr-3 rounded-xl hover:bg-[#D1F0E5] transition bg-white border-gray-300"
                onClick={() => setStep(2)}
              >
                ย้อนกลับ
              </button>
              <div>
              <button
                type="button"
                className="py-2 px-4 mr-3 rounded-xl hover:bg-[#ffc4c4] bg-white border-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                ยกเลิก
              </button>
    
              <button
                type="button"
                className="bg-custom-blue hover:bg-[#62bee2f3] text-white mr-4 rounded-xl"
                onClick={() => handleSaveTenant(formData)}
              >
                {modalMode === "edit"? "ยืนยันการแก้ไข" : "บันทึกข้อมูล"}
              </button>
              </div>
            </div>
    
    
    
        </form>
        </>
  )
}

export default Step3_VehicleInfo