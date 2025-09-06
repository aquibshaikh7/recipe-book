import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from "../redux/recipesSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

export default function RecipeForm() {
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trimmed = name.trim();
  const isValid = trimmed.length >= 2; // simple validation

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    dispatch(addRecipe(trimmed));
    setName("");
    navigate("/");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="card"
    >
      <header className="card-header">
        <h2>Add a New Recipe</h2>
      </header>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="recipeName">Recipe Name</label>
        <input
          id="recipeName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="e.g., Tomato Basil Pasta"
          className={!isValid && touched ? "invalid" : ""}
          aria-invalid={!isValid && touched}
        />
        <div className="help">
          {touched && !isValid ? (
            <span className="error">Name must be at least 2 characters.</span>
          ) : (
            <span className="muted">
              Tip: keep names short and descriptive.
            </span>
          )}
        </div>

        <div className="actions">
          <button className="btn" disabled={!isValid}>
            Save Recipe
          </button>
        </div>
      </form>
    </motion.div>
  );
}
