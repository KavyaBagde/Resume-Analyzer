const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white/50
        backdrop-blur-2xl
        border border-white/30
        shadow-[0_8px_32px_rgba(0,0,0,0.1)]
        rounded-2xl
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;