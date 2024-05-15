const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const OTP = require('../models/otp');

function generateOTP() {
    return crypto.randomBytes(3).toString('hex');  // Generates a 6-character hex string
}

function generateOTP_v2() {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number between 1000 and 9999
    return otp.toString();
}


router.post('/generate', async (req, res) => {
    const otp = generateOTP_v2();
    const newOTP = new OTP({ otp });
    
    try {
        await newOTP.save();
        res.status(201).send({ otp });
    } catch (error) {
        res.status(500).send({ error: 'Failed to generate OTP' });
    }
});

router.post('/verify', async (req, res) => {
    const { otp } = req.body;

    try {
        const foundOTP = await OTP.findOne({ otp });

        if (foundOTP) {
            await OTP.deleteOne({ otp });
            res.status(200).send({ message: 'OTP verified successfully' });
        } else {
            res.status(400).send({ error: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Verification failed' });
    }
});

module.exports = router;