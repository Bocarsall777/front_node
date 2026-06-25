import React, { useState } from "react";
import axios from "axios";

const URL_API = import.meta.env.VITE_URL_FRONT;

const QuestionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${URL_API}/api/question`,
        {
          title,
          description,
          tags: tags.split(","),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(data);
      alert("Question créée avec succès !");

      setTitle("");
      setDescription("");
      setTags("");
    } catch (error) {
      console.log(error.response?.data);
      alert("Erreur lors de la création de la question");
    }
  };

  return (
    <div>
      <h1>Formulaire des questions</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Tags (séparés par des virgules)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <br /><br />

        <button type="submit">Publier</button>
      </form>
    </div>
  );
};

export default QuestionForm;