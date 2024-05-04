import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <span className="text-blue-400 font-semibold text-3xl tracking-widest mx-auto pb-2 mt-2 ">
          ADD POST{" "}
          {/* TO ADD GRADIENT TO THE TEXT :
          <div class="relative">
            <p class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-yellow-500 text-transparent">Your Text Here</p>
            <p class="relative text-gray-800">Your Text Here</p>
          </div> */}
        </span>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
