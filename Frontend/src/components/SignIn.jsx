import React from 'react';
import SignInForm from './SignInForm';

const Signup = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white font-sans">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[500]">
        
        {/* Right Side: Large Text */}
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-[8rem] md:text-[10rem] font-bold text-[#FF4522] leading-[0.85] text-center select-none">
            Sign <br /> In
          </h1>
        </div>

        {/* Left Side: The Form */}
        <div className="flex items-center justify-center border-r-0 md:border-l border-gray-400">
          <SignInForm />
        </div>

      </div>
    </div>
  );
};

export default Signup;