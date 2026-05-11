import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../common/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Scroll to upload section instead of dashboard
      const uploadSection = document.getElementById("upload");

      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: "smooth" });
      } else {
        // fallback (if not on landing page)
        navigate("/");
        setTimeout(() => {
          document
            .getElementById("upload")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      navigate("/auth?redirect=/dashboard");
    }
  };

  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/60 border-b border-white/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1
          onClick={scrollToHero}
          className="text-xl font-bold text-gray-900 cursor-pointer"
        >
          ResumeAI
        </h1>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
          ) : (
            <Link to="/auth">
              <Button>Login</Button>
            </Link>
          )}

          {/* 🔥 Smart Button */}
          <Button onClick={handleGetStarted}>
            {isAuthenticated ? "Upload Resume" : "Get Started"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
