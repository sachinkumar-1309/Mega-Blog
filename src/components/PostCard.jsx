import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, titles, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full max-  bg-g border-[1px] border-gray-600 rounded-[5px] ">
        <div className="w-full justify-center mb-4 ">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={titles}
            className="rounded-t-[5px] rounded-b-lg rounded-sm max-h-44 w-full object-cover hover:brightness-110"
          />
        </div>
        {/* {console.log("ID: "+service.getFilePreview(featuredImage))} */}
        <h2 className="text-2xl font-bold text-gray-100 pb-4">{titles}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
