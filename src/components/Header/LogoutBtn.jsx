import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn({className}) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => dispatch(logout()));
  };
  return (
    <button onClick={logoutHandler } className={`px-6 py-2 duration-200
    ${className}`}>
      Log out
    </button>
  );
}

export default LogoutBtn;
