import React, { ReactNode } from "react";

interface LabelProps {
  id: string | undefined;
  children: ReactNode;
}

const Label: React.FC<LabelProps> = ({ children, id }) => {
  return (
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {children}
    </label>
  );
};

export default Label;
