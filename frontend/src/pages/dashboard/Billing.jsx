import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastService } from "../../services/toastService";

const Billing = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const credits = user?.credits ?? 0;
  const plan = user?.plan ?? "free";

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-500 mt-1">
            Manage your credits and upgrade your plan
          </p>
        </div>

        {/* CURRENT STATUS */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-sm text-gray-500">Current Plan</p>
            <h2 className="text-xl font-semibold capitalize">{plan}</h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">Available Credits</p>
            <h2 className="text-2xl font-bold text-indigo-600">💰 {credits}</h2>
          </div>
        </div>

        {/* PLANS */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Upgrade Plans
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* FREE PLAN */}
            <div className="bg-white p-6 rounded-2xl shadow border">
              <h3 className="text-lg font-semibold">Free</h3>
              <p className="text-gray-500 text-sm mt-1">
                Basic access for trial
              </p>

              <h2 className="text-2xl font-bold mt-4">₹0</h2>

              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• 1 Resume Upload</li>
                <li>• 1 JD Analysis</li>
                <li>• Limited access</li>
              </ul>

              <button
                disabled
                className="mt-6 w-full py-2 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed"
              >
                Current Plan
              </button>
            </div>

            {/* PRO PLAN */}
            <div className="bg-white p-6 rounded-2xl shadow border-2 border-indigo-500 relative">
              <span className="absolute top-2 right-2 text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                Popular
              </span>

              <h3 className="text-lg font-semibold">Pro</h3>
              <p className="text-gray-500 text-sm mt-1">
                Best for active users
              </p>

              <h2 className="text-2xl font-bold mt-4">₹199</h2>

              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• 100 Credits</li>
                <li>• Unlimited resumes</li>
                <li>• Faster AI generation</li>
              </ul>

              <button
                onClick={() =>
                  navigate("/dashboard/billing/checkout", {
                    state: {
                      plan: {
                        id: "pro",
                        name: "Pro",
                        price: 199,
                        credits: 100,
                      },
                    },
                  })
                }
                className="mt-6 w-full py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
              >
                Buy Now
              </button>
            </div>

            {/* ENTERPRISE / CUSTOM */}
            <div className="bg-white p-6 rounded-2xl shadow border">
              <h3 className="text-lg font-semibold">Custom</h3>
              <p className="text-gray-500 text-sm mt-1">For heavy usage</p>

              <h2 className="text-2xl font-bold mt-4">Contact</h2>

              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• Unlimited credits</li>
                <li>• Priority support</li>
                <li>• Custom features</li>
              </ul>

              <button
                onClick={() =>
                  toastService.info("Contact us at support@yourapp.com")
                }
                className="mt-6 w-full py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* CREDIT INFO */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Credit Usage
          </h2>

          <div className="text-sm text-gray-600 space-y-2">
            <p>• Resume Generation: 3 credits</p>
            <p>• JD Analysis: 2 credits</p>
            <p>• Upload & Base Analysis: Free (limited) else 2 credit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
