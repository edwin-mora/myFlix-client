import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export class DirectorView extends React.Component {
  render () {
    const { director, directorsMovies, onBackClick } = this.props;
    return (
      <Container className='md-center1'>
        <h2>{director.name} </h2>
        <p> Born: {director.birthYear}</p>
        <Button variant='link' onClick={onBackClick}>
        Back
        </Button>
        <h3 className='secondary'>Bio: </h3>
        <p>{director.bio}</p>
        <h3 className='justify-content-md-center'> Movies Directed: </h3>
        <Row className='justify-content-md-center'>
          {directorsMovies.map((movie) => {
            <MovieCard key={movie._id} movie={movie}>
              {movie.title}
            </MovieCard>
          })}
        </Row>
      </Container>
    );
  }
}