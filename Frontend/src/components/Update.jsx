import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: '',
    body: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  useEffect(() => {
    axios.get(`https://task-manager-swoj.onrender.com/lists`, {
      withCredentials: true
    })
    .then(res => {
      const currentTask = res.data.tasks.find(t => t._id === id);
      if (currentTask) {
        setTask({
          title: currentTask.title,
          body: currentTask.body
        });
      }
    })
    .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://task-manager-swoj.onrender.com/lists/${id}`,
        task,
        { withCredentials: true }
      );

      navigate("/todo");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#F9EBD0] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Update Your Task
        </h2>

        <div className="flex flex-col gap-6">
          <input
            name="title"
            value={task.title}
            onChange={handleChange}
            type="text"
            className="w-full bg-white p-4 text-xl outline-none shadow-sm rounded-sm"
            placeholder="Update Title"
          />

          <textarea
            name="body"
            value={task.body}
            onChange={handleChange}
            rows="5"
            className="w-full bg-white p-4 text-lg outline-none shadow-sm rounded-sm resize-none"
            placeholder="Update Body"
          ></textarea>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleUpdate}
              className="bg-[#2D2D2D] text-white px-8 py-3 rounded-md font-bold text-sm"
            >
              UPDATE
            </button>

            <button
              onClick={() => navigate("/todo")}
              className="bg-[#EE5253] text-white px-8 py-3 rounded-md font-bold text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;