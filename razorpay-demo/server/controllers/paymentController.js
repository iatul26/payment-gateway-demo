const Razorpay = require("razorpay");
const verifySignature = require("../utils/verifySignature");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount",
            });
        }

        const order = await razorpay.orders.create({
            amount: Number(amount) * 100, // Convert ₹ to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        res.json({
            success: true,
            order,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Order creation failed",
        });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const isValid = verifySignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (isValid) {
            return res.json({
                success: true,
                message: "Payment Verified Successfully",
            });
        }

        return res.status(400).json({
            success: false,
            message: "Payment Verification Failed",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createOrder,
    verifyPayment,
};