import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm, Container } from "../components/index.js";

function EditPost() {
	const [post, setPost] = useState([]);
	const { slug } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (slug) {
			appwriteService.getPost(slug).then((post) => {
				if (post) {
					setPost(post);
				}
			});
		} else {
			navigate("/");
		}
	}, [slug, navigate]);

	return post ? (
		<div className="py-8">
			{/* {console.log('Edit posts: '+post, )} */}
			{console.log("Post in edit post: " + JSON.stringify(post))}
			<Container>
				<PostForm post={post} />
			</Container>
		</div>
	) : null;
}

export default EditPost;
