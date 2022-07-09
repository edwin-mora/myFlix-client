import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

export function LoginView(props) {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
    // declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

    // validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username is required.');
      isReq = false;
    } else if(username.length <2 ){
      setUsernameErr('Username must be 2 characters long.');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password is required.');
      isReq = false;
    } else if(password.length < 6){
      setPassword('Password must be 6 characters long.');
      isReq = false;
    }
    return isReq;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      // send request to the server for authentication`
      axios.post('https://movieflixappbyedwin.herokuapp.com/login',{
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user exists')
      });
  }
        
};

return (
    
<Container>
  <Row>
  <Col>
  <Card style={{ marginTop: 100, marginBottom: 50, width: '30'}}>
  <Card.Body>
    <Card.Title style={{ textAlign: 'center', fontSize: '2r'}}>

    <Form className='login-border'>
      <Form.Group controlId='formUsername'>
      <Form.Label>Username:</Form.Label>
      <Form.Control type='text' value={username}
      onChange={e => setUsername(e.target.value)}/>
      {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>
                            
      <Form.Group controlId='formPassword'>
      <Form.Label>Password:</Form.Label>
      <Form.Control type='password' value={password}
      onChange={e => setPassword(e.target.value)} />
      {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
                        
      <Button variant='primary' type='submit'
      onClick={handleSubmit}> Submit </Button>
    </Form>
      </Card.Title>
    </Card.Body>
    </Card>
    </Col>
    </Row>
</Container>

);

}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }), onLoggedIn: PropTypes.func.isRequired
};

// the component stores the username and password in its local state
// uses them to fill in two inputs, listens for changes, and updates state
// inputs were chosen based on the login endpoint in the API, expects a POST with username + pass
// the useState hook provides a way to simplify redundancy, rewrite class component above
// to be more readable