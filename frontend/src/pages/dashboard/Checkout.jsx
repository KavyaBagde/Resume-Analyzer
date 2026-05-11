import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/common/Button";
import { addCredits } from "../../services/billingApi";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
import { toastService } from "../../services/toastService";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const plan = state?.plan;

  if (!plan) {
    return <div className="p-10 text-center">Invalid plan selection</div>;
  }

  const dispatch = useDispatch();

  const handlePayment = async () => {
    setLoading(true);

    const paymentPromise = new Promise(async (resolve, reject) => {
      await new Promise((res) => setTimeout(res, 1500));

      const success = Math.random() > 0.2;

      if (!success) {
        reject("Payment failed");
        return;
      }

      try {
        const res = await addCredits(plan.id);

        dispatch(
          updateUser({
            credits: res.data.credits,
          }),
        );

        resolve("Payment successful!");
      } catch (err) {
        reject("Payment failed. Try again.");
      }
    });

    try {
      await toastService.promise(paymentPromise, {
        loading: "Processing payment...",
        success: "Credits added successfully 💰",
        error: "Payment failed",
      });

      navigate("/dashboard/billing");
    } catch {}

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow space-y-6">
        <h1 className="text-2xl font-bold">Checkout</h1>

        {/* PLAN DETAILS */}
        <div className="border rounded-xl p-4">
          <h2 className="text-lg font-semibold">{plan.name} Plan</h2>
          <p className="text-gray-500 text-sm">{plan.credits} Credits</p>

          <p className="text-2xl font-bold mt-3">₹{plan.price}</p>
        </div>

        {/* MOCK PAYMENT */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Expiry"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* PAY BUTTON */}
        <Button
          onClick={handlePayment}
          className="w-full bg-indigo-600 text-white"
        >
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
