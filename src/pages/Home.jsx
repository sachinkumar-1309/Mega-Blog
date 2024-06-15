import React, { useEffect, useState } from "react";
import authService from "../appwrite/config";
import auth from "../appwrite/auth";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link, json } from "react-router-dom";
import HomeSideBox from "@/components/HomeSideBox";

function Home() {
	const [posts, setPosts] = useState([]);
	const [toView, setToView] = useState(false);
	const Login = useSelector((state) => state.auth.status);

	useEffect(() => {
		authService.getPosts().then((post) => {
			if (post) {
				setPosts(post.documents);
			}
		});
	}, []);

	const toogleDisplay = () => {
		setToView((prev) => !prev);
		setTimeout(() => {
			setToView(false);
		}, 2000);
	};
	const stripHtmlTags = (str) => {
		if (!str) return "";
		return str.replace(/<\/?[^>]+(>|$)/g, "");
	};
	const sanitizedContent = stripHtmlTags(posts[0]?.content);

	return (
		<>
			{" "}
			{Login ? (
				<div className="w-full">
					<div className="capitalize mt-10">
						<p className="text-xs text-gray-300">Our blogs</p>
						<h1 className="text-4xl font-extrabold text-[#d9e3f3]">
							stories and ideas
						</h1>
						<p className="text-sm text-gray-500">
							Stay Updated with the Hottest Trends and Insights
						</p>
					</div>
					<div className="relative sm:w-[80vw] w-[90vw] xl:flex mx-auto my-14 p-2 bg-gree-300 xl:h-[580px]">
						<div className="xl:w-[45%] w-full  border-current rounded h-full border-2 border-white p-2">
							<Link to={`${Login ? `/post/${posts[0]?.$id}` : "/login"}`}>
								{/* <PostCard {...posts[0] } className="height-[600px]"/> */}
								<img
									src={authService.getFilePreview(posts[0]?.featuredImage)}
									alt={posts[0]?.titles}
									className="rounded-t-[12px] rounded-b-lg h-[60%] duration-300 rounded-sm w-full object-cover hover:brightness-110"
								/>
								<div className="text-left px-4 pt-6">
									<button
										className={`flex items-center
					${posts[0]?.status !== "active" ? "bg-red-50" : " bg-[#f0fdf4] "}
					mb-2 px-3 py-[2px] rounded-full font- text-black text-left cursor-default`}>
										<div
											className={`${
												posts[0]?.status !== "active"
													? "bg-red-400"
													: "bg-green-400"
											} mr-2  rounded-full h-3 w-3 `}></div>
										{posts[0]?.status}
									</button>
									<h2 className="lg:text-3xl text-xl tracking-wider font-semibold text-gray-100 -4 truncate">
										{posts[0]?.titles}
									</h2>
									<h4 className="lg:text-sm text-md text-[#909090] tracking-tight pb-4 truncate">
										{sanitizedContent}
									</h4>
									<div className="flex items-center text-gray-300 mt-1.5 pb-4 sm:pb-0">
										<div className="s:w-[55px] s:h-[55px] w-[48px] h-[48px] rounded-full border-2 border-white bg-gray-400"></div>
										<div className="block pl-4 leading-4">
											<span className="text-md">Sachin kumar</span>
											<br />
											<span className="text-xs">29 may 2022</span>
										</div>
									</div>
								</div>
							</Link>
						</div>
						<div className="xl:w-[60%] w-[102%] sm:w-[100%] s:p-2 p-1 mt-8 xl:mt-0 shadow shadow-[#171717]">
							<HomeSideBox post={posts[1]} />
							<HomeSideBox post={posts[2]} />
							<HomeSideBox post={posts[3]} />
						</div>
						<Link to={`/all-posts`}>
							<div className="absolute text-right -bottom-6 sm:-right-20 right-0 mx-auto">
								<span className="text-gray-300 ">more...</span>
							</div>
						</Link>
					</div>
				</div>
			) : (
				<Container>
					<div className="w-full flex justify-center items-center py-8 mt-4 text-center min-h-[calc(100vh-200px)]">
						<div className="p-2">
							{Login ? null : (
								<>
									<h1 className="text-3xl text-gray-200 font-bold">
										<Link
											to="/login"
											className=" underline underline-offset-2 text-gray-300">
											Login
										</Link>{" "}
										to see posts.
									</h1>
									<p
										onClick={toogleDisplay}
										className="text-gray-500 text-xs cursor-pointer">
										Skip signup ?<br />
										<span className={`${toView ? "block" : "hidden"}`}>
											email:{" "}
											<strong className="text-gray-200">
												test@gmail.com
											</strong>{" "}
											|| password:{" "}
											<strong className="text-gray-200"> test1234</strong>
										</span>
										<br />
									</p>
								</>
							)}
						</div>
					</div>
				</Container>
			)}
		</>
	);
}
export default Home;
