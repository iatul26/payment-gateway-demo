const razorpay = require("../config/razorpay");
const verifySignature = require("../utils/verifySignature");
const Payment = require("../models/Payment");

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

    await Payment.create({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: "Created",
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

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Payment Verification Failed",
            });
        }

        const payment = await Payment.findOne({
            orderId: razorpay_order_id,
        });

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        payment.paymentId = razorpay_payment_id;
        payment.signature = razorpay_signature;
        payment.status = "Paid";

        await payment.save();

        return res.json({
            success: true,
            message: "Payment Verified Successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
  createOrder,
  verifyPayment,
};
