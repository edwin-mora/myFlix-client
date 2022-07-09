import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Row, Col, Button } from 'react-bootstrap';
import { RegistrationView } from '../registration-view/registration-view';
import PropTypes from 'prop-types';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


import './main-view.scss';


export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [], 
      selectedMovie: null
  };
}

componentDidMount() {
  let accessToken = localStorage.getItem('token');
  if(accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
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

onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.Username
  });

  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
}


onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({
    user: null
  });
}

setSelectedMovie(newSelectedMovie) {
 this.setState({
   selectedMovie: newSelectedMovie
  });
}

render(){
  const { movies, user } = this.state;

  //if there's no user, the LoginView is rendered, if the user is logged in, the user
  //detailes are passed as a prop to the LoginView

  //before the movies have been loaded
  if(!movies)
  return (
    <div className='main-view'>Nothing here yet..</div>
  );



return (
  <Router>
    <Row className='main-view justify-content-md-center'>
      <Route exact path='/' render={() => {
        if(!user) {
          return <LoginView onLoggedIn={this.onLoggedIn} />;
        } return (
          <Row className='main-view justify-content-md-center'>
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie}> {movie.title}
              </MovieCard>
            ))}
            </Row>
        );
      }} />
    
      <Route path='/regsiter' render={() => {
        if(user) return <Redirect to='/' />;
        return <RegistrationView/>;
      }} />


        
        <Route path='/movies/:movideId' render={({ match, history }) => {
          return <Col md={8}>
            <MovieView movie={movies.find(m=> m._id === match.params.movieId)}
            onBackClick={() => history.goBack()} />
          </Col>
        }} />

        <Route path='/directors/:name' render={({ match, history }) => {
          if (movies.length === 0) return <div className='main-view' />;
          return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
            onBackClick={() => history.goBack()} />
          </Col>
        }}/>
      </Row>
    </Router>
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
