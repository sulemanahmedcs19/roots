import React from "react";

const RobotLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        {/* Robot Emoji ya Image */}
        <div className="text-6xl animate-bounce">🤖</div>
        <p className="text-white mt-4 text-xl">Loading...</p>
      </div>
    </div>
  );
};

export default RobotLoader;
