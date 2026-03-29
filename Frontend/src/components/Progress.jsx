import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Progress = () => {
    const [data, setData] = useState({
        totalTasks: 0,
        completedTasks: 0,
        weeklyStats: [],
        tasks: [],
        streak: 0
    });

    const fetchDashboard = async () => {
        const res = await axios.get(
            `http://localhost:3000//lists/dashboard`,
            { withCredentials: true }
        );
        setData(res.data);
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    // 🔥 Toggle complete
    const toggleComplete = async (id) => {
        try {
            await axios.put(
                `http://localhost:3000//lists/complete/${id}`,
                {},
                { withCredentials: true }
            );

            fetchDashboard(); // 🔁 refresh data
        } catch (err) {
            console.log(err);
        }
    };

    const chartData = {
        labels: data.weeklyStats?.map(d => d.day),
        datasets: [
            {
                label: "Tasks Completed",
                data: data.weeklyStats?.map(d => d.completed),
                backgroundColor: "rgba(255, 69, 34, 0.6)"
            }
        ]
    };

    return (
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                <div className="bg-blue-100 p-4 rounded">
                    <h2 className="text-xl font-bold">{data.totalTasks}</h2>
                    <p>Total Tasks</p>
                </div>

                <div className="bg-green-100 p-4 rounded">
                    <h2 className="text-xl font-bold">{data.completedTasks}</h2>
                    <p>Completed</p>
                </div>

                <div className="bg-yellow-100 p-4 rounded">
                    <h2 className="text-xl font-bold">
                        {data.totalTasks ? Math.round((data.completedTasks / data.totalTasks) * 100) : 0}%
                    </h2>
                    <p>Progress</p>
                </div>

                <div className="bg-red-100 p-4 rounded">
                    <h2 className="text-xl font-bold">🔥 {data.streak}</h2>
                    <p>Streak</p>
                </div>

            </div>

            {/* Chart */}
            <div className="bg-white p-4 rounded shadow mb-8">
                <Bar data={chartData} />
            </div>

            {/* Tasks List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {data.tasks.map(task => (
                    <div
                        key={task._id}
                        className="border p-4 rounded flex justify-between items-center"
                    >
                        <div>
                            <h3 className={task.completed ? "line-through text-gray-400" : ""}>
                                {task.title}
                            </h3>
                            <p className="text-sm text-gray-500">{task.body}</p>
                        </div>

                        <button
                            onClick={() => toggleComplete(task._id)}
                            className={task.completed ? "text-gray-500" : "text-green-600"}
                        >
                            {task.completed ? "Undo" : "✔ Done"}
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Progress;