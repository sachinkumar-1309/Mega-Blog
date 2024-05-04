import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-900 ">
      <div className=" z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="flex h-full sm:justify-start justify-center">
              <p className="text-sm text-gray-300">&copy; Developed by Sachin.</p>
            </div>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
