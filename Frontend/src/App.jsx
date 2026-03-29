import React, { useEffect } from "react";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Route, Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import AboutUs from "./components/About";
import Signup from "./components/Signup";
import Todo from "./components/Todo";
import UpdateTask from "./components/Update";
import SignIn from "./components/SignIn";
import Progress from "./components/Progress";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./store";
import Habit from './components/Habit';

const App = () => {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3000//user/check-auth", {
      withCredentials: true
    })
      .then(res => {
        dispatch(authActions.login(res.data.user));
      })
      .catch(() => {
        dispatch(authActions.logout());
      });
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/habit" element={<Habit />} />
        <Route path="/update/:id" element={<UpdateTask />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;