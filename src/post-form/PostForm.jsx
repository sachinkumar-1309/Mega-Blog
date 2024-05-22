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
	const userData = useSelector((state) => state.auth.userData);

	{
	}
	const submit = async (data) => {
		if (post) {
			const file = data.image[0]
				? await appewriteService.uploadFile(data.image[0])
				: null;
			if (file) {
				appewriteService.deleteFile(post.featuredImage);
			}
			const dbPost = await appewriteService.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : undefined,
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
			<form
				onSubmit={handleSubmit(submit)}
				className="flex flex-wrap text-blue-200 mt-2">
				<div className="sm:w-2/5 w-full sm:px-2 px-">
					<div className="w-1/">
						<Input
							label="Title"
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Title"
							className="sm:mb-4 mb-2 inline-block items-start"
							{...register("titles", { required: true })}
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
						bgColor={post ? "bg-green-500" : "bg-[#4b5563]"}
						className="w-full ">
						{post ? "Update" : "Submit"}
					</Button>
				</div>
				<div className="sm:w-3/5 w-full px-2 mt-3 sm:mt-0">
					<RTE
						label="Content"
						name="content"
						control={control}
						defaultValue={getValues("content")}
					/>{" "}
				</div>
			</form>
		</Container>
	);
}
