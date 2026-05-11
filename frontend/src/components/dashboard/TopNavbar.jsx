import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authActions";

const TopNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="w-full px-8 py-4 flex justify-between items-center bg-white/70 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
      {/* CLICKABLE LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-gray-900 cursor-pointer"
      >
        ResumeAI
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600">{user?.name}</span>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-linear-to-r from-indigo-500 to-cyan-500 text-white shadow-md hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
