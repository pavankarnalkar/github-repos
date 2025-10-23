import React from "react";

/**
 * Reusable component for icon + text combinations
 */
const IconText = ({
  icon: Icon,
  children,
  className = "",
  iconSize = "w-4 h-4",
  gap = "gap-1",
}) => (
  <div className={`flex items-center ${gap} ${className}`}>
    <Icon className={iconSize} />
    {typeof children === "string" ? <span>{children}</span> : children}
  </div>
);

export default IconText;
