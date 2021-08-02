import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";

class App extends React.Component {
  state = {
    movies: [],
    searchQuery: "",
  };

  //HERHANGİBİR HTTP İSTEĞİ YAPACASAK BU METODUN İÇERİNDE YAPILMASI DOPRUDUR
  async componentDidMount() {
    const baseURL = "http://localhost:3002/movies";
    const response = await fetch(baseURL);
    console.log(response);
    const data = await response.json();
    console.log(data);
    this.setState({ movies: data });
  }

  deleteMovie = (movie) => {
    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);
    /*   this.setState({
      movies: newMovieList,      //Elimizde bir film bilgiis olmasaydı bu kullanılablirdi ama aşağıdaki şu an ki statei alıp kullandığı için terih edilmiştir.
    }); */
    this.setState((state) => ({
      movies: newMovieList,
    }));
  };

  searchMovie = (event) => {
    /* console.log(event.target.value); */
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    let filteredMovies = this.state.movies.filter((movie) => {
      return (
        movie.name
          .toLowerCase()
          .indexOf(this.state.searchQuery.toLowerCase()) !== -1
      );
    });

    return (
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-lg-12"}>
            <SearchBar searchMovieProp={this.searchMovie} />
          </div>
        </div>
        <MovieList movies={filteredMovies} deleteMovieProp={this.deleteMovie} />
      </div>
    );
  }
}

export default App;
