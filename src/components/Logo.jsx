import React from "react";
import logo from '../Blog-logo-transparent.png'

function Logo({ width = "100px" }) {
  return <div className="flex justify-center items-center"><img src={logo} className="w-11 bg-gray-400 p-1 rounded-full" alt="" /></div>;
}

export default Logo;
