import React, { useEffect, useState } from "react";
import authService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const Login = useSelector((state) => state.auth.status);

  useEffect(() => {
    authService.getPosts().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              {Login ? null : (
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Login to see posts
                </h1>
                )}
              </div>
            </div>
          </Container>
        </div>
      );
    }
    return (
    <div className="w-full py-8">
      <Container>
        <div className="sm:flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/4">
              <PostCard {...post} /* post={post} */ />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
