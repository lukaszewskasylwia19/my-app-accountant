import React from "react";
import "../style/Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Button = ({ children, onClick, style }: ButtonProps) => {
  return (
    <button className="button" onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;
