import { useNavigate } from "react-router-dom";

const RecentResumes = ({ resumes }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/50">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Resumes
      </h2>

      {resumes.length === 0 ? (
        <p className="text-gray-500">No resumes yet</p>
      ) : (
        <div className="space-y-3">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              onClick={() => navigate(`/analysis/${resume._id}`)}
              className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
              {/* TRUNCATE FILE NAME */}
              <p className="font-medium text-gray-800 truncate">
                {resume.fileName}
              </p>

              <p className="text-sm text-gray-500">
                Score: {resume.analysis?.aiBased?.score || 0}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentResumes;