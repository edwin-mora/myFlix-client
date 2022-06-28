import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [], 
            selectedMovie: null
        };
    }

componentDidMount(){
    axios.get('https://movieflixappbyedwin.herokuapp.com/movies')
    .then(response => {
        this.setState({
            movies: response.data
        });
    })
    .catch(error => {
        console.log(error);
    });
}



    setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
}


    render(){
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className='main-view'></div>;

        return (
            <div className='main-view'>
                {selectedMovie
                ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={movie => 
                {this.setSelectedMovie(movie); }}/>
            ))
            } 
            </div>
        );
    }
}







export default MainView;

// this represents a component in react
// import react from react is required for creating a component
// imports React into the file
// the render() function can only have one root element
//browser cant't understand JSX directly, use Babel compiler
