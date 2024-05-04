import React, { useEffect, useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button as antButton, Drawer } from "antd";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="w-full flex text-gray-400 font-semibold h-20 border-b-[1px] border-gray-400">
      <div className="w-full md:w-[90vw] sm:mx-auto md:px-4 px-2  text-lg">
        <nav className="flex justify-between items-center px-4 sm:px-0">
          <h1 className="pt-6">TITLE</h1>
          <ul className="flex relative">
            {navItems.map((item) =>
              item.active
                ? innerWidth > 400 && (
                    <li key={item.name} className="">
                      <NavLink
                        to={item.slug}
                        className={({ isActive }) =>
                          `block py-2 ${
                            isActive ? "text-blue-300 " : "text-gray-500"
                          } sm:pt-6 pt-3 sm:px-5 px-3 md:mr-4 duration-200 hover:border-t-2 hover:border-t-blue-300 text-xl`
                        }
                        // className="px-6 py-2 duration-200 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500 rounded-full"
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
                : null
            )}
            <Drawer width={250} title="" onClose={onClose} open={open}>
              {navItems.map((item) =>
                item.active && innerWidth < 400 ? (
                  <li
                    key={item.slug}
                    className="flex items-start border-b-2 border-gray-500">
                    <NavLink
                      to={item.slug}
                      onClick={() => {
                        onClose();
                      }}
                      className={({ isActive }) =>
                        `block py-2 ${
                          isActive
                            ? "text-gray-700 bg-blue-200 "
                            : "text-blue-100"
                        } duration-200 lg:border-0 lg:p-0 w-full text-left px-6 py-2  `
                      }
                      // className="px-6 py-2 duration-200 w-full text-left  "
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="absolute w-full items-start list-none bottom-0 mb-4">
                  <LogoutBtn className="px-8 py-1 text-white font-semibold text-lg bg-red-600 hover:bg-red-700 rounded-xl text-center " />
                </li>
              )}
            </Drawer>

            {innerWidth <= 400 ? (
              <div className="pt-6">
                <antButton type="primary" onClick={showDrawer}>
                  Menu
                </antButton>
              </div>
            ) : (
              authStatus && (
                <div className=" sm:pt-4 pt-1.5 sm:pl-0 px-2  hover:border-t-2 hover:border-t-blue-300 ">
                  <LogoutBtn
                    className={
                      "text-gray-500 pl-2 text-xl hover:bg-none hover:text-red-600"
                    }
                  />
                </div>
              )
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
