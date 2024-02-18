import {useState, useEffect} from 'react';
import './App.css';
import SearchIcoin from './search.svg';
import MovieCard from "./MovieCard";
const API_URL = 'http://www.omdbapi.com?apikey=f618bf25';//f618bf25


const movie1 = {
    "Title": "The Batman",
    "Year": "2022",
    "imdbID": "tt1877830",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies("batman");
    }, [])


    return (
        <div className ="app">
            <h1>Movie Search</h1>
            <div className = "search">
                <input 
                    placeholder = "Search for Movies"
                    value = {searchTerm} //react input function needs value attribute
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcoin}
                    alt = "search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 
                ? (
                    <div className ="container">
                        {movies.map((movie) => (
                            <MovieCard movie = {movie} />
                        ))}
                    </div>
                ) : (
                    <div className ="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    );
}

export default App; //export every components in the App.js so we can call it in other files