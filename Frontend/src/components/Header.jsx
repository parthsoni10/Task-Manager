import React, { useState } from "react";
import { Notebook, Menu, X } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store";
import { toast } from "react-toastify";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`https://task-manager-swoj.onrender.com/user/logout`, {
        withCredentials: true
      });

      dispatch(authActions.logout());
      navigate("/signin");
      toast.success("Logged out successfully");

    } catch (err) {
      console.log(err);
    }
  };

  const handleProtectedRoute = (path) => {
    if (!isLoggedIn) {
      toast.error("Please login first");
      navigate("/signin");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-full bg-white shadow-sm px-4 md:px-10 py-4">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link to='/' className="flex items-center gap-2">
          <Notebook className="text-red-500" />
          <h1 className="text-xl font-bold text-red-500">todo</h1>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/todo">Todo</Link>

          {/* Always visible */}
          <button onClick={() => handleProtectedRoute("/progress")}>
            Progress
          </button>

          <button onClick={() => handleProtectedRoute("/habit")}>
            Habit Tracker
          </button>

          {!isLoggedIn ? (
            <>
              <Link className="bg-red-500 text-white px-4 py-1 rounded" to="/signup">
                SignUp
              </Link>
              <Link className="bg-red-500 text-white px-4 py-1 rounded" to="/signin">
                SignIn
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Log Out
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col justify-start  gap-4 mt-4 md:hidden">

          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/todo" onClick={() => setMenuOpen(false)}>Todo</Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                SignUp
              </Link>

              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                SignIn
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  handleProtectedRoute("/habit");
                  setMenuOpen(false);
                }}
                className="flex justify-start"
              >
                Habit Tracker
              </button>

              <button
                onClick={() => {
                  handleProtectedRoute("/progress");
                  setMenuOpen(false);
                }}
                className="flex justify-start"
              >
                Progress
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;