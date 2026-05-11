const StatsCard = ({ title, value }) => {
  return (
    <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/50">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
    </div>
  );
};

export default StatsCard;