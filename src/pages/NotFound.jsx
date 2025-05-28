import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="mb-6">Oops! Siden du leter etter finnes ikke.</p>
      <Link to="/" className="text-[#1F3B3C] underline">
        Gå til forsiden
      </Link>
    </div>
  );
}
