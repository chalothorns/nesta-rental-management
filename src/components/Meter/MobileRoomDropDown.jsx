// client/src/components/Meter/MobileRoomDropDown.jsx

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // ใช้ไอคอนลูกศร

// Array ของเดือน

const MobileRoomDropDown = ({
  selectedRoom,
  onRoomChange,
  handleAddRecord,
  meterData,
}) => {
  //state สำหรับควบคุมการแสดง/ซ่อน Dropdown list
  const [isOpen, setIsOpen] = useState(false);
  //ref สำหรับอ้างอิงถึง dropdown container เพื่อตรวจจับ click outside
  const dropdownRef = useRef(null);

  const roomNames = meterData ? meterData.map((r) => r.room) : [];

  //logic สำหรับการปิด dropdown เมื่อคลิกนอกพื้นที่
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    //ผูก event listener เมื่อ component ถูก mount
    document.addEventListener("mousedown", handleClickOutside);
    //ล้าง event listener เมื่อ component ถูก unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  //handler เมื่อเลือกห้อง
  const handleRoomChange = (room) => {
    //1.เรียกใช้ prop handler เพื่ออัปเดต state ใน meterPage
    //ต้องส่ง object {target:{value:room}}เพื่อให้เข้ากับ onRoomChange ที่รับ(e)
    onRoomChange({ target: { value: room } });

    //2.ปิด dropdown
    setIsOpen(false);
  };
  return (
    //contrainer หลัก (relative เพื่อให้ list ลอยอยู่ด้านบน)
    <div className="relative block" ref={dropdownRef}>
      {/* ปุ่มหลักที่แสดงห้องที่ถูกเลือก */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full justify-between h-12 px-3 py-2 text-base font-medium rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2"
      >
        {selectedRoom ? selectedRoom : "เลือกห้อง"}
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown List(แสดงผลเมื่อ isOpen เป็น true) */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-60">
          {/* 🟢 2. วนลูปแสดงรายการห้องที่มีอยู่ */}
          {roomNames.map((room) => (
            <li
              key={room}
              onClick={() => {
                handleRoomChange(room);
              }}
              className={`px-3 py-2 text-base cursor-pointer text-gray-600 hover:bg-[#e1fcea] hover:rounded-xl my-1 mx-1 transition
                                ${
                                  selectedRoom === room
                                    ? "font-semibold text-gray-700"
                                    : "text-gray-400"
                                }
                                `}
            >
              {room}
            </li>
          ))}

          <li
            key="add_new_room"
            onClick={() => {
              setIsOpen(false);
              handleAddRecord();
            }}
            className="px-3 py-2 text-base cursor-pointer font-semibold text-custom-blue hover:bg-[#e1fcea] hover:rounded-xl my-1 mx-1"
          >
            + เพิ่มห้องใหม่
          </li>
        </ul>
      )}
    </div>
  );
};
export default MobileRoomDropDown;
