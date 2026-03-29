const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const User = require('./models/user');
const cors = require("cors");

const app = express();
app.use(cors({
    origin: "https://task-manager-swoj.onrender.com", 
    credentials: true
}));

const ListsRouter = require("./router/list");
const UserRouter = require('./router/user');

const sessionOptions = {
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser("secretcode"));
app.use(session(sessionOptions));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/user", UserRouter);
app.use("/lists", ListsRouter);

app.listen(3000, (req, res) => {
    console.log(`App is listning at 3000`);
});