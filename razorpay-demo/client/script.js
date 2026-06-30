const payBtn = document.getElementById("payBtn");

payBtn.addEventListener("click", async () => {

    const amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        alert("Enter a valid amount");
        return;
    }

    // Step 1: Ask backend to create an order
    const response = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
            }),
        }
    );

    const data = await response.json();

    if (!data.success) {
        alert("Unable to create order");
        return;
    }

    // Step 2: Configure Razorpay Checkout
    const options = {

        key: "rzp_test_***********3KF",

        amount: data.order.amount,

        currency: data.order.currency,

        name: "Razorpay Demo",

        description: "Learning Payment Gateway",

        order_id: data.order.id,

        handler: async function (response) {

    const verifyResponse = await fetch(
        "http://localhost:5000/api/payment/verify-payment",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response)
        }
    );

    const result = await verifyResponse.json();

    if (result.success) {

        document.getElementById("status").innerHTML =
            "✅ Payment Verified Successfully";

    } else {

        document.getElementById("status").innerHTML =
            "❌ Verification Failed";

    }

},

        prefill: {

            name: "Test User",

            email: "test@example.com",

            contact: "9999999999"
        },

        theme: {
            color: "#3399cc"
        }
    };

    const rzp = new Razorpay(options);

    rzp.open();

});
