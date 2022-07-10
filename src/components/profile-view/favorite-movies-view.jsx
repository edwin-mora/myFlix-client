import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Col, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import './profile-view.scss';
import PropTypes from 'prop-types';
import { Container } from 'react-router-dom';

export function FavoriteMoviesView(props) {
  const { movies, favoriteMovies, currentUser, token } = this.props;

  const favoriteMoviesId = favoriteMovies.map(m => movies._id)
  const favoriteMoviesList = movies.filter(m => {
    return favoriteMoviesId.includes(movies._id)
  })

  const handleDelete = (movieId) => {
    axios.delete(`https://movieflixappbyedwin.herokuapp.com/users/${currentUser}/movies/${movieId}`,
    {
      headers: { Authorization: `Bearer ${token}`}
    }).then(() => {
      alert('The movie has been successfully removed.')
      window.open('/users/:username', '_self');
    }).catch(error => console.error(error))
  }

  return (
  <>
    <Container>
      {favoriteMoviesList.length === 0 ?(
        <h6>No favorite movies have been added yet!</h6>
      )
      :
      (
        favoriteMoviesList.map((movies) => {
          return (
            <Col xs={12} md={6} lg={3}>
              <Card className="fav-movie-card">
                <Link to={`/movies/${movies._id}`}>
                  <Card.Img variant="top" src={movies.ImagePath} />
                </Link>
                <Card.Body>
                  <Card.Title className="fav-movie-title">{movies.Title}</Card.Title>
                  <Card.Text className="fav-movie-txt">{movies.Description}</Card.Text>
                  <Link to={`/movies/${movies._id}`}>
                    <Button className="fav-btn" size="sm">Open</Button>
                  </Link>
                  <Button className="remove-btn" size="sm"
                  onClick={() => {handleDelete(movies._id)}} >
                    Remove from Favorites
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })
      )}
    </Container>
  </>
  )
}






FavoriteMovies.PropTypes = {
  movies: PropTypes.shape ({
    title: PropTypes.string.isRequired
  }).isRequired
};