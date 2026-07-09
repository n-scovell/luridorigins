import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWatchedMovies } from '../states/testSlice';

export default function About() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.movies);const STATES = useSelector((state)=> state.movies)
  
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchWatchedMovies());
    }
  }, [dispatch, items.length]);

  const filterName = (film, year) => {
    const filterName = film.replace(/[:\-()\/.,!'"]/g, '')
    return `${filterName} ${year}`
  }
  return (
    <div className='search'>
      <h2>Watched Movies ({items.length})</h2>
      <ul>
        {items.map((movie) => (
          <li key={movie.id || movie._id}>
            <img src={'images/processed/large/' + filterName(movie.movie,movie.year) + '.webp'} />
            {movie.movie} ({movie.year || movie.releaseYear})
          </li>
        ))}
      </ul>
    </div>
  );
}