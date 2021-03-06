import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

    //add event listener and keycallback function:

render() {
  const { movie, onBackClick } = this.props;
  
  return (
  <div className='movie-view'>
  <div className='movie-poster'>
    <img style={{ height: "20rem" }}src={movie.ImagePath} />
  </div>
  
  <div className='movie-title'>
    <span className='label'>Title: </span>
    <span className='value'>{movie.Title}</span>
  </div>
  
  <div className='movie-description'>
    <span className='label'>Description: </span>
    <span className='value'>{movie.Description}</span>
  </div>
  
  <div className='movie-genre'>
    <span className='label'>Genre: </span>
    <span className='value'>{movie.Genre}</span>
  </div>
                
  <div className='movie-director'>
    <span className='label'>Director: </span>
    <span className='value'>{movie.Director}</span>
  </div>
  
  <button onClick={() =>{ onBackClick(null); }}>Back</button>
  </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};