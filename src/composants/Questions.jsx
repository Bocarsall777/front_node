import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";

const URL_API = import.meta.env.VITE_API_URL;

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  // 🔥 fonction centrale de fetch (réutilisable)
  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get(`${URL_API}/question`);

      console.log("DATA API :", data);

      const cleanData = Array.isArray(data)
        ? data
        : data?.questions || [];

      const filtered = cleanData.filter((q) => q && q._id);

      setQuestions(filtered);
    } catch (error) {
      console.log(error);
      setQuestions([]);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="w-full p-10">
      <h1 className="text-3xl font-bold mb-6">Les questions</h1>

      <div className="space-y-4">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              // 🔥 IMPORTANT : permet refresh après commentaire/vote/delete
              refreshQuestions={fetchQuestions}
            />
          ))
        ) : (
          <p>Aucune question disponible.</p>
        )}
      </div>
    </div>
  );
};

export default Questions;