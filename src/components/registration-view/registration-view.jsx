import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ nameErr, setNameErr ] = useState('');
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');

    const validate = () => {
      let isReq = true;
      if(name){
        setNameErr('Name is required.');
        isReq = false;
      }
      if(!username){
        setUsernameErr('Username is required.');
        isReq = false;
      } else if(username.length <2){
        setUsernameErr('Username must be longer than 2 characters.');
        isReq = false;
      }
      if(!password){
        setPasswordErr('Password is required');
        isReq = false;
      } else if(password.length < 6){
        setPasswordErr('Password must be 6 characters long');
        isReq = false;
      }
      if(!email){
        setEmailErr('Email is required.');
        isReq = false;
      } else if(email.indexOf('@') === -1 ){
        setEmailErr('Email is invalid');
        isReq = false;
      }
      return isReq;
    }

    




    const handleSubmit = (e) => {
      e.preventDefault();
      const isReq = validate();
      if(isReq){
        axios.post('https://movieflixappbyedwin.herokuapp.com/users', {
          Name: name,
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please login!');
          window.open('/', '_self'); //self is necessary so that the page opens in the current tab
        })
        .catch(response => {
          console.error(response);
          alert('unable to register');
        });
      }
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
    <Form.Group controlId='formUsername' className='reg-form-inputs'>
    <Form.Label>Username:</Form.Label>
    <Form.Control
      type="text" value={username}
      onChange={(e) => setUsername(e.target.value)} 
      required
      placeholder="Enter a username" />
      {usernameErr && <p>{usernameErr}</p>}
    </Form.Group>

    <Form.Group controlId='formName' className='reg-form-inputs'>
    <Form.Label>Name:</Form.Label>
    <Form.Control
      type="text" value={name}
      onChange={(e)=> setName(e.target.value)}
      required
      placeholder="What is your name?"/>
      {nameErr && <p>{nameErr}</p>}
    </Form.Group>

     <Form.Group controlId='formPassword' className='reg-form-inputs'>
     <Form.Label>Password:</Form.Label>
     <Form.Control
      type="text" value={password}
      onChange={(e) => setPassword(e.target.value)} 
      required
      minLength="6"
      placeholder="Your password must be 6 or more characters" />
      {passwordErr && <p>{passwordErr}</p>}
    </Form.Group>

    <Form.Group controlId='formEmail' className='reg-form-inputs'>
    <Form.Label>Email</Form.Label>
    <Form.Control
      type="email" value={password}
      onChange={(e) => setEmail(e.target.value)} 
      required
      placeholder="Enter email address" />
      {emailErr && <p>{emailErr}</p>}
    </Form.Group>

    <Form.Group controlId='updateBirthday'>
    <Form.Label>Birthday</Form.Label>
    <Form.Control
      type="date" name="birthday"
      onChange={(e) => setBirthday(e.target.value)}/>
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
  onRegistration: PropTypes.func.isRequired,
  Name: PropTypes.string.isRequired,
  Username: PropTypes.string.isRequired,
  Password: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired
};