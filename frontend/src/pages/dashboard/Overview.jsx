import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StatsCard from "../../components/dashboard/overview/StatsCard";
import RecentResumes from "../../components/dashboard/overview/RecentResumes";

const Overview = () => {
  const navigate = useNavigate();
  const { claimedResumes } = useSelector((state) => state.resume);

  const total = claimedResumes?.length || 0;

  const bestScore =
    claimedResumes?.length > 0
      ? Math.max(...claimedResumes.map((r) => r.analysis?.aiBased?.score || 0))
      : 0;

  const sorted = [...(claimedResumes || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const latest = sorted[0];
  const recent = sorted.slice(0, 3);

  const handleUploadRedirect = () => {
    navigate("/");

    setTimeout(() => {
      const el = document.getElementById("upload");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); // wait for page render
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Track your resumes and performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Resumes" value={total} />
        <StatsCard title="Best ATS Score" value={bestScore} />

        <StatsCard
          title="Latest Resume"
          value={
            latest?.fileName
              ? latest.fileName.length > 16
                ? latest.fileName.slice(0, 16) + "..."
                : latest.fileName
              : "None"
          }
        />
      </div>

      {/* Recent + CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <RecentResumes resumes={recent} />

        {/* CTA */}
        <div className="h-fit p-6 rounded-2xl bg-linear-to-r from-indigo-500 to-cyan-500 text-white shadow-xl">
          <h2 className="text-xl font-semibold mb-2">Improve your resume</h2>

          <p className="mb-4 text-white/90">
            Upload a new resume and get AI insights instantly
          </p>

          <button
            onClick={handleUploadRedirect}
            className="px-5 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:opacity-90 transition"
          >
            Upload Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
