import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Row, Col, Button, Navbar } from 'react-bootstrap';
import { RegistrationView } from '../registration-view/registration-view';
import PropTypes from 'prop-types';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { Navbar, Nav } from 'react-bootstrap';


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

  return (
    <Router>
      <NavbarView user={user} />
      <Row className='main-view justify-content-md-center'>
        <Route exact path='/' render={() => {
          if(!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if(movies.length === 0) return <div className='main-view' />;
          return movies.map(m => (
            <Col md={4} lg={4} key={m._id}>
              <MovieCard movie={m} />
            </Col>
          ))
        }}/>

      <Route path='/register' render={() => {
        if(user) return <Redirect to='/' />
        return <Col>
        <RegistrationView />
        </Col>
      }} />

      <Route path='/movies/:movieid' render={({ match, history }) => {
        if(!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        </Col>
        if (movies.length === 0) return <div className='main-view' />;
        return <Col md={8}>
          <MovieView movie={movies.find(m => m._id === match.params.movieId)}
          onBackClick={() => history.goBack()} />
        </Col>
      }} />

      <Route path='/directors/:name' render={({ match, history }) => {
        if (!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        </Col>
        if (movies.length === 0) return <div className='main-view' />;
        return <Col md={8}>
          <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
          onBackClick={() => history.goBack()} />
        </Col>
      }} />

      <Route path='/genres/:name' render={({ match, history }) => {
        if (!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        </Col>
        if (movies.length === 0) return <div className='main-view' />;
        return <Col md={8}>
          <GenreView director={movies.find(m => m.Genre.Name === match.params.name).Genre}
          onBackClick={() => history.goBack()} />
        </Col>
      }} />

      <Route path={`/users/${user}`} render={({ match, history }) => {
        if (!user) return <Redirect to='/' />
        return <Col>
          <ProfileView user={user} history={history} movies={movies}
          onBackClick={() => history.goBack()} />
        </Col>

      }} />
      
      </Row>
    </Router>
  );
}
}
export default MainView;
        


// this represents a component in react
// import react from react is required for creating a component
// imports React into the file
// the render() function can only have one root element
//browser cant't understand JSX directly, use Babel compiler
