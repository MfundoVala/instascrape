import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

const ImageCard = ({
  imageUrl,
  likes,
  comments,
  caption,
  username,
  isLoading,
}) => {
  const [isHovered, setHovered] = useState(false);

  if (isLoading) {
    return (
      <div className="relative overflow-hidden w-full h-[18rem] md:max-w-[15rem] shadow-lg transition-transform transform cursor-pointer">
        <div className="animate-pulse w-full h-full bg-gray-300"></div>
      </div>
    );
  }

  return (
    <div
      className="insta-card relative overflow-hidden w-full h-[18rem] md:max-w-[15rem] shadow-lg transition-transform transform cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        className="w-full h-full object-cover"
        src={imageUrl}
        alt={username + " profile"}
      />

      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white">
          <div className="flex flex-row gap-8">
            <p className="text-xl font-bold mb-2">
              <FontAwesomeIcon icon={faHeart} className="mr-1" />
              {likes}
            </p>
            <p className="text-xl font-bold">
              <FontAwesomeIcon icon={faComment} className="mr-1" />
              {comments}
            </p>
          </div>
          <div className="absolute bottom-0 mb-2 bg-white bg-opacity-75 px-2 py-1 rounded-xs">
            <p className="text-sm font-semi-bold text-black">@{username}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
