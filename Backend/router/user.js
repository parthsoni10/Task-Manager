const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.post("/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        let newUser = new User({ username, email });

        const registeredUser = await User.register(newUser, password);

        console.log(registeredUser);

        res.status(200).json({
            message: "User registered successfully",
            user: registeredUser
        });

    }
    catch (err) {
        return res.status(400).json({
            message: "User Already Exists",
        });
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {

        if (err) {
            return res.status(500).json({
                message: "Server error",
                error: err.message
            });
        }

        if (!user) {
            return res.status(401).json({
                message: "Enter The Correct Username and Password"
            });
        }

        req.logIn(user, (err) => {
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ message: "Session save failed" });
                }

                return res.status(200).json({
                    message: "User Successfully Login",
                    user
                });
            });
        });
    })(req, res, next);
});

router.get("/check-auth", (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            isLoggedIn: true,
            user: req.user
        });
    } else {
        return res.status(401).json({
            isLoggedIn: false
        });
    }
});

router.get("/logout", (req, res) => {
    req.logout(() => {
        res.status(200).json({
            message: "Logged out"
        });
    });
});

module.exports = router;