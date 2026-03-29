import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {

  const redirect = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {

      if (!inputs.email || !inputs.username || !inputs.password) {
        toast.error("All fields are required");
        return;
      }

      if (inputs.password.length < 5) {
        toast.error("Password must be at least 5 characters");
        return;
      }

      const res = await axios.post(`https://task-manager-swoj.onrender.com/user/signup`, inputs);
      console.log(res.data);

      setInputs({
        email: "",
        username: "",
        password: "",
      });

      if (res.data.message == "User Already Exists") {
        toast.error("User Already Exists");
      } else {
        toast.success("You Are Successfully SignUp");
      }
      redirect('/signin');
    } catch (error) {
      toast.error("Try With Another Email and Username");
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <ToastContainer />
      <form onSubmit={submit} className="flex flex-col gap-6">

        <input
          type="email"
          name="email"
          value={inputs.email}
          placeholder="Enter Your Email"
          className="w-full border border-gray-400 p-3 rounded-sm focus:outline-none focus:border-red-500"
          onChange={change}
        />

        <input
          type="text"
          name="username"
          value={inputs.username}
          placeholder="Enter Your Username"
          className="w-full border border-gray-400 p-3 rounded-sm focus:outline-none focus:border-red-500"
          onChange={change}
        />

        <input
          type="password"
          name="password"
          value={inputs.password}
          placeholder="Enter Your Password"
          className="w-full border border-gray-400 p-3 rounded-sm focus:outline-none focus:border-red-500"
          onChange={change}
        />

        <button
          type="submit"
          className="w-full bg-[#FF4522] text-white font-semibold py-3 rounded-sm hover:bg-red-600 transition-colors"
        >
          Sign Up
        </button>

      </form>
    </div>
  );
};

export default SignupForm;