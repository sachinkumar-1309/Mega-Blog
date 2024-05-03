import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <span className="text-gray-100 font-semibold text-3xl tracking-widest mx-auto pb-2 mt-2">
        ADD POST{" "}
        </span>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
