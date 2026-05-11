import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

import { fetchUserResumes } from "../../features/resume/resumeActions";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const hasFetched = useRef(false); 

  const { claimedResumes } = useSelector((state) => state.resume);

  useEffect(() => {
    // Prevent double execution (StrictMode safe)
    if (hasFetched.current) return;

    if (!claimedResumes.length) {
      hasFetched.current = true; 
      dispatch(fetchUserResumes());
    }
  }, [dispatch, claimedResumes.length]);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-300 via-white to-cyan-300">
      {/* Navbar */}
      <TopNavbar />

      {/* Body */}
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;