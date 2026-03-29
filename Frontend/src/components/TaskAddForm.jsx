import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const TaskAddForm = ({ onAdd }) => {
  const [inputs, setInputs] = useState({ title: '', body: '' });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  axios.defaults.withCredentials = true;

  const submitTask = () => {

    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title And Body Should Not be Empty");
      return;
    }

    onAdd(inputs.title, inputs.body);

    setInputs({ title: '', body: '' });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.1)] relative">
      <ToastContainer />
      <div className="flex flex-col gap-4">
        <input
          name="title"
          value={inputs.title}
          onChange={handleChange}
          type="text"
          placeholder="TITLE"
          className="text-gray-700 font-bold outline-none w-full border-none placeholder-gray-400"
        />
        <textarea
          name="body"
          value={inputs.body}
          onChange={handleChange}
          placeholder="BODY"
          rows="3"
          className="text-gray-600 outline-none w-full border-none resize-none placeholder-gray-400"
        ></textarea>
      </div>

      <button
        onClick={submitTask}
        className="absolute bottom-5 right-4 bg-[#FF4522] text-white px-8 py-2 rounded-md font-semibold hover:bg-red-600 transition-all shadow-md active:scale-95"
      >
        Add
      </button>
    </div>
  );
};

export default TaskAddForm;