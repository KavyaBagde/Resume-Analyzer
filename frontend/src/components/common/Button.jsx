const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`
        bg-linear-to-r from-indigo-500 to-cyan-500
        text-white
        px-6 py-3
        rounded-xl
        font-semibold
        shadow-md
        hover:scale-105
        active:scale-95
        transition
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
