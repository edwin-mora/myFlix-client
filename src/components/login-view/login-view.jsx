import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

export function LoginView(props) {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        //send a request to the server for authentication
        // call props.onLoggedIn(username)
        props.onLoggedIn(username);
        
    }

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
      </Form.Group>
                            
      <Form.Group controlId='formPassword'>
      <Form.Label>Password:</Form.Label>
      <Form.Control type='password' value={password}
      onChange={e => setPassword(e.target.value)} />
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