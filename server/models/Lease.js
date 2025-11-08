// File: server/models/Lease.js

const mongoose = require('mongoose');

// --- 1. Define the Schema (นิยามรูปแบบข้อมูล) ---
const LeaseSchema = new mongoose.Schema({
    // ไม่ต้องมี _id เพราะ Mongoose จัดการให้เอง

    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    property: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Property', 
        required: true 
    },
    monthlyRent: { 
        type: Number, 
        required: true 
    },
    depositAmount: { 
        type: Number, 
        required: true 
    },
    rentDueDate: { 
        type: Number, 
        default: 5 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        default: null 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    type: { 
        type: String, 
        enum: ['Residential', 'Commercial'], 
        default: 'Residential' 
    },
    isRenewable: { 
        type: Boolean, 
        default: true 
    },
    leaseDocumentUrl: { 
        type: String, 
        default: null 
    }
}, {
    timestamps: true // ✅ ใส่ timestamps ที่นี่
});

// --- 2. Export the Mongoose Model ---
module.exports = mongoose.model('Lease', LeaseSchema);