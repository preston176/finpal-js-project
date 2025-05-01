// server/routes/mpesaCallback.js
const express = require('express');
const router = express.Router();

router.post('/mpesa/callback', (req, res) => {
    const callbackData = req.body;

    console.log("MPESA Callback:", JSON.stringify(callbackData, null, 2));

    const resultCode = callbackData.Body.stkCallback.ResultCode;
    const resultDesc = callbackData.Body.stkCallback.ResultDesc;

    if (resultCode === 0) {
        // Transaction was successful
        const amount = callbackData.Body.stkCallback.CallbackMetadata.Item.find(
            item => item.Name === "Amount"
        ).Value;

        const phone = callbackData.Body.stkCallback.CallbackMetadata.Item.find(
            item => item.Name === "PhoneNumber"
        ).Value;

        // ✅ Save to DB or perform business logic here
        console.log(`Success! Amount: ${amount}, Phone: ${phone}`);
    } else {
        // Transaction failed
        console.log("Transaction Failed:", resultDesc);
    }

    res.status(200).json({ message: "Callback received successfully" });
});



module.exports = router;

