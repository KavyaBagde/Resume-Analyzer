import { useSelector } from "react-redux";
import ResumeList from "../../components/dashboard/resumes/ResumeList";

const Resumes = () => {
  const { claimedResumes } = useSelector((state) => state.resume);


  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Your Resumes
        </h1>
        <p className="text-gray-500">
          Manage and optimize your resumes
        </p>
      </div>

      {/* List */}
      <ResumeList resumes={claimedResumes} />

    </div>
  );
};

export default Resumes;