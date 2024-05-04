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
    <div className="w-full py-8 sm:h-[calc(100vh-85px)]">
      <Container>
        <span className= "block text-blue-400 font-semibold text-3xl tracking-widest mx-auto pb-2">ALL BLOGS </span> 
        <div className="flex flex-wrap ">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/4">
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
