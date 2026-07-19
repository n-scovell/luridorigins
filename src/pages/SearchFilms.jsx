import React, { useState, useEffect, useMemo  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWatchedMovies, actions } from '../states/testSlice';
import FilteredEffect from '../comps/posterFilter'

export default function About() {
  const dispatch = useDispatch();
  const [ myPage, setPage ] = useState(1)
  const { items, loading, error, itemsLoaded, lastSearch, pagination } = useSelector((state) => state.movies);const STATES = useSelector((state)=> state.movies)
  const [search, setSearch] = useState('');
  const [activeSide, setActive] = useState('all')

  useEffect(() => {
    if (!itemsLoaded) {
      dispatch(fetchWatchedMovies({ page: myPage, limit: 20 }));
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


  const handlePageChange = (newPage) => {
    
    dispatch(actions.addOne())
    dispatch(actions.changePage(newPage));
    dispatch(fetchWatchedMovies({ 
      page: newPage, 
      limit: pagination.limit 
    }));
  };

  return (
    <div className='search'>
      <div className="categoryChoice">
        <ul>
          <li onClick={() => handlePageChange(2)}>HEY</li>
          <li onClick={() => setSearch('')} ><img src="/allMovies.png"/>ALL MOVIES</li>
          <li onClick={() => setSearch('halloween')}><img src="/halloween.png"/>HALLOWEEN</li>
          <li onClick={() => setSearch('slasher')}><img src="/slasher.png"/>SLASHER</li>
          <li onClick={() => setSearch('monster')}><img src="/monster.png"/>MONSTER</li>
          {/* <li onClick={()=>sortEra()}>ERA</li> */}
        </ul>
      </div>
      <ul className="movies">

        <h2>
        The Lurid Origins Library - {movies.length}
        <img src="/Line1.png" />
        <div className="sort">
          <p>Search:</p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            
          />
        </div>
        
      </h2>
      {/* <div>
        <p>Page: {pagination.page}</p>
        <p>total pages: {pagination.totalPages}</p>
        <p>total items: {pagination.totalItems}</p>
        <p>limit: {pagination.limit}</p>
        <p>next: {pagination.hasPrev}</p>
      </div> */}
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
               <h3>RATING: {movie.rating}</h3>
               {/* <h3>DIRECTOR: {movie.director}</h3>
               <h3>STARRING: {movie.actors}</h3> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}