import React, { useState } from "react";

const ImageCard = ({ imageUrl, likes, comments, caption, username }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden w-full h-[15rem] md:max-w-[15rem] shadow-lg transition-transform transform  cursor-pointer"
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
            <p className="text-xl font-bold mb-2">{likes} Likes</p>
            <p className="text-xl font-bold">{comments} Comments</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
