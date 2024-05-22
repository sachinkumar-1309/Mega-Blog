import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import appwriteAuth from "../appwrite/auth";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GiSpeaker } from "react-icons/gi";
import { FaRegCircleStop } from "react-icons/fa6";

export default function Post() {
	const [post, setPost] = useState(null);
	const [user, setUser] = useState(null);
	const [isSpeaking, setIsSpeaking] = useState(true);
	const { slug } = useParams();
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	const isAuthor = post && userData ? post.userID === userData.$id : false;

	useEffect(() => {
		if (slug) {
			appwriteService.getPost(slug).then((post) => {
				if (post) setPost(post);
				else navigate("/");
			});
		} else navigate("/");
	}, [slug, navigate]);

	const deletePost = () => {
		appwriteService.deletePost(post.$id).then((status) => {
			if (status) {
				appwriteService.deleteFile(post.featuredImage);
				navigate("/");
			}
		});
	};
	if (!post) {
		return (
			<div className="bg-black/10 w-full h-screen text-6xl text-gray-200">
				Loading...
			</div>
		);
	}
	const createdAt = new Date(post.$createdAt);
	const updatedAt = new Date(post.$updatedAt);

	if (isNaN(updatedAt)) {
		return <div>Invalid date</div>;
	}

	// Extract date and time
	const dateOptions = { year: "numeric", month: "long", day: "numeric" };
	const formattedDate = updatedAt.toLocaleDateString(undefined, dateOptions);

	const timeOptions = {
		hour: "2-digit",
		minute: "2-digit",
	};
	const formattedTime = updatedAt.toLocaleTimeString(undefined, timeOptions);

	const toggleSpeak = ({ content }) => {
		if (isSpeaking) {
			setIsSpeaking(false);
			// const text = document.getElementById(`${}`);
			const utterance = new SpeechSynthesisUtterance(
				content || "Empty Text area."
			);
			console.log("Clicked " + content);

			// Set the onend handler on the same utterance instance
			utterance.onend = () => {
				setIsSpeaking(true);
			};

			speechSynthesis.speak(utterance);
		} else {
			speechSynthesis.cancel();
			setIsSpeaking(true);
		}
	};

	return post ? (
		<Container>
			<div className="relative py-16 sm:py-8 text-gray-50 min-h-[calc(100vh-80px)]">
				<div className=" ">
					<div className="w-full  mb-4   rounded-xl">
						<img
							src={appwriteService.getFilePreview(post.featuredImage)}
							alt={post.title}
							className="rounded-xl border shadow-md shadow-gray-800"
						/>

						{isAuthor && (
							<div className="absolute right-1 top-2 ">
								<Link to={`/edit-post/${post.$id}`}>
									<Button bgColor="bg-green-500" className="mr-3 group">
										<div className="absolute bottom-10 left-1/4 text-xs font-light transform -translate-x-1/2 bg-green-300/50 text-gray-200 px-2 py-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-green-300/50">
											Edit
										</div>
										<FaEdit className="text-black" />
									</Button>
								</Link>
								<Button
									bgColor="bg-red-500  "
									className="group"
									onClick={deletePost}>
									<div className="absolute bottom-10 -right-1/3 text-xs font-light transform -translate-x-1/2 bg-red-300/50 text-gray-200 px-2 py-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-red-300/50">
										Delete
									</div>
									<MdDelete />
								</Button>
							</div>
						)}
					</div>
				</div>
				<div className="w-full mb-6 flex items-center">
					<h1 className="text-3xl text-left font-bold" id="textArea">
						{post.titles}
					</h1>
					<button
						className="text-white text-xl px-2 ml-3 pt-1"
						onClick={() => toggleSpeak(post)}>
						{isSpeaking ? (
							<GiSpeaker className="border -1" />
						) : (
							<FaRegCircleStop />
						)}
					</button>
				</div>
				<div className="browser-css text-left">{parse(post.content)}</div>

				<div className="w-full text-right text-xs text-gray-400 mt-6">
					{/* <span className="block">{"Created by: "+appwriteAuth.getUserByUserID()}</span> */}
					<span
						className={`${
							post.$createdAt === post.$updatedAt ? "hidden" : "inline-block"
						}`}>
						{"Edited: "}
					</span>
					{" " + formattedDate + "  " + formattedTime}
				</div>
				{/* {console.log(post)} */}
			</div>
		</Container>
	) : null;
}
