import ProfileCard from "./ProfileCard";
import PlanCard from "./PlanCard";
import AccountActions from "./AccountActions";

const SettingsLayout = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400">
          Manage your account, credits, and preferences
        </p>
      </div>

      {/* Top Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <ProfileCard />
        <PlanCard />
      </div>

      {/* Actions */}
      <AccountActions />
    </div>
  );
};

export default SettingsLayout;
