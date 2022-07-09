import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies-view';
import UpdateUser from './update-user';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './profile-view.scss'
import { Container, Row, Col, Card } from 'react-bootstrap';


/* export function ProfileView({ movies }) {
  const [ user, setUser ] = useState({
    Username: '',
    Email: '',
    FavoriteMovies: []
  })
} */

//const favoriteMoviesList = movie.filter((movie) => {
  //returnuser.FavoriteMovies.includes(movies._id);
//});


/* useEffect(() => {
  let isMounted = true;
  isMounted && getUser();
  return () => {
    isMounted = false;
  }
}, []) */

  const handleDelete = () => {
    axios.delete(`https://movieflixappbyedwin.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`${user.Username}'s account was successfully removed.`)
      localStorage.clear();
      window.open('/register', '_self');
    })
    .catch(error => console.error(error))
  }

return (
  <Container>
    <Row>
      <Col xs={12} sm={4}>
        <Card>
          <Card.Body>
            <UserInfo name={user.Username} email={user.Email} />
          </Card.Body>
        </Card>
        
      </Col>

      <Col xs={12} sm={8}>
        <Card>
          <Card.Body>
            <UpdateUser handlesSubmit={handleSubmit}  handleUpdate={handleUpdate}/>
          </Card.Body>
        </Card>
      </Col>





    </Row>
    <FavoriteMovies favoriteMoviesList={favoriteMoviesList}/>
  </Container>
  
);


