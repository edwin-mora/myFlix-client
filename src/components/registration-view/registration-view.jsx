import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://movieflixappbyedwin.herokuapp.com/users',{
          Username: username,
          Password: password,
          Email: email
        }).then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self');
          //second argument is so that page will open in current tab
        }). catch(e => {
          console.log('error when registering user');
          alert('Something wasn\t entered right!');
        });
    };

return (
  <Container>
    <Row>
      <Col>
        <CardGroup>
          <Card>
            <Card.Body>
            <Card.Title>Please Register</Card.Title>
  <Form>
    <Form.Group>
    <Form.Label>Username:</Form.Label>
    <Form.Control
      type="text" value={username}
      onChange={(e) => setUsername(e.target.value)} 
      required
      placeholder="Enter a username" />
    </Form.Group>

     <Form.Group>
     <Form.Label>Password:</Form.Label>
     <Form.Control
      type="text" value={password}
      onChange={(e) => setPassword(e.target.value)} 
      required
      minLength="8"
      placeholder="Your password must be 8 or more characters" />
    </Form.Group>

    <Form.Group>
    <Form.Label>Email</Form.Label>
    <Form.Control
      type="email" value={password}
      onChange={(e) => setEmail(e.target.value)} 
      required
      placeholder="Enter email address" />
    </Form.Group>

    <Button variant="primary" type="submit"
    onClick={handleSubmit}>
      Submit
    </Button>
  </Form>
      </Card.Body>
      </Card>
      </CardGroup>
    </Col>
  </Row>
</Container>

    );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired
};