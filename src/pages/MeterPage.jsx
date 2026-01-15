// client/src/pages/MeterPage.jsx เอาไว้จัดวาง component ย่อยๆและ usestate จาก compo
import React, { useState } from "react";
import MeterHeader from "../components/Meter/MeterHeader";
import MeterRecordTable from "../components/Meter/MeterRecordTable";
import MobileRoomDropDown from "../components/Meter/MobileRoomDropDown";
import MobileMeterRecordTable from "../components/Meter/MobileMeterRecordTable";
import { useOutletContext } from "react-router-dom";

const DUMMY_DATA = [
  {
    id: "1",
    room: "ห้อง 101",
    name: "Mr. Somsak",
    monthlyRecords: {
      "มกราคม": {prevElectric: "", currentElectric: "", prevWater: "", currentWater: ""},
      "กุมภาพันธ์": {prevElectric: "", currentElectric: "", prevWater: "", currentWater: ""},
      "มีนาคม": {prevElectric: "", currentElectric: "", prevWater: "", currentWater: ""},
      "เมษายน": {prevElectric: "", currentElectric: "", prevWater: "", currentWater: ""},
      "พฤษภาคม": {prevElectric: "", currentElectric: "", prevWater: "", currentWater: ""},
      "มิถุนายน": {prevElectric: "", currentElectric: "", prevWater: "", currentWater: ""},
      "กรกฎาคม": {prevElectric: "", currentElectric: "", prevWater: "", currentWater: ""},
      "สิงหาคม": {prevElectric: "", currentElectric: "", prevWater: "", currentWater: ""},
      "กันยายน": {prevElectric: "", currentElectric: "", prevWater: "", currentWater: ""},
      "ตุลาคม": {prevElectric: "", currentElectric: "", prevWater: "", currentWater: ""},
      "พฤศจิกายน": {prevElectric: "", currentElectric: "", prevWater: "", currentWater: ""},
      "ธันวาคม": {prevElectric: "", currentElectric: "", prevWater: "", currentWater: ""},
    }
  },
];

const DEFAULT_NEW_RECORD = {
  // ต้องให้ ID ที่ไม่ซ้ำกัน (อาจใช้ Date.now() หรือ library uuid)
  id: Date.now().toString(),
  room: "ห้องใหม่",
  name: "ผู้เช่าใหม่",
  monthlyRecords: {}
};

const MeterPage = () => {

  const {adminUser,authLoading} = useOutletContext();
  // state สำหรับใช้คุมแท็บที่ใช้งานอยู่
  const [activeTab, setActiveTab] = useState("electric");

  //state สำหรับข้อมูลมิเตอร์ทั้งหมด (เก็บรวมกัน)
  const [meterData, setMeterData] = useState(DUMMY_DATA);

  const [currentMonth, setCurrentMonth] = useState("มกราคม");
  const [currentYear, setCurrentYear] = useState(" ");

  // 🟢 State ใหม่สำหรับ Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordIdToDelete, setRecordIdToDelete] = useState(null);

  const [currentRoom, setCurrentRoom] = useState(DUMMY_DATA[0].room); //เป็นการเข้าถึง element แรกใน array แรกและ property ที่ชื่อ room




  const mobileFilteredData = meterData.filter(record => 
    record.room === currentRoom
  );

  const MONTHS = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];
const currentIndex = MONTHS.indexOf(currentMonth);
const prevMonthName = currentIndex > 0 ? MONTHS[currentIndex - 1] : MONTHS[11];

  const handleRoomChange = (e) => {
    setCurrentRoom(e.target.value);
  };

  const handleDeleteRecord = (idToDelete) => {
    // 1. หา Index และ Object ของห้องที่จะถูกลบ ใน Array เดิม
    const deletedIndex = meterData.findIndex((record) => record.id === idToDelete);

    // 💡 ถ้าหาไม่เจอ (deletedIndex === -1) ให้หยุดทำงาน (Safety Check)
    if (deletedIndex === -1) {
        console.log("Error: Record ID not found for deletion.");
        return; 
    }

    const deletedRecord = meterData[deletedIndex];

    //2.กรองข้อมูลเพื่อสร้าง Array ใหม่
    const newMeterData = meterData.filter((record) => record.id !== idToDelete);

    //3.อัปเดต State ข้อมูลมิเตอร์
    setMeterData(newMeterData);

    // 4. ตรวจสอบและอัปเดต currentRoom เฉพาะเมื่อห้องที่ถูกลบคือ currentRoom
    if (deletedRecord && deletedRecord.room === currentRoom) {
        if(newMeterData.length > 0) {
            let newIndexToSelect;

            if (deletedIndex === 0) {
                // กรณีที่ 1: ถ้าลบห้องแรก (Index 0)
                // ให้เลือกห้องถัดไป (ซึ่งตอนนี้มันเลื่อนมาอยู่ที่ Index 0 ของ Array ใหม่)
                newIndexToSelect = 0; 
            } else {
                // กรณีที่ 2: ถ้าลบห้องอื่น ๆ (ไม่ใช่ห้องแรก)
                // ให้เลือกห้องก่อนหน้ามัน (ซึ่งตอนนี้ยังคงอยู่ที่ Index เดิมของตัวเอง: deletedIndex - 1)
                newIndexToSelect = deletedIndex - 1;
            }

            // ตั้งค่า currentRoom เป็นชื่อห้องของ Index ที่คำนวณได้
            setCurrentRoom(newMeterData[newIndexToSelect].room);
        } else {
            //ถ้าไม่มีห้องเหลือเลย: ให้ตั้งค่าเป็น null เพื่อแสดง placeholder "เลือกห้อง"
            setCurrentRoom(null);
        }
    }
  }


  // 🟢 Handler สำหรับตรวจสอบก่อนลบ (ที่ส่งไปให้ MeterRecordTable)
  const handleCheckAndDelete = (recordId, hasData) => {
    if (hasData) {
      // ถ้ามีข้อมูล: เก็บ ID ไว้ และเปิด Modal
      setRecordIdToDelete(recordId);
      setIsModalOpen(true);
    } else {
      // ไม่มีข้อมูล: ลบทันที
      handleDeleteRecord(recordId);
    }
  };


  // 🟢 Handler เมื่อกด 'ยืนยัน' ใน Modal
  const handleConfirmDeletion = () => {
    if (recordIdToDelete) {
      handleDeleteRecord(recordIdToDelete);
    }
    setIsModalOpen(false);
    setRecordIdToDelete(null);
  };

  const handleSubmitData = async () => {
    // ใช้ .some() เพื่อวนลูปและเช็คว่ามี record ใด record หนึ่งที่ตรงตามเงื่อนไข
    const isAnyRecordFilled = meterData.some((record) => {
      // ตรวจสอบทั้งมิเตอร์ไฟฟ้าและน้ำ ว่ามีค่าปัจจุบัน (current) ที่มากกว่า 0 หรือไม่
      const electricValue = Number(record.monthlyRecords?.[currentMonth]?.currentElectric || 0);
      const waterValue = Number(record.monthlyRecords?.[currentMonth]?.currentWater || 0);

      // ถ้ามีค่าไฟฟ้า > 0 หรือ ค่าน้ำ > 0 ถือว่ามีข้อมูล
      return electricValue > 0 || waterValue > 0;
    });

    if (isAnyRecordFilled) {
      const dataToSave = {
        month: currentMonth,
        year: currentYear,
        records: meterData,
      };

      console.log("กำลังจะส่งข้อมูล:", dataToSave);
      alert(
        `บันทึกข้อมูลมิเตอร์เดือน ${currentMonth} ปี ${currentYear} เรียบร้อยแล้ว!`
      );
    } else {
      // 3. ถ้าไม่มีข้อมูลเลย
      console.log("ไม่สามารถส่งข้อมูลได้: กรุณากรอกค่ามิเตอร์อย่างน้อย 1 ห้อง");
      alert(`❌ ไม่สามารถส่งข้อมูลได้: กรุณากรอกค่ามิเตอร์อย่างน้อย 1 ห้อง`);
    }
  };

  //ฟังก์ชัน add ห้องใหม่
  const handleAddRecord = () => {
    const newRecord = {
      ...DEFAULT_NEW_RECORD,
      // 💡 สำคัญ: สร้าง ID ใหม่ทุกครั้งที่เรียกใช้
      id: Date.now().toString(),
      room: `ห้อง ${meterData.length + 1}`, // ตั้งชื่อห้องง่ายๆ ตามจำนวนที่มี
    };

    // 💡 ใช้ setMeterData เพื่อเพิ่ม record ใหม่เข้าไปใน array เดิม
    setMeterData((prevData) => [...prevData, newRecord]);
    setCurrentRoom(newRecord.room);
  };

  const handleMonthChange = (e) => {
    setCurrentMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setCurrentYear(e.target.value);
  };

  //ฟังก์ชันสลับแท็บ
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleRecordChange = (id, month, field, value) => {
    setMeterData((prevData) =>
      //return array ใหม่ ที่ถูก map() แล้ว
      prevData.map((record) => {
        //ถ้าไอดีตรงกับห้องที่กรอกข้อมูล
        if (record.id === id) {
          return {
            //ข้อมูลก่อนๆที่มีอยู่แล้ว
            ...record,
            monthlyRecords: {
              //โชว์ข้อมูลก่อนๆใน record.monthlyRecords
              ...record.monthlyRecords,
              //เดือนที่ผู้ใช้กำลังเลือกอยู่ จะมีข้อมูล:
                [month]: {
                  //ถ้ามี record ก่อนหน้าให้แสดงขึ้นมา(optional) หรือถ้าไม่มีใส่ {}
                  ...(record.monthlyRecords?.[month] || {}),
                  //อัปเดตช่องปัจจุบันที่กำลังกรอกตัวเลขอยู่
                  [field]: value,
                },
            },
          };
        }
        return record;
      })
    );
  };

  if (authLoading) {
    return <div className="p-10 text-center">กำลังตรวจสอบสิทธิ์...</div>;
  }

  // 2. เช็คว่าถ้าโหลดเสร็จแล้ว แต่ไม่มีข้อมูลผู้ใช้ (ไม่ได้ Login)
  if (!adminUser) {
    return <div className="p-10 text-center md:text-start text-red-500">สิทธิ์การเข้าถึงถูกปฏิเสธ กรุณาล็อกอิน</div>;
  }

  return (
    /*max-w-7xl เพื่อจำกัดความกว้างของจอ และง่ายต่อการจัดวางองค์ประกอบข้างใน*/
    <div className="flex flex-col  gap-6 p-4 md:p-8 w-full  mb-20 md:mb-0">
      <h1 className="text-3xl font-bold text-gray-900 ">บันทึกมิเตอร์ </h1>
      <p className="text-gray-500 -mt-3">บันทึกข้อมูลมิเตอร์ไฟฟ้าและน้ำประปา</p>

      {/* Layout หลักใช้ Grid หรือ Flexbox เพื่อจัดองค์ประกอบ */}
      <div className="space-y-6 md:w-2/3 md:ml-6  bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        {" "}
        {/* ใช้ space-y-6 จัดช่องว่างระหว่าง Component max-w ใช้ค่านี้เพื่อจำกัดความกว้าง mx-auto อันนี้คือให้ระบบ auto margin ซ้ายขวาให้*/}
        {/* MeterHeader */}
        <MeterHeader
          selectedMonth={currentMonth}
          selectedYear={currentYear}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />

        
        <div className="block md:hidden">
          <MobileRoomDropDown
            handleAddRecord={handleAddRecord}
            meterData={meterData}
            onRoomChange={handleRoomChange}
            selectedRoom={currentRoom}
          />
        </div>
        {/* ส่วน Tab Navigation */}
        <div className="flex bg-[#EEF2F6] p-1 rounded-lg border-gray-200 mb-6 ">
          {/* ปุ่มสำหรับมิเตอร์ไฟฟ้า */}

          <button
            onClick={() => handleTabChange("electric")}
            // flex-1: Class นี้สั่งให้ปุ่มทั้งสอง ยืดขยาย ออกไปใช้พื้นที่ที่เหลือทั้งหมดใน Container อย่างเท่าเทียมกัน (50% / 50%)
            className={`px-4 py-3 text-xl font-medium transition duration-150 flex-1 ${
              activeTab === "electric"
                ? "bg-[#F8FAFC] shadow-sm text-gray-800" //Active style
                : "text-gray-500  bg-[#EEF2F6]" //Inactive style
            }
                        `}
          >
            ⚡ บันทึกมิเตอร์ไฟฟ้า
          </button>
          {/* ปุ่มสำหรับมิเตอร์น้ำ */}
          <button
            onClick={() => handleTabChange("water")}
            className={`px-4 py-3 text-xl font-medium transition duration-150 flex-1
                                ${
                                  activeTab === "water"
                                    ? "bg-[#F8FAFC] shadow-sm text-gray-800" //Active style
                                    : "text-gray-500  bg-[#EEF2F6]" //Inactive style
                                }
                        `}
          >
            💧 บันทึกมิเตอร์น้ำ
          </button>
        </div>
        {/* หน้า MeterRecordTable */}
        <div className="hidden md:block">
        <MeterRecordTable
          meterData={meterData}
          activeTab={activeTab} //ตัวควบคุมการแสดงผลในตาราง
          onRecordChange={handleRecordChange}
          onDeleteCheck={handleCheckAndDelete}
          selectedMonth={currentMonth}
          prevMonthName={prevMonthName}
        />
        </div>

         <div className="block md:hidden">
            {mobileFilteredData.map(record => (
                <MobileMeterRecordTable
                    key={record.id}
                    record={record} 
                    activeTab={activeTab} 
                    onRecordChange={handleRecordChange} 
                    onDeleteCheck={handleCheckAndDelete} 
                    selectedMonth={currentMonth}
                    prevMonthName={prevMonthName}
                    meterData={meterData}
                />
            ))}
        </div> 


        {/* เพิ่มปุ่ม "เพิ่มห้องใหม่" และผูกกับ Handler */}
        <div className="mt-4 hidden md:block">
          <button
            onClick={handleAddRecord}
            className="py-3 px-6 text-sm font-semibold  text-gray-700 bg-[#F8FAFC] border border-[#DADEE6] rounded-xl hover:bg-[#D1F0E5] transition-150 flex items-center"
          >
            + เพิ่มห้องใหม่
          </button>
        </div>
        {/* 4. ปุ่มส่ง */}
        <div className="mt-8">
          <button
            onClick={handleSubmitData}
            className="w-full py-3 bg-custom-blue text-xl text-white font-semibold rounded-xl shadow-md hover:bg-[#62bee2f3] transition duration-150 flex items-center justify-center"
          >
            บันทึกข้อมูล
          </button>
        </div>
      </div>

      {/* 🟢 2. Modal Dialog (แสดงเมื่อ isModalOpen เป็น true) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#333333] bg-opacity-80">
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              ลบข้อมูลห้อง
            </h3>
            <p className="text-gray-700 mb-6">
              คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้? การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>

            <div className="flex justify-end space-x-3">
              {/* ปุ่มยกเลิก */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 bg-gray-50 rounded-lg hover:bg-[#D1F0E5] transition"
              >
                ยกเลิก
              </button>
              {/* ปุ่มยืนยัน (ลบจริง) */}
              <button
                onClick={handleConfirmDeletion}
                className="px-4 py-2 text-sm font-semibold text-white bg-[#E8867D] rounded-xl hover:bg-[#e9978f] transition"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeterPage;
