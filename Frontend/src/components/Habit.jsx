import React, { useEffect, useState } from "react";
import axios from "axios";

const Habit = () => {
    const [habits, setHabits] = useState([]);
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState(15);

    const fetchHabits = async () => {
        const res = await axios.get(`http://localhost:3000//lists/habit`, {
            withCredentials: true
        });
        setHabits(res.data);
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    const createHabit = async () => {
        if (!title) return;

        await axios.post(
            `http://localhost:3000//lists/habit`,
            { title, duration: 15 },
            { withCredentials: true }
        );

        setTitle("");
        fetchHabits();
    };

    const toggleDay = async (habitId, index) => {
        await axios.put(
            `http://localhost:3000//lists/habit/${habitId}/${index}`,
            {},
            { withCredentials: true }
        );

        fetchHabits();
    };

    const deleteHabit = async (id) => {
        try {
            await axios.delete(
                `http://localhost:3000//lists/habit/${id}`,
                { withCredentials: true }
            );

            fetchHabits(); // refresh UI

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] p-6">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <h1 className="text-4xl flex justify-center font-bold mb-8 text-gray-800">
                    Habit Tracker
                </h1>

                {/* ADD HABIT */}
                <div className="flex flex-wrap justify-center gap-4 mb-10 bg-white p-4 rounded-xl shadow-sm">

                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter habit..."
                        className="px-4 py-2 rounded-lg border-none outline-none bg-gray-100 w-60"
                    />

                    <button
                        onClick={createHabit}
                        className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
                    >
                        Add Habit
                    </button>

                </div>

                {/* GRID CONTAINER */}
                <div className="bg-white rounded-2xl shadow-lg p-4 overflow-hidden">

                    {/* HEADER ROW */}
                    <div className="flex items-center mb-4">

                        {/* LEFT TITLE */}
                        <div className="w-52 font-semibold text-gray-600 px-3">
                            Habits Tracker
                        </div>

                        {/* DAYS */}
                        <div className="flex w-full justify-evenly gap-2 overflow-x-auto">

                            {habits[0]?.progress.map((_, idx) => (
                                <div
                                    key={idx}
                                    className="min-w-[42px] text-center text-sm text-gray-400"
                                >
                                    {idx + 1}
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* HABIT ROWS */}
                    {habits.map((habit) => (
                        <div
                            key={habit._id}
                            className="flex items-center mb-4 group"
                        >

                            {/* LEFT TASK NAME (STICKY FEEL) */}
                            <div className="w-52 px-3 py-2 font-medium text-gray-700 flex items-center justify-between">

                                <span>{habit.title}</span>

                                <button
                                    onClick={() => deleteHabit(habit._id)}
                                    className="text-red-400 hover:text-red-600 text-sm opacity-0 group-hover:opacity-100 transition"
                                >
                                    ✕
                                </button>

                            </div>

                            {/* CHECKBOX GRID */}
                            <div className="flex w-full justify-evenly gap-2 overflow-x-auto scrollbar-hide">

                                {habit.progress.map((day, idx) => {

                                    const isToday =
                                        idx === new Date().getDate() - 1;

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => toggleDay(habit._id, idx)}
                                            className={`min-w-[42px] h-[42px] rounded-lg transition-all flex items-center justify-center
                        
                        ${day.completed
                                                    ? "bg-green-500 text-white shadow-md scale-105"
                                                    : "bg-gray-100 hover:bg-gray-200"
                                                }

                        ${isToday ? "ring-2 ring-orange-400" : ""}
                      `}
                                        >
                                            {day.completed ? "✔" : ""}
                                        </button>
                                    );
                                })}

                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
};

export default Habit;