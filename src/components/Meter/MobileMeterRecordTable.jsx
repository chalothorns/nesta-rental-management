import React from "react";

//รับ props เหมือน MeterRecord ตัวเดิม
const MobileMeterRecordTable = ({
  record,
  activeTab,
  onRecordChange,
  onDeleteCheck,
  selectedMonth,
  prevMonthName,
  meterData
}) => {

    const roomData = meterData.find(m => m.id === record.id)
    const currentMonthData = roomData.monthlyRecords?.[selectedMonth] || {};
    const prevMonthData = roomData.monthlyRecords?.[prevMonthName] || {};


  const currentField =
    activeTab === "electric" ? "currentElectric" : "currentWater";

    const displayPrevValue = prevMonthData[currentField] || 0;
    const displayValue = currentMonthData[currentField] || "";

  
  const prevValue = Number(displayPrevValue) || 0;
  const currentValue = Number(displayValue) || 0;

  // คำนวณหน่วยที่ใช้ (ถ้าค่าปัจจุบันน้อยกว่าครั้งก่อน หรือยังไม่ได้กรอก ให้เป็น '-')
 const usage = (currentValue > 0 && currentValue >= prevValue) ? currentValue - prevValue : "-";

  // 🟢 2. ตรวจสอบเงื่อนไขการลบ: ถ้า currentValue มากกว่า 0
  const hasData = currentValue > 0;

  // 🟢 3. Handler หลักเมื่อกดปุ่ม 'X'
  const handleDeleteClick = () => {
    // ส่ง ID ของแถว และสถานะ hasData กลับไปให้ MeterPage จัดการ Modal
    onDeleteCheck(record.id, hasData);
  };

  return (
    <div className="p-6 rounded-xl border border-gray-200 grid grid-cols-1 relative mb-4">
      <div className="flex justify-between items-start ">
        <div className="text-sm text-gray-500">
          เลขห้อง:
          <span className="text-lg font-bold text-black">
            {" "}
            {record.room ? record.room : ""}
          </span>
        </div>
        
      </div>
      
        <p className="text-sm text-gray-500">
          ผู้เช่า:
          <span className="text-lg font-medium">
            {" "}
            {record.name ? record.name : ""}
          </span>
        </p>

      <div className=" text-sm text-center ">
        <button
          onClick={handleDeleteClick}
          className="bg-white text-gray-700 absolute top-2 right-2 font-bold rounded-xl hover:text-[#fa8585] transition hover:bg-[#fa858544]"
        >
          X
        </button>
        
      </div>

      <div className="py-4">
        <div className="mb-2 text-sm">เลขมิเตอร์ครั้งก่อน ({prevMonthName})</div>
                <input
                    type="number"
                    value={displayPrevValue}
                    readOnly 
                    onChange={() => {}}
                    className="w-full h-12 px-2 py-1 text-base text-left bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none focus:border-gray-200 focus:ring-offset-2 focus:ring-2 focus:ring-custom-blue"
                />
           
           
         </div> 

         <div>
            <div className="mb-2 text-sm ">เลขมิเตอร์ครั้งนี้</div>
                <input
                    type="number"
                    value={displayValue}
                    onChange={(e) => onRecordChange(record.id, selectedMonth, currentField, e.target.value)}
                    placeholder="กรอกเลข"
                    className="w-full h-12 px-2 py-1 text-base text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
                />

                 </div>
                
                <div className="flex justify-between py-3 border-xl border-t-2 border-t-[#E1F1FA] border-blue-200 mt-4">
                <div className="font-bold ">หน่วยที่ใช้:</div>
                <div className="text-xl font-bold text-custom-blue ">{usage}</div>
                
           </div>
    </div>

    
  );
};

export default MobileMeterRecordTable;


// focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2