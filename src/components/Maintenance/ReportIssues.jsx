import React, { useState, useRef } from 'react';

const ReportIssues = ({isOpen, onClose, onSave}) => {
    //1.state สำหรับเก็บข้อมูล
    const [formData, setFormData] = useState({
        room:"",
        title:"",
        description:"",

    });

    const fileInputRef = useRef(null);

    //state สำหรับเก็บไฟล์ที่อัปโหลด
    const [uploadedFiles, setUploadedFiles] = useState([]);

    // 🟢ฟังก์ชันสำหรับลบไฟล์ตาม Index
    const handleDeleteFile = (indexToDelete) => {
        setUploadedFiles(prevFiles => 
            // กรอง (filter) ไฟล์ที่ไม่ใช่ index ที่ต้องการลบออก
            prevFiles.filter((_, index) => index !== indexToDelete)
        );
    };

    // 🟢 2. ฟังก์ชันสำหรับปุ่ม 'ยกเลิก' (เคลียร์ Form และไฟล์)
    const handleCancel = () => {

        // 1. เคลียร์ค่า Input File ดั้งเดิม
        if (fileInputRef.current) {
        fileInputRef.current.value = ""; // เข้าถึง Input File และตั้งค่าให้เป็นค่าว่าง (Clear)
    }
        // เคลียร์ไฟล์
        setUploadedFiles([]); 
        // เคลียร์ Form Data
        setFormData({ room: '', title: '', description: '', });
        // ปิด Form (เรียก prop onClose จาก Parent)
        onClose(); 
    };

    //handler สำหรับการเลือกไฟล์
    const handleFileChange = (e) =>{
    
        const files = Array.from(e.target.files);
        
        // 🟢 1. เคลียร์ Array เก่าออกก่อน
        setUploadedFiles([]);

        files.forEach(file => {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            // 2. เพิ่มไฟล์ใหม่เข้าไปใน State ที่ถูกเคลียร์แล้ว
            setUploadedFiles(prevFiles => [
                ...prevFiles, 
                { 
                    file: file, // ตัวไฟล์จริง
                    name: file.name,
                    previewUrl: event.target.result // URL สำหรับแสดงตัวอย่าง
                }
            ]);
        };
        
        // สั่งให้อ่านไฟล์เป็น Data URL
        reader.readAsDataURL(file); 
    });
};
  

    //2.Handler/manager สำหรับอัปเดตค่าเมื่อผู้ใช้พิมพ์เข้ามา
    const handleChange = (e)=>{ //e ในที่นี้หมายถึง event ที่ถูกส่งเข้ามาจากเบราเซอร์
        const { name,value} =e.target; //name หมายถึงหัวข้อต่างๆเช่น ห้อง หัวข้อปัญหา รายละเอียด value คือสิ่งที่อยู่ในช่อง input //e.target หมายถึง สิ่งที่เกิดการเปลี่ยนแปลงขึ้น ช่องที่ user สามารถพิมพ์เข้ามาได้
        setFormData(prev => ({...prev,[name]:value})); //หน้า +new issue ให้ pattern form ก่อนหน้ามาทุกครั้ง+input เก่าออกมา พอ user พิมพ์ข้อมูลมาใหม่ให้เอาอันเก่าออกไป
    };

    // 3. Handler เมื่อกด 'ส่งคำขอ'
    const handleSubmit = () => {
        // ตรวจสอบข้อมูลก่อนส่ง
        if (!formData.title || !formData.room || !formData.description) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
         //ส่ง form ไปที่ parent
        onSave({...formData, imageFile: uploadedFiles[0]?.file || null});

        // เคลียร์ form หลังจากส่ง
        setFormData({room:'', title:'', description:''});
        setUploadedFiles([]); // เคลียร์ State ไฟล์


    };
    const formTransitionClasses = isOpen 
        ? 'max-h-screen opacity-100 mt-4' // เมื่อเปิด: ให้ความสูงเต็มที่, แสดงผล, มี margin ด้านบน
        : 'max-h-0 opacity-0 overflow-hidden mt-0'; // เมื่อปิด: ซ่อน, ความสูงเป็น 0, ซ่อนเนื้อหาที่เกิน

    

    

    return(
        <div className={` transition-all duration-500 ease-in-out ${formTransitionClasses}`}
        >
            <div className="bg-white rounded-2xl p-6 w-full  border border-custom-blue ">
                <h2 className="font-semibold text-2xl">แจ้งปัญหาใหม่</h2>
                
                {/* 💡 Form Elements */}
                <div>
                    {/* เลือกห้อง */}
                    <label className="block text-lg font-medium mt-8">เลขห้อง *</label>
                    <select
                        name="room"
                        value={formData.room}
                        onChange={handleChange}
                        className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
                    >
                        <option value="">เลือกห้อง</option>
                        <option value="Room 101">Room 101</option>
                        <option value="House 5">House 5</option>
                        {/* ตัวเลือกห้อง เช่น <option value="Room 101">Room 101</option> */}
                    </select>
                </div>

                {/* หัวข้อปัญหา */}
                <div className="mt-6">
                    <label className="block text-lg font-medium ">หัวข้อปัญหา *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="เช่น ท่อน้ำรั่วในห้องน้ำ"
                        className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
                    />
                </div>

                {/* รายละเอียด */}
                <div className="mt-6">
                    <label className="block text-lg font-medium">รายละเอียด *</label>
                    <textarea //textarea ไม่ลองรับ type เลยต้อง name ขึ้นก่อน
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="กรุณาอธิบายปัญหาโดยละเอียด..."
                        rows="8"
                        className="w-full px-3 py-3 rounded-xl mt-2 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-custom-blue focus:outline-none focus:ring-offset-2 focus:border-gray-200"
                    />
                </div>


                {/* ... ส่วนอัปโหลดรูปภาพ ... */}
                <div className="mt-6">
                    <label className="block text-lg font-medium mb-2">อัพโหลดรูปภาพ (ถ้ามี)</label>
                    
                    {/* 💡 Dropzone Container */}
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-300 rounded-xl bg-blue-50/50 hover:bg-blue-100 cursor-pointer"
                    
    
                    onClick={() => document.getElementById('file-upload').click()}//ใช้คลิกที่ div เพื่อทริกเกอร์ input
                    > 

                    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zM15 9l-3 3-3-3m0 0l-3 3-3-3"></path> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-3-3-3 3"></path>
                    </svg>

                    <p className="mt-2 text-base text-gray-500">
                        คลิกเพื่ออัปโหลดหรือลากไฟล์มาวาง
                    </p>
                    <p className="text-sm text-gray-400">
                        PNG, JPG ขนาดไม่เกิน 10MB
                    </p>

                    {/* Input type="file" จริง ๆ (ซ่อนไว้) */}
                    <input
                        id="file-upload"
                        type="file"
                        multiple // อนุญาตให้อัปโหลดหลายไฟล์
                        accept="image/png, image/jpeg, image/jpg" // กรองเฉพาะไฟล์รูปภาพ
                        onChange={handleFileChange}
                        className="hidden" //ซ่อน Input HTML ดั้งเดิม
                        ref={fileInputRef} // เชื่อม Ref เข้ากับ Input
                    />
                </div>
                 {/* 💡 แสดงชื่อไฟล์ที่เลือกแล้ว+preview  ใช้ map เพื่อเลือกไฟล์หลายอันที่ user เลือกมาใส่ แล้วใช้ join เพื่อดึงไฟล์หลายอันเอามาเก็บเป็น string อันเดียว*/}
                 {uploadedFiles.length >0 && (
                    <p className="mt-2 text-sm text-gray-500">
                        เลือกไฟล์แล้ว:{uploadedFiles.map(f => f.name).join(', ')} 
                    </p>
                 )} 

                </div>
             
                {/* 💡 แสดงรูปภาพตัวอย่างที่ถูกเลือก */}
                <div className="mt-4 flex flex-wrap gap-3">
                    {uploadedFiles.map((fileObj, index) => (
                        <div key={index} className=" relative w-24 h-24">
            
                        <div className="w-full h-full rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                        {/* ถ้าเป็นรุปตามนามสกุลที่กำหนดมันจะโชว์รูป โดยใช้ previewUrl */}
                        {fileObj.previewUrl && (
                        <img 
                        src={fileObj.previewUrl} 
                        alt={`Preview of ${fileObj.name}`} 
                        className="w-full h-full object-cover" 
                />
            )}
            </div>
                {/* ปุ่มลบไฟล์ (X Icon) */}
                <button 
                // e.stopPropagation() ป้องกันการคลิกปุ่มนี้แล้วไปเปิด File Dialog ใหม่
                    onClick={(e) => {
                        e.stopPropagation(); 
                        handleDeleteFile(index);
                    }} 
                    className="absolute -top-2 -right-2 bg-gray-400 hover:bg-gray-500 text-white 
                            rounded-full w-10 h-10 flex items-center justify-center 
                            leading-none text-lg font-bold shadow-md transition duration-150"
                    aria-label={`Remove ${fileObj.name}`}
                >
                    &times; 
                </button>
        </div>
    ))}
</div>


                {/* 🟢 ปุ่ม Action: ส่งคำขอ และ ยกเลิก */}
                <div className="flex rows justify-center mt-4">
                    
                    <button 
                    type="button"
                    onClick={handleSubmit} 
                    className="bg-custom-blue hover:bg-[#62bee2f3] text-white mr-4 rounded-xl w-full">
                    ส่งคำขอ
                    </button>
                    
                    
                    <button 
                        type="button"
                        onClick={handleCancel}
                        className="py-2 px-4 rounded-xl hover:bg-[#ffc4c4] bg-white border-gray-300">
                    ยกเลิก
                    </button>

                </div>
            </div>
        </div>

    );
};
export default ReportIssues;