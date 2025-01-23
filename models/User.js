const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    AccountName: { type: String, required: true },
    PhoneNo: { type: String, required: true },
    userName: { type: String, required: true },
    AccountType: { type: String, required: true },
    AccountBalance: { type: Number, default: 0 },
    AccountNumber: { type: String, unique: true, required: true },
    RoutingNumber: { type: String, required: true },
    InterestRate: { type: Number, default: 0 },
    InterestIn2024: { type: Number, default: 0 },
    LastStatementDate: {type: String, required: true },
    AvailableBalance: { type: Number, default: 0 },
    PresentBalance: { type: Number, default: 0 },
    Password: { type: String, required: true },
}, { timestamps: true });




module.exports = mongoose.model('User', UserSchema);
