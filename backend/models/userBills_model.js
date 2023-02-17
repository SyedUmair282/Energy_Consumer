const mongoose = require('mongoose');

const userBillSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'              
    },
    consume_units: {
        type: Number,
        required: true,               
    },
    month: {
        type: String,
        required: true,    
    },
    year: {
        type: Number,
        required: true,     
    },
    total_price: {
        type: Number,
        required: true,        
    },
    selected_slab: {
        type: String,
        required: true,       
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UserBill', userBillSchema);