import React, { useState, useEffect, useMemo  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWatchedMovies, actions } from '../states/testSlice';
import FilteredEffect from '../comps/posterFilter'

export default function About() {
  const dispatch = useDispatch();
  const { items, loading, error, itemsLoaded, lastSearch } = useSelector((state) => state.movies);const STATES = useSelector((state)=> state.movies)
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!itemsLoaded) {
      dispatch(fetchWatchedMovies());
    }
  }, [dispatch, itemsLoaded]);

  const movies = useMemo(() => {
    const searchTerms = search
        .toLowerCase()
        .split(",")
        .map(term => term.trim())
        .filter(Boolean);
      return items.filter((movie) => {
        return searchTerms.every(term => {
          return (
            movie.movie.toLowerCase().includes(term) ||
            (movie.director || "").toLowerCase().includes(term) ||
            movie.year.toString().includes(term) ||
            movie.era.toLowerCase().includes(term) ||
            movie.tags.some(tag => tag.toLowerCase().includes(term)) ||
            movie.actors.some(actor => actor.toLowerCase().includes(term))
          );
        });
      });
  }, [items, search]);

  const filterName = (film, year) => {
    const filterName = film.replace(/[:\-()\/.,!'"]/g, '')
    return `${filterName} ${year}`
  }


  return (
    <div className='search'>
      <h2>
        The Lurid Origins Library - {movies.length}
        <img src="/Line1.png" />
        <div class="sort">
          <p>Search:</p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            
          />
        </div>
      </h2>
      <ul className="categoryChoice">
        <li>ALL MOVIES</li>
        <li>TRENDY FUCKERS</li>
        <li>NEW RELEASES</li>
        <li>TOP RATED</li>
        <li>HALLOWEEN PICKS</li>
        <li>SLASHER</li>
        <li>MONSTER</li>
        <li>ICONS</li>
        <li>GHOSTS</li>
      </ul>
      <ul className="movies">
        {movies.map((movie) => (
          <li key={movie.id || movie._id}>
            <div className="image">
              <div className="cont">
                <FilteredEffect myStyle='cool' />
                <img src={'images/processed/large/' + filterName(movie.movie,movie.year) + '.webp'} />
              </div>

            </div>
            <div className="text">
               <h4>{movie.movie}</h4>
               <h3>YEAR: {movie.year || 'NA'}</h3>
               {/* <h3>DIRECTOR: {movie.director}</h3>
               <h3>STARRING: {movie.actors}</h3> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}