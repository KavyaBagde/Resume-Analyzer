import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Overview", path: "/dashboard" },
  { name: "Resumes", path: "/dashboard/resumes" },
  { name: "Settings", path: "/dashboard/settings" },
  { name: "Billing", path: "/dashboard/billing" },
];

const Sidebar = () => {
  return (
    <aside
      className="h-screen p-6 bg-white/60 backdrop-blur-xl border-r border-gray-200"
      style={{ width: "225px" }}
    >
      <h2 className="text-lg font-semibold text-gray-800 ">Dashboard</h2>

      <div className="mt-10">
        <nav className="flex flex-col gap-3 ">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition font-medium ${
                  isActive
                    ? "bg-linear-to-r from-indigo-500 to-cyan-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
