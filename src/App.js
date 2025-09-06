import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import { AnimatePresence, motion } from "framer-motion";

// ✅ Motion Link for hover effects
const MotionLink = motion(Link);

// Hover animation for nav links
const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    color: "red",
    transition: {
      duration: 0.3,
      yoyo: 5,
    },
  },
};

// Logo animation
const svgVariants = {
  hidden: { rotate: -180 },
  visible: {
    rotate: 0,
    transition: { duration: 1 },
  },
};

const pathVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: { duration: 2, ease: "easeInOut" },
  },
};

// Heading animation
const headingVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, delay: 0.5 },
  },
};

function App() {
  const recipes = useSelector((state) => state.recipes);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const location = useLocation();

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="navbar">
        {/* Draggable animated logo */}
        <motion.div
          className="logo"
          drag
          dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
          dragElastic={0.7}
        >
          <motion.svg
            className="pizza-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            variants={svgVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.path
              fill="none"
              d="M40 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z"
              variants={pathVariants}
            />
            <motion.path
              fill="none"
              d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z"
              variants={pathVariants}
            />
          </motion.svg>
        </motion.div>

        {/* Animated Heading */}
        <motion.div
          className="brand"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          🍳 Recipe Book
        </motion.div>

        {/* Nav links with hover effect */}
        <div className="links">
          <MotionLink to="/" variants={buttonVariants} whileHover="hover">
            Recipes
          </MotionLink>
          <MotionLink
            to="/add"
            className="btn primary"
            variants={buttonVariants}
            whileHover="hover"
          >
            Add Recipe
          </MotionLink>
        </div>

        {/* Theme Switch */}
        <div className="theme">
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
            <span className="slider"></span>
          </label>
          <span className="theme-label">
            {theme === "dark" ? "Dark" : "Light"}
          </span>
        </div>
      </nav>

      {/* ✅ Page Transition Container */}
      <main className="container">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<RecipeList />} />
            <Route path="/add" element={<RecipeForm />} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
