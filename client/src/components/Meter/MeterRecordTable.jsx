// src/components/Meter/MeterRecordTable.jsx
import React from 'react';
import MeterRecord from './MeterRecord';

const MeterRecordTable = ({meterData, activeTab, onRecordChange, selectedMonth, onDeleteRecord}) =>{


    return(
        <div className="bg-white shadow-md rounded-lg p-4 mt-6 ">

            <div className="overflow-x-auto">
                <table className=" min-w-full divide-y divide-gray-200 text-gray-500 text-sm">

                    {/* 🟢 ส่วนหัวตาราง (Thead) */}
                    <thead>
                        <tr>
                            <th>ห้อง</th>
                            <th>ผู้เช่า</th>
                            {/* 💡 Table Header จะแสดงผลเหมือนกัน แต่ข้อมูลในแถวจะต่างกัน */}
                            <th>ครั้งก่อน({selectedMonth})</th>
                            <th>ครั้งนี้</th>
                            <th>หน่วยที่ใช้</th>
                            <th>ลบ</th>
                            
                        </tr>
                    </thead>
                    {/* 🟢 ส่วนเนื้อหาตาราง (Tbody): ต้องเป็น Sibling ของ Thead */}
                    <tbody>
                        {/* 🟢 วนลูปสร้างแถว */}
                        {meterData && meterData.map(record => (
                            <MeterRecord
                                key={record.id} // 💡 ต้องมี key!
                                record={record}
                                activeTab={activeTab}
                                onRecordChange={onRecordChange}
                                onDelete={onDeleteRecord}
                            />
                        ))}
                    </tbody>

                </table>
            </div>
        </div>

    );
};

export default MeterRecordTable;