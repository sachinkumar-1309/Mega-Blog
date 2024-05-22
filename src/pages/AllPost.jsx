import React, { useState } from "react";
import { PostCard, Container } from "../components";
import authService from "../appwrite/config";

function AllPost() {
	const [posts, setPosts] = useState([]);
	authService.getPosts([]).then((posts) => {
		if (posts) {
			setPosts(posts.documents);
		}
	});
	if (!posts) {
		return (
			<div className="bg-black/10 w-full h-screen text-6xl text-gray-200">
				Loading...
			</div>
		);
	}

	return (
		<>
			<div className="w-[90vw] mx-auto py-8 ">
				<span className="block text-[#9ca3af] font-extrabold  text-3xl tracking-widest mx-auto pb-8">
					ALL BLOGS{" "}
				</span>
				<div className="flex flex-wrap justify-between ">
					{posts ? (
						posts.map((post) => (
							<div
								key={post.$id}
								className="p-1 mb-5 w-full sm:w-1/2 lg:w-[24%] ">
								<PostCard {...post} />
								{/* {console.log("Posts: "+ post.titles)} */}
							</div>
						))
					) : (
						<div className="bg-black/10 w-full h-screen text-6xl text-gray-200">
							Getting posts...
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default AllPost;
