import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../../features/auth/authSlice";
import GlassCard from "../../common/GlassCard";
import Button from "../../common/Button";
import DeleteAccountModal from "./DeleteAccountModal";

const AccountActions = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <GlassCard className="p-6">
        <h2 className="text-lg font-semibold mb-4">Account Actions</h2>

        <div className="flex gap-4">
          <Button
            onClick={() => dispatch(logout())}
            className="bg-gray-800 text-white"
          >
            Logout
          </Button>

          <Button
            onClick={() => setShowModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete Account
          </Button>
        </div>
      </GlassCard>

      {showModal && <DeleteAccountModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default AccountActions;
