import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import appewriteService from "../appwrite/config";
import { Input, RTE, Select, Button, Container } from "../components/index";

export default function PostForm({ post }) {
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				titles: post?.titles || "",
				slug: post?.$id || "",
				content: post?.content || "",
				status: post?.status || "active",
			},
		});
	
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const userData = useSelector((state) => state.auth.userData);
	const [post1, setPost] = useState(post);

	const submit = async (data) => {
		setIsLoading(true);
		if (post) {
			const file = data.image[0]
				? await appewriteService.uploadFile(data.image[0])
				: null;
			if (file) {
				appewriteService.deleteFile(post.featuredImage);
			}
			const dbPost = await appewriteService.updatePost(post.$id, {
				featuredImage: file ? file.$id : undefined,
				...data,
			});
			console.log("Update post:" + file);
			if (dbPost) {
				navigate(`/post/${dbPost.$id}`);
			}
		} else {
			const file = await appewriteService.uploadFile(data.image[0]);
			if (file) {
				const fileId = file.$id;
				data.featuredImage = fileId;
				const dbPost = await appewriteService.createPost({
					...data,
					userID: userData.$id,
				});
				if (dbPost) {
					navigate(`/post/${dbPost.$id}`);
				}
			}
		}
		setIsLoading(false);
	};
	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string")
			return value.toLowerCase().replace(/[^a-zA-Z\d]+/g, "-");
		return "";
	}, []);

	React.useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "titles") {
				setValue("slug", slugTransform(value.titles), {
					shouldValidate: true,
				});
			}
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [watch, slugTransform, setValue]);

	return (
		<Container>
			{console.log("Get values: " + JSON.stringify(getValues("content")))}
			{/* {console.log("Submit: "+submit)} */}
			<form
				onSubmit={handleSubmit(submit)}
				className="flex flex-wrap text-blue-200 mt-2 relative pb-14">
				<div className="lg:w-2/5 md:w-1/2 w-full sm:px-2 ">
					<div className="">
						{console.log("Title: ", post.titles)}
						<Input
							label="Title"
							value={post?.title}
							placeholder="Title"
							className="sm:mb-4 mb-2 inline-block items-start"
							{...register("titles", {
								required: true,
								onChange: (e) => console.log(e),
							})}
						/>
					</div>
					<Input
						label="Featured Image"
						type="file"
						className="mb-4"
						accept="image/png, image/jpg, image/jpeg, image/gif"
						{...register("image", { required: !post })}
					/>
					{post && (
						<div className="w-full mb-4">
							<img
								src={appewriteService.getFilePreview(post.featuredImage)}
								alt={post.titles}
								className="rounded-lg"
							/>
						</div>
					)}
					<Select
						options={["active", "inactive"]}
						label="Status"
						className="mb-4 rounded-[4px]"
						{...register("status", { required: true })}
					/>
					<Button
						type="submit"
						bgColor={
							post ? "bg-green-500" : "bg-[#1e3a8a] hover:bg-[#1f409a]"
						}
						className="w-full absolute md:relative left-0 bottom-0 ">
						{post ? "Update" : "Submit"}
					</Button>
				</div>
				<div className="lg:w-3/5 md:w-1/2 w-full mt-3 sm:mt-0 ">
					<RTE
						label="Content"
						name="content"
						control={control}
						defaultValue={getValues("content")}
					/>{" "}
				</div>
			</form>
			{isLoading && (
				<div className="flex justify-center mt-4 text-gray-200">
					<div className="loader"></div>
					<p className="ml-2">This may take a moment, please wait...</p>
				</div>
			)}
		</Container>
	);
}
