import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};
const TextGradient: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={`bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center ${className}`}
    >
      {children}
    </div>
  );
};

export default TextGradient;
