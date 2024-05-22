import React, { useEffect, useState } from "react";
import authService from "../appwrite/config";
import auth from "../appwrite/auth";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
	// const user = auth.getCurrentUser();

	// if (posts.length === 0) {
	//   return (
	//     <div className="w-full py-8 mt-4 text-center">
	//       <Container>
	//         <div className="flex flex-wrap">
	//           <div className="p-2 w-full">
	//             {Login ? null : (
	//               <h1 className="text-2xl font-bold hover:text-gray-500">
	//                 Login to see posts
	//               </h1>
	//             )}
	//           </div>
	//         </div>
	//       </Container>
	//     </div>
	//   );
	// }
	return (
		<>
			{Login ? (
				<div className="w-[90vw] mx-auto py-8 pb-10">
					<>
						<div className="sm:flex flex-wrap">
							{posts.map((post) => (
								<div
									key={post.$id}
									className="p-2 min-h-[345px] w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
									<PostCard {...post} /* post={post} */ />
									{/* {console.log("User: " + user)} */}
								</div>
							))}
						</div>
					</>
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
											email: test@gmail.com || password: test1234
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
