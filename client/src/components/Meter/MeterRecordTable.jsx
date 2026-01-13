// src/components/Meter/MeterRecordTable.jsx
// client/src/components/Meter/MeterRecordTable.jsx

import React from 'react'; 
import MeterRecord from './MeterRecord'; 
import MobileMeterRecordTable from './MobileMeterRecordTable'; 



const MeterRecordTable = ({meterData, activeTab, onRecordChange, selectedMonth, onDeleteCheck, prevMonthName}) =>{




    return(

        <div>

        {/* 💻 ตารางสำหรับ Desktop/Tablet: ซ่อนบน Mobile */}
        <div className=" bg-white shadow-md rounded-lg p-4 mt-6 hidden md:block">

            <div className="overflow-x-auto p-5">
                <table className="min-w-full divide-y divide-gray-200 text-gray-500 text-sm ">


                    {/* 🟢 ส่วนหัวตาราง (Thead) desktop */}
                    <thead>
                        <tr>
                            <th className="px-3 py-2 text-left">ห้อง</th>
                            <th className="px-3 py-2 text-left">ผู้เช่า</th>
                            {/* 💡 Table Header จะแสดงผลเหมือนกัน แต่ข้อมูลในแถวจะต่างกัน */}
                            <th >ครั้งก่อน({prevMonthName})</th>
                            <th className="px-3 py-2 text-center">ครั้งนี้</th>
                            <th>หน่วยที่ใช้</th>
                            <th>ลบ</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {/* 🟢 วนลูปสร้างแถว */}
                        {meterData && meterData.map(record => (
                            <MeterRecord
                                key={record.id} // 💡 ต้องมี key!
                                record={record}
                                activeTab={activeTab}
                                onRecordChange={onRecordChange}
                                onDeleteCheck={onDeleteCheck}
                                meterData={meterData}
                                selectedMonth={selectedMonth}
                                prevMonthName={prevMonthName}
                            />
                        ))}
                    </tbody>
                </table>
               </div> 
            </div>
               
                
                    
            </div>
            

    );
};


export default MeterRecordTable;

