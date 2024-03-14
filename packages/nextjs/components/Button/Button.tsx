import "./Button.css";

interface ButtonProps {
  children: string;
  size?: "small" | "large";
  onClick?: () => void;
}

const Button = ({ children, size = "small", onClick }: ButtonProps) => {
  const isSmall = size === "small";
  return (
    <button
      onClick={onClick}
      className={`text-white text-base bg-[#9135F5] my-10 base_button__${isSmall ? "small" : "large"}`}
    >
      {children}
    </button>
  );
};

export default Button;
