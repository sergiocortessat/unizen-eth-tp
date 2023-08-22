import React from "react";
import { twMerge } from 'tailwind-merge'

type TransitionFrameProps = {
  children: React.ReactNode;
  className?: string;
};

const TransitionFrame = ({ children, className }: TransitionFrameProps) => {
  return (
    <div className={twMerge("unverified-alert-2 flex items-center justify-center", className)}>
      {children}
    </div>
  );
};

export default TransitionFrame;
