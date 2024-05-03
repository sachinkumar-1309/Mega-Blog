import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, titles, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full hover:bg-gray-600/60 bg-gray-500/30 rounded-xl p-4">
        <div className="w-full justify-center mb-4 ">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={titles}
            className="rounded-xl max-h-36 w-full object-cover"
          />
        </div>
        {/* {console.log("ID: "+service.getFilePreview(featuredImage))} */}
        <h2 className="text-2xl font-bold text-gray-100">{titles}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
