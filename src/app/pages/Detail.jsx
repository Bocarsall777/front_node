import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const URL_API = import.meta.env.VITE_API_URL;

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // 🔥 IMPORTANT

  const [question, setQuestion] = useState(null);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });

  // 🔥 GET QUESTION
  const fetchQuestion = async () => {
    try {
      const { data } = await axios.get(`${URL_API}/question/${id}`);
      setQuestion(data);
      setForm({ title: data.title, description: data.description });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  // 👍 VOTE
  const handleVote = async () => {
    try {
      const { data } = await axios.put(
        `${URL_API}/question/${id}/vote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestion(data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // 🗑 DELETE
  const handleDelete = async () => {
    try {
      await axios.delete(`${URL_API}/question/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ✏️ UPDATE
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${URL_API}/question/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestion(data);
      setEditing(false);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // 💬 COMMENT
  const handleComment = async () => {
    if (!comment) return;

    try {
      const { data } = await axios.post(
        `${URL_API}/question/${id}/comment`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestion(data);
      setComment("");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (!question) return <p>Chargement...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">

      {/* TITLE */}
      {editing ? (
        <>
          <input
            className="border p-2 w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="border p-2 w-full mt-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 mt-2"
          >
            Sauvegarder
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{question.title}</h1>
          <p className="mt-2">{question.description}</p>
        </>
      )}

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">
        <button onClick={handleVote} className="bg-blue-500 text-white px-3 py-1">
          👍 Voter ({question.votes || 0})
        </button>

        <button onClick={() => setEditing(!editing)} className="bg-yellow-500 text-white px-3 py-1">
          ✏️ Modifier
        </button>

        <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1">
          🗑 Supprimer
        </button>
      </div>

      {/* COMMENTS */}
      <div className="mt-6">
        <h2 className="font-bold mb-2">Commentaires</h2>

        <div className="flex gap-2">
          <input
            className="border p-2 flex-1"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Écrire un commentaire..."
          />

          <button
            onClick={handleComment}
            className="bg-green-500 text-white px-3"
          >
            Envoyer
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {question.comments?.map((c, i) => (
            <div key={i} className="border p-2 rounded">
              {c.text}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default QuestionDetail;