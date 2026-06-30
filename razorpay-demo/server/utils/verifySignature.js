const crypto = require("crypto");

function verifySignature(orderId, paymentId, razorpaySignature) {

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(orderId + "|" + paymentId)
        .digest("hex");

    return generatedSignature === razorpaySignature;
}

module.exports = verifySignature;