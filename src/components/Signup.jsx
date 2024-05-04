import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-95px)] w-full mb-3 p-1 sm:p-0 mt-3 sm:mt-0">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-4 sm:p-10 shadow-2xl border-4 border-blue-300 `}>
        <div className="mb-2 flex justify-center items-center" >
          <span className="inline-block w-full mx-auto max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center  text-md sm:text-xl text-black/60">
          Already have an account?&nbsp;
          <Link
            className="font-medium text-primary transition-all duration-200 hover:underline "
            to="/login">
            Sign in
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full name"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email address should be a valid email address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
