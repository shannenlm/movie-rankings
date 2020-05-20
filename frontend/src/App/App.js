import React, { Component } from 'react';
import './App.css';
import AddMovie from '../AddMovie/AddMovie.js'
import DeleteMovie from '../DeleteMovie/DeleteMovie.js'
import Movie from '../Movie/Movie.js'

import { 
  Button,
  TextField
} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default class App extends Component {
  constructor() { 
    super();

    this.state = { 
      movies: [],
      showAddMovie: false,
      showDeleteMovie: false,
      searchParam: ""
    }
  }

  componentDidMount() { 
    this.getData();
  }

  // GET request -- all movies
  getData() { 
    fetch('/movies')
    .then(res => res.json())
    .then((movies) => {this.setState({
      movies: movies.info.sort((a, b) => (a.upvotes < b.upvotes) ? 1 : -1) // sorts by upvotes
      })
    })
  }

  // GET request -- searches by title
  search(searchParam) { 
    fetch('/movies/' + searchParam)
    .then(res => res.json())
    .then((movies) => {this.setState({
      movies: movies.info.sort((a, b) => (a.upvotes < b.upvotes) ? 1 : -1) // sorts by upvotes
      })
    })
  }

  // POST request -- add new movie
  onSubmitAddMovie(title, director, genres, country, year, image) { 
    this.onCloseAddMovie();  // closes AddMovie modal

    let data = {title: title, director: director, genres: genres, 
      country: country, year: year, image: image, upvotes: 1}
    let options = {
    method: 'post',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    }
    fetch('/movies', options)
    .then(this.getData())  // rerenders app with new data
  }

  // PUT call -- add 1 to upvote
  addUpvote(title, director, genres, country, year, image, upvotes) { 
    let data = {title: title, director: director, genres: genres, 
      country: country, year: year, image: image, upvotes: upvotes}
    let options = {
    method: 'put',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    }
    fetch('/movies/addUpvote', options)
    .then(this.getData())  // rerenders app with new data
  }

  // PUT call -- remove 1 from upvote
  removeUpvote(title, director, genres, country, year, image, upvotes) { 
    let data = {title: title, director: director, genres: genres, 
      country: country, year: year, image: image, upvotes: upvotes}
    let options = {
    method: 'put',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    }
    fetch('/movies/removeUpvote', options)
    .then(this.getData())  // rerenders app with new data
  }

  // DELETE request -- delete a specific entry
  onDelete(title, director, genres, country, year, image, upvotes) { 
    let data = {title: title, director: director, genres: genres, 
      country: country, year: year, image: image, upvotes: upvotes}
    let options = {
    method: 'delete',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    }
    fetch('/movies', options)
    .then(this.getData())  // rerenders app with new data
  }

  // DELETE -- will delete a movie based on three parameters only
  onFormDelete(title, director, year) { 
    this.onCloseDeleteMovie();  // close delete modal

    let data = {title: title, director: director, year: year}
    let options = {
    method: 'delete',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    }
    fetch('/movies/formDelete', options)
    .then(res => res.json())
    .then((response) => {
      if (!response.info) { 
        alert("Error: No movie found.") // alerts the user if no movie is deleted
      }
    })
    .then(this.getData())  // rerenders app with new data
  }

  // open AddMovie modal
  onOpenAddMovie() { 
    this.setState({
      showAddMovie: true
    })
  }
  
  // close AddMovie modal
  onCloseAddMovie() { 
    this.setState({
      showAddMovie: false
    })
  }

  // open DeleteMovie modal
  onOpenDeleteMovie() { 
    this.setState({
      showDeleteMovie: true
    })
  }
  
  // close DeleteMovie modal
  onCloseDeleteMovie() { 
    this.setState({
      showDeleteMovie: false
    })
  }

  render() {
    return (
      <div className="App">
        <div className="header"> 
          <div className="margin"> 
            <h1>Movie Rankings</h1>
            <div className="header-options">
              <Button 
                className="button"
                onClick={() => this.onOpenAddMovie()}
                startIcon={<AddCircleIcon />}
                variant="contained"
              >
                Add a Movie
              </Button>
              <Button 
                className="button"
                onClick={() => this.onOpenDeleteMovie()}
                startIcon={<DeleteForeverIcon />}
                variant="contained"
              >
                Delete a Movie
              </Button>
              <span className="search-bar"> 
                <TextField
                  label="Search by title"
                  onChange={(event) => {
                    this.search(event.target.value)
                  }}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="movies-list">
          {this.state.movies.map(movie => 
            <Movie 
              removeUpvote={(title, director, genres, country, year, image, upvotes) => 
                        this.removeUpvote(title, director, genres, country, year, image, upvotes)
              }
              addUpvote={(title, director, genres, country, year, image, upvotes) => 
                        this.addUpvote(title, director, genres, country, year, image, upvotes)
              }
              onDelete={(title, director, genres, country, year, image, upvotes) => 
                        this.onDelete(title, director, genres, country, year, image, upvotes)
              }
              title={movie.title}
              director={movie.director}
              genres={movie.genres}
              country={movie.country}
              year={movie.year}
              image={movie.image}
              upvotes={movie.upvotes}
            />
          )}
        </div> 

        <AddMovie 
          showAddMovie={this.state.showAddMovie}
          onClose={() => this.onCloseAddMovie()}
          handleSubmit={(title, director, genres, country, year, image) => 
            this.onSubmitAddMovie(title, director, genres, country, year, image)
          }
        />

        <DeleteMovie 
          showDeleteMovie={this.state.showDeleteMovie}
          onClose={() => this.onCloseDeleteMovie()}
          handleSubmit={(title, director, year) => 
            this.onFormDelete(title, director, year)
          }
        />
      </div>
    )
  }
}
