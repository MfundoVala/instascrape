import React, { useState } from "react";

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
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <div>
            <p className="text-l font-semi-bold mb-2">{likes} Likes</p>
            <p className="text-l font-semi-bold">{comments} Comments</p>
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
