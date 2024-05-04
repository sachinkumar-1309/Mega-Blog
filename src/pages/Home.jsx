import React, { useEffect, useState } from "react";
import authService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


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
        <div className="w-full py-8 sm:h-[calc(100vh-85px)] pb-10">
          <Container>
            <div className="sm:flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/4">
                  <PostCard {...post} /* post={post} */ />
                </div>
              ))}
            </div>
          </Container>
        </div>
      ) : (
          <Container>
            <div className="w-full py-8 mt-4 text-center h-[calc(100vh-95px)]">
                <div className="p-2 w-full flex justify-center align-center">
                  {Login ? null : (
                    <h1 className="text-2xl text-gray-200 font-bold">
                      <Link to="/login" className=" underline underline-offset-2 text-gray-300">Login</Link> to see posts.
                    </h1>
                  )}
                </div>
            </div>
          </Container>
      )}
    </>
  );
}

export default Home;
