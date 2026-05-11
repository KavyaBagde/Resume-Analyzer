import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GlassCard from "../../common/GlassCard";
import Button from "../../common/Button";

const PlanCard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <GlassCard className="p-6 flex justify-between items-center">
      <div>
        <p className="text-gray-400 text-sm">Your Plan</p>
        <h3 className="text-xl font-semibold">Free Tier</h3>

        <p className="text-gray-400 text-sm mt-3">Available Credits</p>
        <p className="text-3xl font-bold text-indigo-500">{user?.credits}</p>
      </div>

      <div>
        <Button
          className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
          onClick={() => navigate("/dashboard/billing")}
        >
          Buy Credits
        </Button>
      </div>
    </GlassCard>
  );
};

export default PlanCard;
