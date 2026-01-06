import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import Stepper from "../components/Tenants/Stepper";
import {TenantInfo} from "../components/Tenants/TenantInfo";
import TenantCard from "../components/Tenants/TenantCard";
import { FaArrowLeft } from "react-icons/fa6";
import PaymentHistoryCard from "../components/Tenants/PaymentHistoryCard";
import { Calendar } from "lucide-react";


const TenentsPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleOpenModal = () => {
    setStep(1);
    setIsModalOpen(true);
  }

  const [view, setView] = useState("list");

  const [modalMode, setModalMode] = useState("add");

  const [tenants, setTenants] = useState([
    {id: "1", name: "John Smith", room: "101"},
    {id: "2", name: "Jane Smith", room: "102",}
  ])

  const [selectedTenant, setSelectedTenant] = useState(null);

  const [selectedTenantId, setSelectedTenantId] = useState(null);

  const handleOpenAddModal = () =>{
    setModalMode("add");
    setStep(1);
    setSelectedProfile("man");
    setIsModalOpen(true);
  }

  const [selectedProfile, setSelectedProfile] = useState("man");

  const handleOpenEditModal = (id) => {
    setSelectedTenantId(id)
    setModalMode("edit");
    setStep(1);
    setIsModalOpen(true);
  }

  

  const handleSaveTenant = (data) => {
    if (modalMode === "add") {
      const newTenant = { ...data, id: Date.now()};
      setTenants([ ...tenants, newTenant]);
    } else {
      const updatedTenants = tenants.map((t) =>
      t.id === selectedTenantId ? {...t, ...data} : t
      );
      setTenants(updatedTenants);
      
    }
    setIsModalOpen(false);
  }

  const [paymentHistory, setPaymentHistory] = useState([
    {id: "1", month: "มกราคม", amount: "8,500", type:"unpaid"},
    {id: "2", month: "กุมภาพันธ์", amount: "8,500",type:"unpaid"}
  ]);

  const handleChangeType = (id, newType) => {
    setPaymentHistory(prev => 
      prev.map(item =>
        item.id === id
        ? {...item, type: newType}
        : item
      )
    );
  };

  


  return (
    /*max-w-7xl เพื่อจำกัดความกว้างของจอ และง่ายต่อการจัดวางองค์ประกอบข้างใน*/ 
        <div className="flex flex-col  p-4 md:p-8 min-h-screen lg:max-w-7xl mb-20 md:mb-10 "> 

        <Stepper 
            step={step}
            setStep={setStep}
            isOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalMode={modalMode}
            handleSaveTenant={handleSaveTenant}
            isModalOpen={isModalOpen}
            selectedTenant={selectedTenant}
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            handleOpenAddModal={handleOpenAddModal}


            />
            
        {view === "list" ? (
          <>

           {/* -----------------------------------------Tenant Page------------------------------------------- */}
            {/* Header Area */}
            <div className="flex justify-between items-center w-full">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 ">จัดการข้อมูลผู้เช่า</h1>
                    <p className= "text-sm md:text-base text-gray-500 mt-2 md:mt-3 ">ดูแลและจัดการข้อมูลผู้เช่าทั้งหมด</p>
                </div>

            
            <button
                className="flex items-center bg-custom-blue hover:bg-[#62bee2f3] text-white md:text-lg font-medium md:py-4 md:px-14 rounded-xl shadow-md transition duration-150"
                onClick={handleOpenAddModal}
            >
                + เพิ่มผู้เช่าใหม่
            </button>
        </div>

            <div className="relative mb-4 mt-4">
              <div className="absolute inset-y-0 left-0 -bottom-1 flex items-center pl-3">
                <LuSearch className="w-5 h-5 text-[#53b8e0] mr-3" /> 
              </div>
                    <input 
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="ค้นหาชื่อหรือห้อง..."
                    /*focus:ring เอาไว้เพิ่มวงแหวนหรือกรอบเพื่อเน้น input/ focus:ring-offset-2 คือสั่งให้วงแหวน เยื้องออกมาจากขอบ 2px ทำให้เกิดช่องว่างระหว่าง Focus Border และ Focus Ring*/
                    className="w-full md:w-1/3 px-10 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
                    />
              </div>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {tenants.map((t) => (
            <TenantCard 
              key={t.id}
              id={t.id}
              name={t.name}
              room={t.room}
              onClickDetail={() =>{
                setSelectedTenant(t);
                setView("detail")
              }}
              /> 
              ))}
              </div>
              </>
        ):( 

          //  ------------------------------------------Tenant Detail------------------------------------------
            <div className="mb-20 mx-auto">
          <button className="flex mb-8 mt-2 px-4 py-2 w-fit cursor-pointer rounded-xl border border-gray-300 bg-gray-50 text-black hover:bg-[#D1F0E5] transition"
                  onClick={() => setView("list")}
          >
                  <FaArrowLeft className="w-5 h-5 text-[#53b8e0] mr-2" />
                  <p className="text-base  text-gray-700">กลับไปหน้ารายชื่อผู้เช่า</p>
                </button>

          <div className="mb-4">
          <TenantInfo 
          modalMode={modalMode}
          handleOpenEditModal={handleOpenEditModal}

          />
          </div>

          {/* -------------------------payment history---------------------- */}
      <div className="shadow-lg rounded-2xl p-10 border-2 ">
        <div className="md:flex md:justify-between">
          <div className="flex items-center mb-6 ">
            <Calendar className="w-6 h-6 text-[#53b8e0] mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">
              ประวัติการชำระเงิน
            </h2>
          </div>
          {/* Input สำหรับปี */}
          <div className="font-semibold mb-6">
            ปี (ค.ศ.):
            <input
              type="text"
              name="title"
              placeholder="เช่น ปี 2025"
              className="px-3 py-2 w-32 rounded-xl ml-5 font-medium bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 justify-center md:justify-center">
            {paymentHistory.map((p) => (
              <PaymentHistoryCard
              key={p.id}
              month={p.month}
              type={p.type}
              amount={p.amount}
              onPaid={() => handleChangeType(p.id, "paid")}
              onOverdue={() => handleChangeType(p.id, "overdue")}
            
          />
            ))}

        </div>
      </div>
            </div>
        )}
            </div>

        
  );
};

export default TenentsPage;


