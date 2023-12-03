import React from "react";
import { IMAGES } from "../../assets";

const PostCard = ({
  username,
  imageUrl,
  likes,
  comments,
  caption,
  timestamp,
}) => {
  const showDefaultImg = (event) => {
    // Replace the failed image with a default image
    event.target.src = IMAGES.logo;
  };

  const convertTimestampToHourOrDay = (timestamp) => {
    // Convert timestamp to hour or day
    const now = new Date();
    const postDate = new Date(timestamp * 1000);
    const diff = now - postDate;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  timestamp = convertTimestampToHourOrDay(timestamp);

  return (
    <div className="card w-full max-w-xs md:max-w-[15rem] rounded overflow-hidden shadow-lg">
      <div className="username px-4 font-semi-bold flex items-center">
        <p className="pl-0">{username}</p> <p className="pl-2">•</p>{" "}
        <p className="pl-2">{timestamp}</p>
      </div>
      <img
        className="postImage w-full h-64 object-cover object-top"
        src={imageUrl}
        alt="Post"
        onError={showDefaultImg}
      />
      <div className="status border-b border-gray-200 p-4">
        <div className="like flex">
          <img
            className="p-2 w-6 h-6"
            src="https://cdn4.iconfinder.com/data/icons/app-custom-ui-1/48/Heart-128.png"
            alt="Like"
          />
          {likes}
          <img
            className="p-2 w-6 h-6"
            src="https://cdn4.iconfinder.com/data/icons/app-custom-ui-1/48/Chat_bubble-128.png"
            alt="Comment"
          />
          {comments}
        </div>
        <div>
          <b>{username}</b>{" "}
          {caption.length > 100 ? (
            <p>
              {caption.slice(0, 100)} ...<b>see more</b>
            </p>
          ) : (
            caption
          )}
        </div>
        <div className="comment">
          <b>johndoe</b> So stunning
        </div>
      </div>
      <div className="commentInput flex items-center">
        <textarea
          className="resize-none border-none m-4 w-full h-18 focus:outline-none"
          placeholder="Add a comment…"
        ></textarea>
        <img
          className="w-8 h-8"
          src="https://i.stack.imgur.com/twIm6.png"
          alt="Send"
        />
      </div>
    </div>
  );
};

export default PostCard;
