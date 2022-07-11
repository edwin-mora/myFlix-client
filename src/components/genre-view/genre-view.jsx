import React from 'react';
import { Card, Button } from 'react-bootstrap';



export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Card className="genre-card">
        <Card.Header>{genre.Name}</Card.Header>
        <Card.Body>
          <Card.Text>{genre.Description}</Card.Text>
          <Button variant="warning" onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
      </Card>
    )
  }

}