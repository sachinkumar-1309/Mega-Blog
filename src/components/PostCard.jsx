import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, titles, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4 ">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={titles}
            className="rounded-xl max-h-56 w-full object-cover"
          />
        </div>
        {/* {console.log("ID: "+service.getFilePreview(featuredImage))} */}
        <h2 className="text-2xl font-bold">{titles}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
