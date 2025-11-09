import React from 'react';
import { 
    ResponsiveContainer, 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend 
} from 'recharts';

// ข้อมูลสมมติ (ควรแทนที่ด้วยข้อมูลจริงจาก API ในอนาคต)
const data = [
    { month: 'May', revenue: 65000, expense: 12000 },
    { month: 'Jun', revenue: 70000, expense: 15000 },
    { month: 'Jul', revenue: 68000, expense: 10000 },
    { month: 'Aug', revenue: 75000, expense: 18000 },
    { month: 'Sep', revenue: 70000, expense: 14000 },
    { month: 'Oct', revenue: 74300, expense: 14200 },
];

const RevenueChart = () => {
    return (
        // ResponsiveContainer จะช่วยให้กราฟปรับขนาดตาม div แม่
        <div className="w-full h-[300px] md:h-96">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    {/* เส้น Grid แนวนอน */}
                    <CartesianGrid strokeDasharray="3 3"  stroke="#e0e0e0" />

                     
                    
                    {/* แกน X: เดือน */}
                    <XAxis dataKey="month" tickLine={false} axisLine={{ stroke: '#e0e0e0' }} />
                    
                    {/* แกน Y: จำนวนเงิน */}
                    <YAxis 
                        tickFormatter={(value) => `${value / 1000}k`} 
                        tickLine={false} 
                        axisLine={{ stroke: '#e0e0e0' }} 
                        domain={['dataMin', 'dataMax']}
                    />
                    
                    {/* Tooltip (ข้อความที่แสดงเมื่อเอาเม้าส์ไปชี้) */}
                    <Tooltip 
                        formatter={(value) => [`฿${value.toLocaleString()}`, 'จำนวนเงิน']} 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    
                    {/* คำอธิบายสัญลักษณ์ (Legend) */}
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />

                    {/* 🔴 เส้นรายได้ (Revenue - สีน้ำเงิน) */}
                    <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#62bee2" 
                        name="รายได้" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                    />
                    
                    {/* 🔴 เส้นค่าใช้จ่าย (Expense - สีแดง/ชมพู) */}
                    <Line 
                        type="monotone" 
                        dataKey="expense" 
                        stroke="#fa8585" 
                        name="ค่าใช้จ่าย" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;