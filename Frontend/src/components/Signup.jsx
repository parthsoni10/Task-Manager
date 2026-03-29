import React from 'react';
import SignupForm from './SignupForm';

const Signup = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white font-sans">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[500]">
        
        {/* Left Side: The Form */}
        <div className="flex items-center justify-center border-r-0 md:border-r border-gray-400">
          <SignupForm/>
        </div>

        {/* Right Side: Large Text */}
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-[8rem] md:text-[10rem] font-bold text-[#FF4522] leading-[0.85] text-center select-none">
            Sign <br/> Up
          </h1>
        </div>
        
      </div>
    </div>
  );
};

export default Signup;