import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export class GenreView extends React.Component {
  constructor() {
    super()
    this.state;
  }

  render() {
    const { genre, genreMovies, onBackClick } = this.props;
    return (
      <Container className='md-center2' style= {{ width: '60%' }}>
        <h2 className='gen'>{genre.name}</h2>
        <Button variant='link' onClick={onBackClick}>
          Back
        </Button>

        <h3 className='secondary'>Descirption: </h3>
        <p>{genre.description}</p>
        <h3 className='secondary'>Movies that have this genre: </h3>
        <Row className='justify-content-md-center'>
          {genreMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie}>
              {movie.title}
            </MovieCard>
          ))}
        </Row>
      </Container>
    );
  }
}