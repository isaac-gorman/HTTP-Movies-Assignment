import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

function UpdateMovieForm() {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  const { push } = useHistory();

  // Now I need to load the corrisponding data of the movie that the user has chosen to edit so I can pass in the data to the input fields, so that the user can just edit them from there

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then((res) => {
      console.log("I am the res", res.data);
      setMovie(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // I need to make a put request to the server once this form submits
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log("API response", res.data);
        push(`/`);
      })
      .catch((err) => {
        console.log("API error", err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h5>Update Movie Info</h5>

        <input
          type="text"
          placeholder="title"
          name="title"
          value={movie.title}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="director"
          name="director"
          value={movie.director}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="metascore"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <br />
        <button>Update Movie Info</button>
      </form>
    </div>
  );
}

export default UpdateMovieForm;

// "id": 0,
// "title": "The Godfather",
// "director": "Francis Ford Coppola",
// "metascore": 100,
