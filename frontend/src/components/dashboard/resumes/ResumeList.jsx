import ResumeCard from "./ResumeCard";

const ResumeList = ({ resumes }) => {
  if (!resumes || resumes.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No resumes found. Upload one to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resumes.map((resume) => (
        <ResumeCard key={resume._id} resume={resume} />
      ))}
    </div>
  );
};

export default ResumeList;