import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteRecipe, clearAll } from "../redux/recipesSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", delay: 0.5 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};
const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.3,
      yoyo: Infinity,
      type: "spring",
      stiffness: 120,
    },
  },
};

export default function RecipeList() {
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const hasRecipes = recipes.length > 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="card"
    >
      <header className="card-header">
        <h2>All Recipes</h2>
        {hasRecipes && (
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="btn danger outline"
            onClick={() => dispatch(clearAll())}
          >
            Clear All
          </motion.button>
        )}
      </header>

      {!hasRecipes && (
        <p className="muted">
          No recipes yet. Click{" "}
          <MotionLink
            whileHover={{ scale: 1.3, originX: 0, color: "#f8e112" }}
            transition={{ type: "spring", stiffness: 300 }}
            to="/add"
          >
            Add Recipe
          </MotionLink>{" "}
          to create one.
        </p>
      )}

      {hasRecipes && (
        <ul className="list">
          {recipes.map((r, idx) => (
            <li key={r.id} className="list-item" data-index={idx}>
              <div className="recipe-name">{r.name}</div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                className="btn danger"
                onClick={() => dispatch(deleteRecipe(r.id))}
                aria-label={`Delete ${r.name}`}
              >
                Delete
              </motion.button>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
