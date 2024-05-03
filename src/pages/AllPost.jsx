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

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
        <span className="text-gray-100 font-semibold text-3xl tracking-widest mx-auto pb-2">ALL BLOGS </span> 
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2">
              <PostCard {...post} />
              {/* {console.log("Posts: "+ post.titles)} */}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
