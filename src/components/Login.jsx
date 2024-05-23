// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { login as authLogin } from "../store/authSlice";
// import { Button, Input, Logo } from "./index";
// import { useDispatch } from "react-redux";
// import authService from "../appwrite/auth";
// import { useForm } from "react-hook-form";

// function Login() {
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();
// 	const { register, handleSubmit } = useForm();
// 	const [error, setError] = useState("");

// 	const login = async (data) => {
// 		setError("");
// 		try {
// 			const session = await authService.login(data);
// 			if (session) {
// 				const userData = await authService.getCurrentUser();
// 				if (userData) dispatch(authLogin(userData));
// 				navigate("/");
// 			}
// 		} catch (error) {
// 			setError(error.message);
// 		}
// 	};
// 	if(!login){
// 		return <div className="flex flex-col items-center justify-center h-screen bg-gray-100/20">loggin in...</div>
// 	}

// 	return (
// 		<div className="flex items-center justify-center min-h-[calc(100vh-200px)] text-blue-200 w-full p-3 sm:p-0 mt-3 sm:mt-0 mb-10">
// 			<div
// 				className={`mx-auto w-full max-w-sm place-content-center bg-black/20 rounded-xl p-4 sm:p-9 sm:pb-12 pb-11 shadow-2xl border-2 border-blue-300 `}>
// 				<div className="mb-2 flex justify-center items-center ">
// 					<span className="inline-block w-full max-w-[100px]">
// 						<Logo width="100%" />
// 					</span>
// 				</div>
// 				<h2 className="text-center text-xl sm:text-2xl font-bold leading-tight">
// 					Sign in to your account
// 				</h2>
// 				<p className="mt-0 sm:mt-1 text-center text-sm sm:text-md text-blue-200/60">
// 					Don&apos;t have any account?&nbsp;
// 					<Link
// 						to="/signup"
// 						className="font-medium text-blue-200/80  transition-all duration-200 hover:underline">
// 						Sign Up
// 					</Link>
// 				</p>
// 				{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
// 				<form onSubmit={handleSubmit(login)} className="mt-4 sm:mt-6">
// 					<div className="sm:space-y-4 space-y-3">
// 						<Input
// 							label="Email "
// 							placeholder="Enter your email"
// 							type="email"
// 							{...register("email", {
// 								required: true,
// 								validate: {
// 									matchPatern: (value) =>
// 										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
// 											value
// 										) || "Email address must be a valid address",
// 								},
// 							})}
// 						/>
// 						<Input
// 							className="mb-3"
// 							label="Password "
// 							type="password"
// 							placeholder="Enter your password"
// 							{...register("password", {
// 								required: true,
// 							})}
// 						/>
// 						<Button type="submit" className="w-full ">
// 							Sign in
// 						</Button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false); 

	const login = async (data) => {
		setError("");
		setIsLoading(true); 
		try {
			const session = await authService.login(data);
			if (session) {
				const userData = await authService.getCurrentUser();
				if (userData) dispatch(authLogin(userData));
				navigate("/");
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false); 
		}
	};

	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-200px)] text-blue-200 w-full p-3 sm:p-0 mt-3 sm:mt-0 mb-10">
			<div
				className={`mx-auto w-full max-w-sm place-content-center bg-black/20 rounded-xl p-4 sm:p-9 sm:pb-12 pb-11 shadow-2xl border-2 border-blue-300`}>
				<div className="mb-2 flex justify-center items-center ">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-xl sm:text-2xl font-bold leading-tight">
					Sign in to your account
				</h2>
				<p className="mt-0 sm:mt-1 text-center text-sm sm:text-md text-blue-200/60">
					Don&apos;t have any account?&nbsp;
					<Link
						to="/signup"
						className="font-medium text-blue-200/80 transition-all duration-200 hover:underline">
						Sign Up
					</Link>
				</p>
				{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
				<form onSubmit={handleSubmit(login)} className="mt-4 sm:mt-6">
					<div className="sm:space-y-4 space-y-3">
						<Input
							label="Email "
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPatern: (value) =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
											value
										) || "Email address must be a valid address",
								},
							})}
						/>
						<Input
							className="mb-3"
							label="Password "
							type="password"
							placeholder="Enter your password"
							{...register("password", {
								required: true,
							})}
						/>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Logging in..." : "Sign in"}
						</Button>
					</div>
				</form>
				{isLoading && (
					<div className="flex justify-center mt-4">
						<div className="loader"></div>
						<p className="ml-2">Logging in, please wait...</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default Login;
