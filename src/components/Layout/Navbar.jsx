// client/src/components/Layout/Narbar.jsx

import React, { useState } from 'react';

const Narbar = ({adminUser, authLoading, authError, login, logout}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const ok = await login({ email, password });

    setSubmitting(false);

    if (ok) {
      setEmail("");
      setPassword("");
    }
  };
    return (
        // fixed top-0 w-full z-10 ส่วนนี้เป็นส่วนกรอบด้านบนกล่องใหญ่ กล่องเล็กลงมาเอาไว้กำหนด
        //lg:left-64 คือข้อความจะถูกเขยิบไปทางซ้าย 64px และ ขนาดจอ lg ขึ้นไป lg:w-[calc(100%-16rem)] ความกว้างของจอทั้งหมด 100%จะถูกลบด้วย 16rem หรือ w-64 เพื่อให้ข้อความ ระบบจัดการห้องเช่า ไม่ถูก sidebar ทับจนมองไม่เห็น
        <nav className="fixed top-0 left-0 w-full h-16 bg-white border-b shadow-md z-10 lg:left-64 lg:w-[calc(100%-16rem)] mb-4">
             <div className="justify-between flex items-center h-full px-4 lg:px-6">


                {/* 2. ชื่อระบบ (Title) */}
                <div className="justify-betweentext-xl font-bold text-gray-800 hidden md:block">
                    ระบบจัดการห้องเช่า
                </div>
                <div className="text-2xl font-bold text-gray-800 md:hidden">
                    {adminUser ? "NESTA 🏡" : null}
                    
                </div>

                <div>
                    {authLoading ? (
            <span className="text-base">กำลังตรวจสอบสิทธิ์...</span>
          ) : adminUser ? (
            <>
              <span className="text-base">
                {adminUser.username}
              </span>
              <button onClick={logout} className="ml-4 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-xl text-base">Logout</button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-x-2">
              <div className="relative">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required
                type="email"
                className="bg-white text-black px-2 rounded-xl border text-base w-44"
              />
              </div>
              

              
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                type="password"
                minLength={8}
                className="bg-white text-black px-2 rounded-xl border text-base w-32"
              />
              <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer bg-[#646cff] hover:bg-[#7279fd] disabled:bg-sky-300 text-white px-3 py-1 rounded-xl text-base"
              >Login
              </button>
              {authError ? (<div className="absolute top-full ml-2 -mt-2 text-red-500 ">{authError}</div>) : null}
            </form>
          )}
                </div>
                
            </div>
            
        </nav>
    );
};

export default Narbar;

