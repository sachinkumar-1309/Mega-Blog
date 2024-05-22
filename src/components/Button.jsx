// import React from "react";

// function Button({
//   children,
//   type = "button",
//   bgColor = "bg-blue-600",
//   textColor = "text-white",
//   className = "",
//   ...props
// }) {
//   return (
//     <button
//       className={`px-4 py-2 rounded-lg
//       ${type}
//       ${bgColor}
//       ${textColor}
//       ${className}`}
//       $
//       {...props}>
//       {children}
//     </button>
//   );
// }

// export default Button;
import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-[5px] font-semibold tracking-wide shadow-2xl ${type} ${bgColor} ${textColor} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
