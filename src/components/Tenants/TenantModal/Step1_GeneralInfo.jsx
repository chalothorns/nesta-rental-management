import React from "react";
import { LuUpload } from "react-icons/lu";

const Step1_GeneralInfo = ({ setModal, onNext, handleChange, tenant }) => {

  const currentName = tenant.name || "";
  const currentPhone = tenant.phone || "";
  const currentIdCard = tenant.idCardNumber || "";
  const currentAddress = tenant.currentAddress || "";
  const currentDeposit = tenant.depositAmount?.toString() || "";

  const nameParts = currentName.trim().split(/\s+/);
  const hasNumber = /\d/.test(currentName);
  const isEachPartLongEnough = nameParts.every((part) => part.length >= 2);

  // const titleError =
  const nameError =
    currentName.length !== 0 &&
    (!currentName.includes(" ") || hasNumber || !isEachPartLongEnough)
      ? "กรุณากรอกชื่อนามสกุลผู้เช่า"
      : null;

  const phoneError =
    tenant.phone.length > 0 &&
    (tenant.phone[0] !== "0" ||
      tenant.phone.length !== 10 ||
      !/^\d+$/.test(tenant.phone))
      ? "กรุณากรอกเบอร์โทร (เช่น 08XXXXXXXX)"
      : null;

  const idCardNumberError =
    tenant.idCardNumber.length > 0 &&
    (tenant.idCardNumber.length !== 13 || !/^\d+$/.test(tenant.idCardNumber))
      ? "กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก"
      : null;

  const depositAmountError =
    tenant.depositAmount !== null && isNaN(tenant.depositAmount)
      ? "กรุณากรอกเป็นตัวเลขจำนวนเงินเท่านั้น"
      : null;

  const currentAddressError =
    tenant.currentAddress.length > 0 && tenant.currentAddress.length < 5
      ? "กรุณากรอกที่อยู่โดยสังเขป"
      : null;

  

  const isStep1Valid =
    !nameError &&
    !phoneError &&
    !idCardNumberError &&
    !depositAmountError &&
    !currentAddressError &&
    currentName.trim() !== "" &&
    currentPhone.trim() !== "" &&
    currentIdCard.trim() !== "" &&
    currentAddress.trim() !== "" &&
    (tenant.contractStartDate || "") !== "" &&
    currentDeposit !== "";
    

  return (
    <>
      <form className="w-full ">
        <h3 className="mb-6 text-lg font-bold leading-none text-heading">
          ข้อมูลหลัก
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">
              คำนำหน้า <span className="text-red-600">*</span>
            </label>
            <select
              name="title"
              value={tenant.title}
              onChange={handleChange}
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
            >
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">
              ชื่อ-นามสกุล <span className="text-red-600">*</span>
            </label>
            <input
              name="name"
              type="text"
              value={tenant.name || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
            />
            {nameError && (
              <p className="text-red-500  mt-1 px-2">{nameError}</p>
            )}
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">ชื่อเล่น</label>
            <input
              name="nickname"
              type="text"
              value={tenant.nickname || ""}
              onChange={handleChange}
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
            />
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">
              เบอร์โทรศัพท์ <span className="text-red-600">*</span>
            </label>
            <input
              name="phone"
              type="text"
              value={tenant.phone || ""}
              onChange={handleChange}
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
            />

            {phoneError && (
              <p className="text-red-500  mt-1 px-2">{phoneError}</p>
            )}
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">
              เลขบัตรประชาชน <span className="text-red-600">*</span>
            </label>
            <input
              name="idCardNumber"
              type="text"
              value={tenant.idCardNumber || ""}
              onChange={handleChange}
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
            />
            {idCardNumberError && (
              <p className="text-red-500  mt-1 px-2">{idCardNumberError}</p>
            )}
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">
              วันเกิด (วว/ดด/ปปปป)
            </label>
            <input
              name="birthDate"
              type="date"
              value={tenant.birthDate ? tenant.birthDate.substring(0, 10) : ""}
              onChange={handleChange}
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
            />
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">
              วันที่เริ่มสัญญา <span className="text-red-600">*</span>
            </label>
            <input
              name="contractStartDate"
              type="date"
              value={
                tenant.contractStartDate
                  ? tenant.contractStartDate.substring(0, 10)
                  : ""
              }
              onChange={handleChange}
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
            />
          </div>

          <div className="mb-4 mr-4">
            <label className="font-medium text-gray-700">
              เงินมัดจำ <span className="text-red-600">*</span>
            </label>
            <input
              name="depositAmount"
              type="text"
              value={tenant.depositAmount || ""}
              onChange={handleChange}
              className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
            />
            {depositAmountError && (
              <p className="text-red-500  mt-1 px-2">{depositAmountError}</p>
            )}
          </div>
        </div>

        <div className="mb-4 mr-4">
          <label className="font-medium text-gray-700">
            ที่อยู่ปัจจุบัน <span className="text-red-600">*</span>
          </label>
          <textarea
            name="currentAddress"
            type="text"
            value={tenant.currentAddress || ""}
            onChange={handleChange}
            className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
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
              onClick={() =>
                document.getElementById("file-upload-more").click()
              } //ใช้คลิกที่ div เพื่อทริกเกอร์ input
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
            className="text-sm md:text-base py-2 px-4 mr-3 rounded-xl hover:bg-[#ffc4c4] bg-white border-gray-300"
            onClick={() => setModal((prev) => ({ ...prev, isOpen: false }))}
          >
            ยกเลิก
          </button>

          <button
            type="button"
            disabled={!isStep1Valid}
            className={`text-sm md:text-base bg-custom-blue text-white mr-4 rounded-xl 
                  ${
                    isStep1Valid
                      ? "cursor-pointer hover:bg-[#62bee2f3]"
                      : "opacity-60 cursor-default"
                  }`}
            onClick={onNext}
          >
            ถัดไป
          </button>
        </div>
      </form>
    </>
  );
};

export default Step1_GeneralInfo;
