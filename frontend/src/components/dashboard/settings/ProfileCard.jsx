import { useSelector } from "react-redux";
import GlassCard from "../../common/GlassCard";

const ProfileCard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <GlassCard className="p-6">
      <h2 className="text-lg font-semibold mb-4">Profile</h2>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
          {user?.name?.charAt(0)}
        </div>

        <div>
          <p className="font-medium text-lg">{user?.name}</p>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProfileCard;
