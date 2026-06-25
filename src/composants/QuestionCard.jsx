import React from "react";
import { Link } from "react-router-dom";

const QuestionCard = ({ question }) => {
  if (!question) return null;

  return (
    <Link to={`/detail/${question._id}`}>
      <div className="bg-white border rounded-lg shadow-sm p-5 hover:shadow-md transition mb-4">

        {/* TITLE */}
        <h2 className="text-xl font-bold text-blue-600 hover:underline">
          {question.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-700 mt-2">
          {question.description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mt-3">
          {(question.tags || []).map((tag, index) => (
            <span
              key={index}
              className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* VOTES + COMMENTS */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>Votes : {question.votes || 0}</span>

          <span>
            Commentaires : {question.comments?.length || 0}
          </span>
        </div>

        {/* AUTEUR + DATE */}
        <div className="mt-3 border-t pt-3 text-sm text-gray-600">
          <p>
            Auteur :{" "}
            {question.userId && typeof question.userId === "object"
              ? `${question.userId.prenom || ""} ${question.userId.nom || ""}`
              : "Inconnu"}
          </p>

          <p>
            Date :{" "}
            {question.createdAt
              ? new Date(question.createdAt).toLocaleDateString("fr-FR")
              : "Date inconnue"}
          </p>
        </div>

      </div>
    </Link>
  );
};

export default QuestionCard;