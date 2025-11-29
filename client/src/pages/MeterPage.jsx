// client/src/pages/MeterPage.jsx เอาไว้จัดวาง component ย่อยๆและ usestate จาก compo
import React, {useState} from 'react';
import MeterHeader from '../components/Meter/MeterHeader';
import MeterRecordTable from '../components/Meter/MeterRecordTable';

const DUMMY_DATA = [{id: '1', 
        room: 'ห้อง 101', 
        name: 'Mr. Somsak', 
        // 🟢 ต้องมี Key เหล่านี้ (แม้ค่าจะเป็น 0 หรือ null)
        prevElectric: 0, 
        currentElectric: 1300, 
        prevWater: 50,
        currentWater: 80}];

        const DEFAULT_NEW_RECORD = {
    // ต้องให้ ID ที่ไม่ซ้ำกัน (อาจใช้ Date.now() หรือ library uuid)
        id: Date.now().toString(), 
        room: 'ห้องใหม่', 
        name: 'ผู้เช่าใหม่', 
        prevElectric: 0, 
        currentElectric: 0, 
        prevWater: 0,
        currentWater: 0
    };

const MeterPage = () => {
    // state สำหรับใช้คุมแท็บที่ใช้งานอยู่
    const [activeTab, setActiveTab] = useState('electric')

    //state สำหรับข้อมูลมิเตอร์ทั้งหมด (เก็บรวมกัน)
    const [meterData, setMeterData] = useState(DUMMY_DATA); 

    const [currentMonth, setCurrentMonth] = useState('มกราคม');
    const [currentYear, setCurrentYear] = useState('');

    //ฟังก์ชัน add ห้องใหม่
    const handleAddRecord = () => {
        const newRecord = {
            ...DEFAULT_NEW_RECORD,
            // 💡 สำคัญ: สร้าง ID ใหม่ทุกครั้งที่เรียกใช้
            id: Date.now().toString(), 
            room: `ห้อง ${meterData.length + 1}` // ตั้งชื่อห้องง่ายๆ ตามจำนวนที่มี
        };

        // 💡 ใช้ setMeterData เพื่อเพิ่ม record ใหม่เข้าไปใน array เดิม
        setMeterData(prevData => [...prevData, newRecord]);
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

    const handleRecordChange = (id, field, value) => {
        setMeterData(prevData =>
            //return array ใหม่ ที่ถูก map() แล้ว
            prevData.map(record => {
                //ถ้าไอดีตรงกับห้องที่กรอกข้อมูล
                if(record.id === id) {
                    return {
                        ...record,
                        [field]:value
                    };
            }
            return record;

    })
        );
    };

    return (
        /*max-w-7xl เพื่อจำกัดความกว้างของจอ และง่ายต่อการจัดวางองค์ประกอบข้างใน*/ 
        <div className="flex flex-col  gap-6 p-4 md:p-8 w-full  mb-20 md:mb-0"> 
            <h1 className="text-3xl font-bold text-gray-900 ">บันทึกมิเตอร์ </h1>
            <p className= "text-gray-500 -mt-3">บันทึกข้อมูลมิเตอร์ไฟฟ้าและน้ำประปา</p>

            {/* Layout หลักใช้ Grid หรือ Flexbox เพื่อจัดองค์ประกอบ */}
            <div className="space-y-6 md:w-2/3 md:ml-6  bg-white p-6 rounded-xl shadow-lg border border-gray-200"> {/* ใช้ space-y-6 จัดช่องว่างระหว่าง Component max-w ใช้ค่านี้เพื่อจำกัดความกว้าง mx-auto อันนี้คือให้ระบบ auto margin ซ้ายขวาให้*/}
                
                {/* MeterHeader */}
                <MeterHeader selectedMonth={currentMonth} 
                             selectedYear={currentYear} 
                             onMonthChange={handleMonthChange}
                             onYearChange={handleYearChange}
                             />

                {/* ส่วน Tab Navigation */}
               
                <div className="flex bg-gray-100 p-1 rounded-lg border-gray-200 mb-6  ">
                    {/* ปุ่มสำหรับมิเตอร์ไฟฟ้า */}
                    <button
                        onClick={() => handleTabChange('electric')}
                        // flex-1: Class นี้สั่งให้ปุ่มทั้งสอง ยืดขยาย ออกไปใช้พื้นที่ที่เหลือทั้งหมดใน Container อย่างเท่าเทียมกัน (50% / 50%)
                        className={`px-4 py-3 text-xl font-medium transition duration-150 flex-1 ${activeTab ==='electric'
                            ? 'bg-white shadow-sm text-gray-800' //Active style
                            : 'text-gray-500  bg-gray-100' //Inactive style
                           }
                        `}
                    >
                        ⚡ บันทึกมิเตอร์ไฟฟ้า
                    </button>
                    {/* ปุ่มสำหรับมิเตอร์น้ำ */}
                    <button 
                        onClick={() => handleTabChange('water')}
                            className={`px-4 py-3 text-xl font-medium transition duration-150 flex-1
                                ${activeTab ==='water'
                                ? 'bg-white shadow-sm text-gray-800' //Active style
                                : 'text-gray-500  bg-gray-100' //Inactive style
                           }
                        `}
                    >
                        💧 บันทึกมิเตอร์น้ำ
                    </button>
                    

                </div>
                
                {/* หน้า MeterRecordTable */}
                <MeterRecordTable
                    meterData={meterData}
                    activeTab={activeTab} //ตัวควบคุมการแสดงผลในตาราง
                    onRecordChange={handleRecordChange}
                    selectedMonth={currentMonth}
                />

                {/* เพิ่มปุ่ม "เพิ่มห้องใหม่" และผูกกับ Handler */}
                <div className="mt-4">
                    <button
                        onClick={handleAddRecord}
                        className="py-2 px-4 text-sm font-semibold text-blue-600 border border-blue-400 rounded-lg hover:bg-blue-50 transition-150 flex items-center"
                        >
                            + เพิ่มห้องใหม่
                        </button>
                </div>
                
                {/* 4. ปุ่มส่ง */}
                <div className="mt-8">
                    <button className="w-full py-3 bg-custom-blue text-xl text-white font-semibold rounded-lg shadow-md hover:bg-[#62bee2f3] transition duration-150 flex items-center justify-center">
                        
                        บันทึกข้อมูล 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MeterPage;