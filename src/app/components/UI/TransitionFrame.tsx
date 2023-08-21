import React from "react";

type TransitionFrameProps = {
  children: React.ReactNode;
  customClass?: {
    customMargin: string;
    delay: string
  };
};

const TransitionFrame: React.FC<TransitionFrameProps> = ({ children, customClass }) => {
// create a function to return the custom class. If its present then add it to the string
    const getCustomClass = () => {
        if (customClass) {
            const {customMargin, delay} = customClass
        return `unverified-alert-${delay} flex items-center justify-center ${customMargin}`;
        }
        return "unverified-alert-5 flex items-center justify-center";
    };

  return (
    <div className={getCustomClass()}>
      {children}
    </div>
  );
};

export default TransitionFrame;
