import React, { Component } from "react";

import Input from "./common/input";
import { genres, getMovie, saveMovie } from "./../services/fakeMovieService";
import { getGenres } from "./../services/fakeGenreService";

class MovieForm extends Component {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({
      data: this.mapToViewModel(movie),
    });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  handleChange = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      data,
    });
    console.log(data);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    saveMovie(this.state.data);
    console.log("form submitted");
    this.props.history.push("/movies");
  };

  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="title"
            value={this.state.data.title}
            label="Title"
            onChange={this.handleChange}
            type="text"
          />
          <label htmlFor="genre">Genre</label>
          <select
            className="form-select"
            name="genreId"
            id="genre"
            value={this.state.genres}
            onChange={this.handleChange}
          >
            {this.state.genres.map((option) => (
              <option value={option._id}>{option.name}</option>
            ))}
          </select>
          <Input
            name="numberInStock"
            value={this.state.data.numberinstock}
            label="Number In Stock"
            onChange={this.handleChange}
            type="Number"
          />
          <Input
            name="dailyRentalRate"
            value={this.state.data.rate}
            label="Rate"
            onChange={this.handleChange}
            type="Number"
          />
          {/* <h1>Movie Forms - {match.params.id}</h1> */}
          <button className="btn btn-primary mt-4">Save</button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
