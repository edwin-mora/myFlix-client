import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './main-view.scss';


export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [], 
      selectedMovie: null
  };
}

componentDidMount(){
  axios.get('https://movieflixappbyedwin.herokuapp.com/movies')
  .then(response => {
    this.setState({
      movies: response.data
    });
  })
  .catch(error => {
    console.log(error);
  });
}


// when a movie is clicked, this function is invoked and updates the state of the 'selectedMovie'
// property to that movie

setSelectedMovie(newSelectedMovie) {
  this.setState({
    selectedMovie: newSelectedMovie
  });
}

// whena user successfully logs in, this function updates the 'user' property in state to that user
onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.Username
  });

  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
}

//getMovies method
getMovies(token) {
  axios.get('https://movieflixappbyedwin.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // assign the result to the state
    this.setState({
      movies: response.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });

}

render(){
  const { movies, selectedMovie, user } = this.state;

  //if there's no user, the LoginView is rendered, if the user is logged in, the user
  //detailes are passed as a prop to the LoginView

  if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

  //before the movies have been loaded

  if (movies.length === 0) return <div className='main-view'></div>;
        
  return (
  <div className='main-view'>
    {selectedMovie
    ? (
    <Row md={2} className='justify-content-md-center'>
    <Col md={8}>
    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
    </Col>
    </Row>
    )
    : 
    (
    <Row md={2} className='justify-content-md-center'>
      {movies.map(movie => (
    <Col md={6}>
      <MovieCard key={movie._id} movie={movie} onMovieClick={movie => 
        {this.setSelectedMovie(movie); }}/>
    </Col>
    ))}
    </Row>
    ) 
    }
  </div>
  );
}
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired
  }).isRequired
};









export default MainView;

// this represents a component in react
// import react from react is required for creating a component
// imports React into the file
// the render() function can only have one root element
//browser cant't understand JSX directly, use Babel compiler
