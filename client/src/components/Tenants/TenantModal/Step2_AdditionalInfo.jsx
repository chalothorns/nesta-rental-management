import React from 'react'

const Step2_AdditionalInfo = ({setStep, formData, handleChange}) => {
  return (
    <>
    <form className="w-full">
        <h3 className="mb-6 text-lg font-semibold leading-none text-heading">
          ข้อมูลเพิ่มเติม
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b">
          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">อีเมล</label>
            <input
               name="phone"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
            />
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">Facebook</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
            />
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">Line ID</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
            />
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">
              สถานที่ทำงาน/เรียน
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
            />
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">แผนก</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
            />
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">ตำแหน่ง</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-3 py-3 mb-5 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
            />
          </div>
        </div>

        <h3 className="mt-8 mb-6 text-lg font-semibold leading-none text-heading ">
          ผู้ติดต่อฉุกเฉิน
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">ชื่อ</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
            />
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">ความสัมพันธ์</label>
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
              type="text"
              id="subject"
              name="subject"
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
            />
          </div>
        </div>

        <div className="flex rows justify-between mt-4">
          <button
            type="button"
            className="py-2 px-4 mr-3 rounded-xl hover:bg-[#D1F0E5] transition bg-white border-gray-300"
            onClick={() => setStep(1)}
          >
            ย้อนกลับ
          </button>

          <button
            type="button"
            className="bg-custom-blue hover:bg-[#62bee2f3] text-white mr-4 rounded-xl"
            onClick={() => setStep(3)}
          >
            ถัดไป
          </button>
        </div>
      </form>
    </>
  )
}

export default Step2_AdditionalInfo