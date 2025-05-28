import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="mb-6">Oops! The page you are looking for does not exist..</p>
      <Link to="/" className="text-[#1F3B3C] underline">
        Head back to HomePage
      </Link>
    </div>
  );
}
