import React from 'react';
// Import Icon ที่จะใช้
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'; 

const FinanceStatCard = ({ title, value, period, type }) => { 
    
    // 1. Logic Mapping เพื่อกำหนดสีและ Icon ตาม Type
    const typeMapping = {
        revenue: { 
            bg: 'bg-[#74b0ce15]', // สีพื้นหลัง Card (อ่อน)
            text: 'text-[#62bee2]', // สีตัวอักษร/ตัวเลข (เข้ม)
            icon: TrendingUp, 
            badgeBg: 'bg-[#5fbfe6]', // สีพื้นหลัง Badge 
            badgeText: 'text-white', // สีตัวอักษร Badge
            borderColor: 'border-[#cbeaf7]'
        },
        expense: { 
            bg: 'bg-[#fac7c729]', 
            text: 'text-[#fa8585]', 
            icon: TrendingDown, 
            badgeBg: 'bg-red-500', 
            badgeText: 'text-white',
            borderColor: 'border-[#fa858544]'
        },
        profit: { 
            bg: 'bg-[#bafcd014]', 
            text: 'text-gray-800', 
            icon: DollarSign, 
            badgeBg: 'bg-green-500', 
            badgeText: 'text-white',
            borderColor: 'border-[#96e2c2]'
        },
        default: { 
            bg: 'bg-gray-100', 
            text: 'text-gray-700', 
            icon: DollarSign, 
            badgeBg: 'bg-gray-500', 
            badgeText: 'text-white'
        },
    };

    const currentType = typeMapping[type] || typeMapping.default;
    const IconComponent = currentType.icon; 

    // 2. JSX สำหรับ Card ที่สมบูรณ์
    return (
        // บรรทัดนี้คือกรอบของกล่อง 3 กล่อง สี แสง เงา
        <div className={`p-10 ml-5 md:block rounded-xl shadow-lg  border ${currentType.borderColor} ${currentType.bg}`}>
            {/* บรรทัดนี้สำหรับกำหนดระยะของกล่อง */}
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-lg font-medium text-black">{title}</h3>
                    <p className={`mt-1 text-3xl font-bold ${currentType.text}`}>{value}</p>
                </div>
                {/* Icon */}
                <div className="p-2">
                    <IconComponent className={`h-6 w-6 ${currentType.text}`} />
                </div>
            </div>
            
            {/* 3. การแสดงผล Type เป็น Badge */}
            <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-500">{period}</p>
                
                {/*  ส่วนของ Badge */}
                <span className={`
                    px-2 py-0.5 text-xs font-medium 
                    rounded-full uppercase tracking-wider 
                    ${currentType.badgeBg} ${currentType.badgeText}
                `}>
                    {type}
                </span>
            </div>
        </div>
    );
};

export default FinanceStatCard; //ต้องเขียน export เพื่อให้ Finance Page เราสามารถ import ได้