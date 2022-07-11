import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card className='movie-view'>
        <Card.Img className='movie-img' variant='top'
        src={movie.ImagePath}/>
        <Card.Title className='movie-view-title'>{movie.Title}</Card.Title>

        <Card.Text className='movie-view-txt'>Description</Card.Text>
        <Card.Text className='movie-view-txt'>{movie.Description}</Card.Text>

        <Card.Text className='movie-view-direct'>Director: 
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant='link'>Director Info</Button>
          </Link>
        </Card.Text>

        <Card.Text className='movie-view-genre'>Genre: 
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant='link'>Genre Info</Button>
          </Link>

          <Button onClick={() => { onBackClick(null);}}>Back</Button>
        </Card.Text>
      </Card>
    );
  }
}

MovieView.PropTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};