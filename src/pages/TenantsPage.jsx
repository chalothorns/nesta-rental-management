import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import Stepper from "../components/Tenants/Stepper";
import { TenantInfo } from "../components/Tenants/TenantInfo";
import TenantCard from "../components/Tenants/TenantCard";
import { FaArrowLeft } from "react-icons/fa6";
import PaymentHistoryCard from "../components/Tenants/PaymentHistoryCard";
import { Calendar } from "lucide-react";
import axios from "axios";

const TenentsPage = () => {
  const apiBase = import.meta.env.VITE_API_URL;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [tenantIdToDelete, setTenantIdToDelete] = useState(null);
  const [view, setView] = useState("list");
  const [tenants, setTenants] = useState([]);

  const handleModalDelete = (tenantId) => {
    setTenantIdToDelete(tenantId);
    setOpenDeleteModal(true);
  };

  const handleConfirmDeletion = async () => {
    if (tenantIdToDelete) {
      try {
        await axios.delete(`${apiBase}/${tenantIdToDelete}`);

        const updatedTenants = tenants.filter(
          (tenant) => tenant._id !== tenantIdToDelete
        );
        setTenants(updatedTenants);

        if (selectedTenant?._id === tenantIdToDelete) {
          setView("list");
          setSelectedTenant(null);
        }
        console.log("ลบข้อมูลสำเร็จ");
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการลบ:", error);
        alert("ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่");
      }
    }
    setOpenDeleteModal(false);
    setTenantIdToDelete(null);
  };

  const [selectedTenant, setSelectedTenant] = useState(null);

  const emptyTenant = {
    // ข้อมูลพื้นฐาน (Required ใน Schema)
    title: "นาย", // ตั้งค่าเริ่มต้นให้ตรงกับ enum ตัวใดตัวหนึ่ง
    name: "",
    nickname: "",
    phone: "",
    idCardNumber: "",
    birthDate: "",
    contractStartDate: "",
    depositAmount: 0,
    currentAddress: "",

    email: "",
    facebook: "",
    lineId: "",
    workplace: "",
    department: "",
    position: "",

    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",

    vehicleType: "",
    licensePlate: "",
    vehicleDetails: "",

    profile: "man",
  };

  const [modal, setModal] = useState({
    isOpen: false,
    mode: "add", // add | edit
    step: 1,
    tenant: emptyTenant,
  });

  const openAddModal = () => {
    setModal({
      isOpen: true,
      mode: "add",
      step: 1,
      tenant: emptyTenant,
    });
  };

  const openEditModal = (tenant) => {
    setModal({
      isOpen: true,
      mode: "edit",
      step: 1,
      tenant: tenant,
    });
  };

  const [paymentHistory, setPaymentHistory] = useState([
    { id: "1", month: "มกราคม", amount: "8,500", type: "unpaid" },
    { id: "2", month: "กุมภาพันธ์", amount: "8,500", type: "unpaid" },
  ]);

  const handleChangeType = (id, newType) => {
    setPaymentHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, type: newType } : item))
    );
  };

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get(apiBase);
        setTenants(response.data?.data || []);
      } catch (error) {
        console.error("ไม่สามารถดึงข้อมูลได้:", error);
      }
    };
    fetchTenants();
  }, [apiBase]);

  const handleSaveTenant = async (tenantData) => {
    try {
      if (modal.mode === "add") {
        const response = await axios.post(apiBase, tenantData);
        setTenants((prev) => [...prev, response.data.data]);
      } else {
        const tenantId = tenantData._id;
        const response = await axios.patch(
          `${apiBase}/${tenantId}`,
          tenantData
        );
        const newData = response.data.data;

        setTenants((prev) =>
          prev.map((t) => (t._id === tenantData._id ? newData : t))
        );
        setSelectedTenant(newData);
      }

      // ปิด modal
      setModal((prev) => ({
        ...prev,
        isOpen: false,
        mode: "add",
        step: 1,
        tenant: emptyTenant,
      }));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "บันทึกไม่สำเร็จ");
    }
  };

  return (
    /*max-w-7xl เพื่อจำกัดความกว้างของจอ และง่ายต่อการจัดวางองค์ประกอบข้างใน*/
    <div className="flex flex-col  p-4 md:p-8 min-h-screen lg:max-w-7xl mb-20 md:mb-10 ">
      <Stepper
        key={modal.tenant?._id || "new"}
        modal={modal}
        setModal={setModal}
        onSave={() => handleSaveTenant(modal.tenant)}
      />

      {view === "list" ? (
        <>
          {/* -----------------------------------------Tenant Page------------------------------------------- */}
          {/* Header Area */}
          <div className="flex justify-between items-center w-full">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 ">
                จัดการข้อมูลผู้เช่า
              </h1>
              <p className="text-sm md:text-base text-gray-500 mt-2 md:mt-3 ">
                ดูแลและจัดการข้อมูลผู้เช่าทั้งหมด
              </p>
            </div>

            <button
              className="flex items-center bg-custom-blue hover:bg-[#62bee2f3] text-white md:text-lg font-medium md:py-4 md:px-14 rounded-xl shadow-md transition duration-150"
              onClick={openAddModal}
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
              className="w-full md:w-1/3 px-10 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
            />
          </div>
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {tenants.map((t) => (
              <TenantCard
                key={t._id}
                id={t._id}
                tenant={t}
                onDelete={() => handleModalDelete(t._id)}
                onClickDetail={() => {
                  setSelectedTenant(t);
                  setView("detail");
                }}
              />
            ))}
          </div>

          {/* 🔴 แสดง openDeleteModal */}
          {openDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#333333] bg-opacity-80">
              <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  ลบข้อมูลผู้เช่า
                </h3>
                <p className="text-gray-700 mb-6">
                  คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?
                  การกระทำนี้ไม่สามารถย้อนกลับได้
                </p>

                <div className="flex justify-end space-x-3">
                  {/* ปุ่มยกเลิก */}
                  <button
                    onClick={() => setOpenDeleteModal(false)}
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
        </>
      ) : (
        //  ------------------------------------------Tenant Detail------------------------------------------
        <div className="mb-20 mx-auto">
          <button
            className="flex mb-8 mt-2 px-4 py-2 w-fit cursor-pointer rounded-xl border border-gray-300 bg-gray-50 text-black hover:bg-[#D1F0E5] transition"
            onClick={() => setView("list")}
          >
            <FaArrowLeft className="w-5 h-5 text-[#53b8e0] mr-2" />
            <p className="text-base  text-gray-700">กลับไปหน้ารายชื่อผู้เช่า</p>
          </button>

          <div className="mb-4">
            <TenantInfo
              tenant={selectedTenant}
              handleOpenEditModal={openEditModal}
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
                  className="px-3 py-2 w-32 rounded-xl ml-5 font-medium bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
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
