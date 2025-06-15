import React from "react";

interface VideoCardProps {
  image: string;
  title: string;
  date: string;
  comments: string | number;
}

const VideoCard = ({ image, title, date, comments }: VideoCardProps) => {
  return (
    <div className="flex items-center w-full p-4 hover:bg-purple-50 rounded-lg transition-colors">
      <div className="w-16 h-16">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded"
        />
      </div>

      <div className="ml-4 flex-grow">
        <h2 className="text-lg text-gray-800 font-medium">{title}</h2>
        <p className="text-gray-500">{date}</p>
      </div>

      <div className="text-purple-600 font-medium">{comments} comments</div>
    </div>
  );
};

export default VideoCard;
