import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';



export class DirectorView extends React.Component {


  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card className="directorCard">
        <Card.Header className="director-card-title">{director.Name}</Card.Header>
        <Card.Body>
          <Card.Text>Born: {director.Birth}</Card.Text>
          <Card.Text>Bio: {director.Bio}</Card.Text>
          <Button variant="warning" 
          onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
      </Card>
    )
  }
}