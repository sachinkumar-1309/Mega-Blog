import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

const stripHtmlTags = (str) => {
	if (!str) return "";
	return str.replace(/<\/?[^>]+(>|$)/g, "");
};

function PostCard({ $id, titles, content, status, featuredImage }) {
	const sanitizedContent = stripHtmlTags(content);

	return (
		<Link to={`/post/${$id}`}>
			<div className="w-full border-[1px] min-h-[330px] border-gray-600 rounded-[12px] shadow-md hover:shadow-gray-700 shadow-gray-900 duration-300 gap-2">
				<div className="w-full justify-center mb-4 lg:h-52">
					<img
						src={service.getFilePreview(featuredImage)}
						alt={titles}
						className="rounded-t-[12px] rounded-b-lg h-[210px] rounded-sm w-full object-cover hover:brightness-110"
					/>
				</div>
				<div className="text-left px-4 pt-2">
					<button className={`flex items-center
					${
						status !== "active" ? "bg-red-50" : " bg-[#f0fdf4] "
					}
					mb-2 px-3 py-[2px] rounded-full font- text-black text-left cursor-default`}>
						<div
							className={`${
								status !== "active" ? "bg-red-400" : "bg-green-400"
							} mr-2  rounded-full h-3 w-3 `}></div>
						{status}
					</button>
					<h2 className="lg:text-2xl text-xl tracking-wider font-semibold text-gray-100 -4 truncate">
						{titles}
					</h2>
					<h4 className="lg:text-sm mt- text-md text-sm text-[#909090] tracking-tight pb-4 truncate">
						{sanitizedContent}
					</h4>
				</div>
			</div>
		</Link>
	);
}

export default PostCard;
