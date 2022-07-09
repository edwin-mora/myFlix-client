import React from 'react';
import { Form } from 'react-bootstrap';

function UpdateUser({ handlesSubmit, handleUpdate }) {
  return (
  <>
  <h4>Update</h4>

    <Form className='profile-form' onSubmit={(e) => handlesSubmit(e)}>
      <h2>Need to change some info?</h2>

      <Form.Group>
      <Form.Label>Username:</Form.Label>
      <Form.Control type='text' name='Username' defaultValue={user.Username} 
      onChange={e => handleUpdate(e)} required placeholder='enter a username'
       />
      </Form.Group>

      <Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Control type='password' name='password' defaultValue=''
      onChange={e => handleUpdate(e)} required minLength={8}
      placeholder='Password must be 8 or more characters long' />
      </Form.Group>

      <Form.Group>
      <Form.Label>Email address</Form.Label>
      <Form.Control type='email' defaultValue={user.Email} 
      onChange={e => handleUpdate(e)} required placeholder='enter your email address' />
      </Form.Group>

      <Button variant='primary' type='submit' onClick={handlesSubmit}>
      Submit
      </Button>
    </Form>
</>
  )
}

export default UpdateUser