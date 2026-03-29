import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] bg-gray-100 px-5">
      
      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        Organize your <br /> work and life, finally.
      </h1>

      <p className="text-gray-500 mb-6 max-w-xl">
        Become focused, organized, and calm with todo app. 
        The World's #1 task manager app.
      </p>

      <Link to='/todo' className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600">
        Make Todo List
      </Link>
    </div>
  );
};

export default Home;