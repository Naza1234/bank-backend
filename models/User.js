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

// Encrypt password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('Password')) return next();
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
});

UserSchema.pre('findOneAndUpdate', async function(next) {
    // Check if the password is being updated
    if (this._update.Password) {
        const password = this._update.Password;
         // Only hash the password if it's been updated
        this._update.Password = await bcrypt.hash(password, 10);
    }
    next();
});


module.exports = mongoose.model('User', UserSchema);
