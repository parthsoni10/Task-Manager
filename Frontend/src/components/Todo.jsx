import React, { useState, useEffect } from 'react';
import TaskAddForm from './TaskAddForm';
import TaskCard from './TaskCard';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

const Todo = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const redirect = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    axios.get(`http://localhost:3000//lists`, {
      withCredentials: true
    })
      .then(res => {
        setTasks(res.data.tasks);
      })
      .catch(() => {
        toast.error("Failed to load tasks");
      });

  }, [isLoggedIn]);

  const addTask = async (newTitle, newBody) => {
    if (newTitle.trim() === "" || newBody.trim() === "") {
      toast.error("Body And Title Should Not be Empty");
      return;
    }

    if (!isLoggedIn) {
      const newTask = {
        _id: Date.now(),
        title: newTitle,
        body: newBody,
      };

      setTasks([...tasks, newTask]);
      toast.success("Task added (temporary)");
      toast.error("Without SignIn Task Is Not Saved");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:3000//lists`,
        { title: newTitle, body: newBody },
        { withCredentials: true }
      );

      setTasks([...tasks, res.data.task]);
      toast.success("Task Added Successfully");

    } catch (err) {
      toast.error("Error adding task");
    }
  };

  const deleteTask = async (id) => {

    if (!isLoggedIn) {
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task Deleted (temporary)");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000//lists/${id}`, {
        withCredentials: true
      });

      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task Deleted");

    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const toggleComplete = async (id) => {

    // ❌ NOT LOGGED IN → local only
    if (!isLoggedIn) {
      setTasks(tasks.map(t =>
        t._id === id ? { ...t, completed: !t.completed } : t
      ));
      return;
    }

    // ✅ LOGGED IN → API
    try {
      const res = await axios.put(
        `http://localhost:3000//complete/${id}`,
        {},
        { withCredentials: true }
      );

      setTasks(tasks.map(t =>
        t._id === id ? res.data.task : t
      ));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 px-4">
      <ToastContainer />
      {/* Pass the addTask function to the form */}
      <section className="pt-10 mb-24">
        <TaskAddForm onAdd={addTask} />
      </section>

      {/* Grid for Task Cards */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tasks.map((item, idx) => (
            <TaskCard
              key={idx}
              id={item._id}
              title={item.title}
              body={item.body}
              completed={item.completed} // 👈 important
              onDelete={deleteTask}
              onToggleComplete={toggleComplete} // 👈 ADD THIS
            />
          ))}
        </div>
      </section>
    </div>
  );
}
export default Todo;