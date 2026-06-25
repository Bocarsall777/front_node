import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Questions from "./../../composants/Questions";

const Accueil = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const VerificationToken = () => {
    if (token) {
      return navigate("/ajouter_question");
    }
    navigate("/connexion");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="w-full bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          
          <h1 className="text-xl font-bold text-gray-800">
            Mini StackOverflow
          </h1>

          <button
            onClick={VerificationToken}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition duration-200"
          >
            + Ajouter une question
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-6 py-6">
        
        {/* titre section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Questions récentes
          </h2>
          <p className="text-gray-500 text-sm">
            Posez vos questions et obtenez des réponses de la communauté
          </p>
        </div>

        {/* questions */}
        <div className="space-y-4">
          <Questions />
        </div>
      </main>
    </div>
  );
};

export default Accueil;