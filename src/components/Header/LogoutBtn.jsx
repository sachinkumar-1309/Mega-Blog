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
    <button onClick={logoutHandler } className={`duration-200 border border-red-700
    ${className}`}>
      Log out
    </button>
  );
}

export default LogoutBtn;
