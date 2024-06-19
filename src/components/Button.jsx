const Button = ({ children, onClick, className, disabled, style }) => {
  return (
    <button
      className={`py-2 rounded bg-blue-500 text-white hover:enabled:bg-blue-700 ${className} focus:outline focus:outline-offset-2 focus:outline-1 outline-blue-900 self-center items-center uppercase font-bold text-base md:text-xl px-14 max-md:py-4 rounded-full ${
        disabled ? "bg-gray-500" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};
export default Button;
