import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: new Date().getUTCMilliseconds(),
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

function AddMovieForm() {
  const [movie, setMovie] = useState(initialMovie);
  const { push } = useHistory();

  // Now I need to load the corrisponding data of the movie that the user has chosen to edit so I can pass in the data to the input fields, so that the user can just edit them from there

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
      // ...movie.stars,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", movie)
      .then((res) => {
        console.log("Success! Post Request API Response", res.data);
        push("/");
      })
      .catch((err) => {
        console.log("Failure! Post Request API Error", err);
      });
    // I need to make a put request to the server once this form submits
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h5>Add Movie</h5>

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
        {/* <input
          type="text"
          placeholder="star1"
          name="stars"
          value={movie.stars}
          onChange={handleChange}
        />
        <br /> */}
        {/* <button onClick={addStarInput}>Add Star</button> */}
        <button>Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovieForm;

// "id": 0,
// "title": "The Godfather",
// "director": "Francis Ford Coppola",
// "metascore": 100,
