import React, { useEffect, useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
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
    <header className="w-full text-white font-semibold py-3 pt-6 bg-gradient-to-t from-gray-400 to-gray-600">
      <div className="w-[90vw] mx-auto md:px-4 text-lg">
        <nav className="flex justify-between items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ">
            {navItems.map((item) =>
              item.active
                ? innerWidth > 400 && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="px-6 py-2 duration-200 hover:bg-blue-100 hover:text-blue-400 rounded-full">
                        {item.name}
                      </button>
                    </li>
                  )
                : null
            )}
            <Drawer width={250} title="" onClose={onClose} open={open}>
              {navItems.map((item) =>
                item.active && innerWidth < 400 ? (
                  <li key={item.slug} className="flex items-start border-b-2">
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-6 py-2 duration-200 ">
                      {item.name}
                    </button>
                    </li>
                ) : null
              )}
              {authStatus && (
                <li className="flex items-start border-b-2">
                  <LogoutBtn className="hover:bg-transparent" />
                </li>
              )}
            </Drawer>
            {innerWidth <= 400 ? (
              <antButton type="primary" onClick={showDrawer}>
                Menu
              </antButton>
            ) : (
              authStatus && (
                <li className="">
                  <LogoutBtn />
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
