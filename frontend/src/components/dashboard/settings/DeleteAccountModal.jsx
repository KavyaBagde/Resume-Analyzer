import GlassCard from "../../common/GlassCard";
import Button from "../../common/Button";

const DeleteAccountModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-md">
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold mb-2">Account Management</h2>

          <p className="text-gray-400 text-sm mb-5">
            These features will be available soon.
          </p>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Delete Account</span>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                Coming Soon
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Download Data</span>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                Planned
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Privacy Controls</span>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                Upcoming
              </span>
            </div>
          </div>

          <div className="mt-6 text-right">
            <Button onClick={onClose}>Close</Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
