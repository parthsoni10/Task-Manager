const express = require("express");
const router = express.Router();
const List = require("../models/lists");
const User = require("../models/user");
const Habit = require("../models/HabitSchema");

const IsLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: "You must be logged in"
        });
    }
    next();
};

router.get("/", IsLoggedIn, async (req, res) => {
    try {
        let user = await User.findById(req.user._id).populate("list");

        res.status(200).json({
            tasks: user.list
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching tasks"
        });
    }
});

router.post("/", IsLoggedIn, async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        let { title, body } = req.body;

        let list = new List({ title, body });

        user.list.push(list);

        await list.save();
        await user.save();

        res.status(200).json({
            message: "Task Added Successfully",
            task: list
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
});

router.delete("/:id", IsLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;

        await User.findByIdAndUpdate(req.user._id, {
            $pull: { list: id }
        });

        await List.findByIdAndDelete(id);

        res.status(200).json({
            message: "Task Deleted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Delete failed",
            error: err.message
        });
    }
});

router.put("/:id", IsLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let { title, body } = req.body;

        let updatedTask = await List.findByIdAndUpdate(
            id,
            { title, body },
            { new: true }
        );

        res.status(200).json({
            message: "Task Updated Successfully",
            task: updatedTask
        });

    } catch (err) {
        res.status(500).json({
            message: "Update failed",
            error: err.message
        });
    }
});

// Toggle complete
router.put("/complete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        let task = await List.findById(id);

        task.completed = !task.completed;

        // Set completedAt
        task.completedAt = task.completed ? new Date() : null;

        await task.save();

        res.status(200).json({
            message: "Task status updated",
            task
        });

    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
});

router.get("/progress", async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("list");

        const tasks = user.list;

        const today = new Date();
        const last7Days = new Date();
        last7Days.setDate(today.getDate() - 7);

        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);

        let total = tasks.length;
        let completed = tasks.filter(t => t.completed).length;

        let todayCompleted = tasks.filter(t =>
            t.completedAt &&
            new Date(t.completedAt).toDateString() === today.toDateString()
        ).length;

        let weeklyCompleted = tasks.filter(t =>
            t.completedAt && new Date(t.completedAt) >= last7Days
        ).length;

        let monthlyCompleted = tasks.filter(t =>
            t.completedAt && new Date(t.completedAt) >= last30Days
        ).length;

        res.json({
            total,
            completed,
            percent: total ? Math.round((completed / total) * 100) : 0,
            todayCompleted,
            weeklyCompleted,
            monthlyCompleted
        });

    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
});

router.get("/dashboard", IsLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("list");

        const tasks = user.list;

        const today = new Date();

        const last7Days = new Date();
        last7Days.setDate(today.getDate() - 7);

        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);

        // ✅ Basic Stats
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.completed).length;

        // ✅ Weekly Stats (Graph)
        const weeklyStats = [];

        for (let i = 6; i >= 0; i--) {
            let day = new Date();
            day.setDate(today.getDate() - i);

            let count = tasks.filter(t =>
                t.completed &&
                t.completedAt &&
                new Date(t.completedAt).toDateString() === day.toDateString()
            ).length;

            weeklyStats.push({
                day: day.toLocaleDateString("en-US", { weekday: "short" }),
                completed: count
            });
        }

        // ✅ Monthly
        const monthlyCompleted = tasks.filter(t =>
            t.completed &&
            t.completedAt &&
            new Date(t.completedAt) >= last30Days
        ).length;

        // ✅ Streak
        let streak = 0;

        for (let i = 0; i < 30; i++) {
            let day = new Date();
            day.setDate(today.getDate() - i);

            let found = tasks.some(t =>
                t.completed &&
                t.completedAt &&
                new Date(t.completedAt).toDateString() === day.toDateString()
            );

            if (found) streak++;
            else break;
        }

        res.json({
            totalTasks,
            completedTasks,
            weeklyStats,
            monthlyCompleted,
            streak,
            tasks
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Dashboard error",
            error: err.message
        });
    }
});

router.post("/habit", async (req, res) => {
    try {
        const { title, duration } = req.body;

        let progress = [];

        for (let i = 0; i < duration; i++) {
            progress.push({
                date: new Date(Date.now() + i * 86400000),
                completed: false
            });
        }

        const habit = new Habit({
            title,
            duration,
            progress,
            user: req.user._id
        });

        await habit.save();

        res.json({ message: "Habit created", habit });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/habit", async (req, res) => {
    const habits = await Habit.find({ user: req.user._id });
    res.json(habits);
});

router.put("/habit/:id/:dayIndex", async (req, res) => {
    const { id, dayIndex } = req.params;

    let habit = await Habit.findById(id);

    habit.progress[dayIndex].completed =
        !habit.progress[dayIndex].completed;

    await habit.save();

    res.json(habit);
});

// DELETE HABIT
router.delete("/habit/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const habit = await Habit.findByIdAndDelete(id);

        if (!habit) {
            return res.status(404).json({
                message: "Habit not found"
            });
        }

        res.status(200).json({
            message: "Habit deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting habit",
            error: err.message
        });
    }
});

module.exports = router;