import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const SignupForm = () => {

  const redirect = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
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
      const res = await axios.post(`https://task-manager-swoj.onrender.com/user/login`, inputs); 
      axios.defaults.withCredentials = true;
      dispatch(authActions.login(res.data.user));

      setInputs({
        username: "",
        password: "",
      });

      redirect('/');
      toast.success(res.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <ToastContainer />
      <form onSubmit={submit} className="flex flex-col gap-6">

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
          Sign In
        </button>

      </form>
    </div>
  );
};

export default SignupForm;