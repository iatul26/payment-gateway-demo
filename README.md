# 💳 Razorpay Payment Gateway Integration Demo

A full-stack payment gateway integration demo built using **Node.js**, **Express.js**, **MongoDB Atlas**, and **Razorpay Test Mode**.

This project demonstrates how a secure online payment flow works—from creating an order, opening the Razorpay Checkout, verifying the payment signature, and storing payment details in a MongoDB database.

> **Note:** This project uses **Razorpay Test Mode**. No real money is deducted during transactions.

---

## 🚀 Features

- ✅ Razorpay Test Mode integration
- ✅ Create payment orders using Razorpay Orders API
- ✅ Secure payment signature verification
- ✅ MongoDB Atlas integration
- ✅ Payment lifecycle tracking
- ✅ Store payment records in database
- ✅ REST API backend with Express.js
- ✅ Simple frontend for testing payments

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Payment Gateway
- Razorpay

---

# 📂 Project Structure

```
razorpay-demo/
│
├── client/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server/
│   ├── config/
│   │   ├── db.js
│   │   └── razorpay.js
│   │
│   ├── controllers/
│   │   └── paymentController.js
│   │
│   ├── models/
│   │   └── Payment.js
│   │
│   ├── routes/
│   │   └── payment.js
│   │
│   ├── utils/
│   │   └── verifySignature.js
│   │
│   ├── app.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# 🔄 Payment Flow

```
Customer
    │
    ▼
Frontend
    │
    ▼
Express Backend
    │
    ▼
Create Razorpay Order
    │
    ▼
Store Order in MongoDB
(Status = Created)
    │
    ▼
Open Razorpay Checkout
    │
    ▼
Customer Completes Payment
    │
    ▼
Verify Razorpay Signature
    │
    ▼
Update MongoDB
(Status = Paid)
```

---

# 📦 Database Schema

```javascript
{
    orderId,
    paymentId,
    signature,
    amount,
    currency,
    status,
    createdAt,
    updatedAt
}
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/iatul26/razorpay-demo.git
```

---

## 2. Navigate to the server

```bash
cd server
```

---

## 3. Install dependencies

```bash
npm install
```

---

## 4. Create a `.env` file

```env
PORT=5000

RAZORPAY_KEY_ID=your_test_key_id

RAZORPAY_KEY_SECRET=your_test_secret

MONGODB_URI=your_mongodb_connection_string
```

---

## 5. Start the backend

```bash
npm run dev
```

Expected output:

```
✅ MongoDB Connected
🚀 Server running on port 5000
```

---

## 6. Start the frontend

Open the frontend (`index.html`) using **Live Server** (or any static web server).

---

# 💳 Testing Payments

Use Razorpay **Test Mode**.

Enter any payment amount.

Click **Pay Now**.

Complete the payment using Razorpay's test checkout flow.

After successful payment:

- Signature is verified
- Payment is marked as **Paid**
- MongoDB document is updated

---

# 📡 API Endpoints

## Create Order

```
POST /api/payment/create-order
```

Creates a new Razorpay order.

---

## Verify Payment

```
POST /api/payment/verify-payment
```

Verifies the payment signature and updates the payment status.

---

## Get Payments

```
GET /api/payment/payments
```

Returns all stored payment records.

---

# 🔒 Security Features

- Server-side Razorpay Signature Verification
- Secret keys stored using environment variables
- MongoDB Atlas cloud database
- Input validation for payment amount
- Payment lifecycle tracking

---

# 📚 Learning Outcomes

This project demonstrates:

- Payment Gateway Integration
- REST API Development
- MongoDB CRUD Operations
- Mongoose Models
- Secure Payment Verification
- Environment Variable Management
- Express.js Routing
- Client-Server Communication
- Cloud Database Integration

---

# 🚀 Future Improvements

- Razorpay Webhooks
- User Authentication (JWT)
- Order Management System
- Admin Dashboard
- Payment History
- Invoice Generation
- Refund Support
- Deployment (Vercel + Render)

---

# 📄 License

This project is created for educational and learning purposes.
