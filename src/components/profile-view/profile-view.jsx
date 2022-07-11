import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Col, Row } from 'react-bootstrap';
import { Container } from 'react-router-dom';
import { FavoriteMoviesView } from './favorite-movies-view';
import { UpdateView } from './update-view';
import './profile-view.scss';

export function ProfileView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ favoriteMovies, setFavoriteMovies ] = useState([]);

  useEffect(() => {
    getUser()
  }, [])


  const getUser = () => {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios.get(`https://movieflixappbyedwin.herokuapp.com/users/${user}`,
    {
      headers: { Authorization: `Bearer ${token}`}
    }).then(response => {
      setUsername(response.data.username);
      setEmail(response.data.email)
      setFavoriteMovies(response.data.favoriteMovies)
      console.log(response.data)
    }).catch(error => console.error(error))
  }

  const handleDelete = () => {
    axios.delete(`https://movieflixappbyedwin.herokuapp.com/users/${currentUser}`,
    {
      headers: { Authorization: `Bearer ${token}`}
    }).then(() => {
      alert(`User: ${user.Username} has been successfully removed.`)
      localStorage.clear();
      window.open('/register', '_self');
    }).catch(error => console.error(error))
  }

  return (
    <Container className='profile-form'>
      <Row><h5>{user.Username}'s Profile</h5></Row>
      <Row className='profile-1'>
        <Col className='label'>Username</Col>
        <Col className='value'>{user.Username}</Col>
      </Row>
      <Row className='profile-1'>
        <Col className='label'>Password</Col>
        <Col className='value'>**********</Col>
      </Row>
      <Row className='profile-1'>
        <Col className='label'>E-mail</Col>
        <Col className='value'>{user.Email}</Col>
      </Row>
      <Row className='profile-1'>
        <Col className='label'>Birthday</Col>
        <Col className='value'>{user.Birthday}</Col>
      </Row>
      <Row className='profile-fav-movies'>
        <h5>Favorites: </h5>
      </Row>
      <Row className='profile-fav-movies-list'>
        <FavoriteMoviesView movies={movies} favoriteMovies={favoriteMovies}
        currentUser={currentUser} token={token}/>
      </Row>
      <UpdateView user={user}/>
      <Button className='remove-user-btn' variant='danger'
      onClick={handleDelete}>Delete Profile</Button>
    </Container>
  )

}




