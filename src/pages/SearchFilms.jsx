import React, { useState, useEffect, useMemo  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWatchedMovies, actions } from '../states/testSlice';
import FilteredEffect from '../comps/posterFilter'

export default function About() {
  const dispatch = useDispatch();
  const { items, loading, error, itemsLoaded, lastSearch } = useSelector((state) => state.movies);const STATES = useSelector((state)=> state.movies)
  const [search, setSearch] = useState('');
  const [activeSide, setActive] = useState('all')

  useEffect(() => {
    if (!itemsLoaded) {
      dispatch(fetchWatchedMovies());
    }
  }, [dispatch, itemsLoaded]);


//   const groups = search
//   .toLowerCase()
//   .split(",")
//   .map(group =>
//     group
//       .split("&")
//       .map(term => term.trim())
//       .filter(Boolean)
//   )
//   .filter(group => group.length);


//   const movies = useMemo(() => {
//   return items.filter(movie => {
//     return groups.some(group =>
//       group.every(term =>
//         movie.movie.toLowerCase().includes(term) ||
//         (movie.director || "").toLowerCase().includes(term) ||
//         movie.year.toString().includes(term) ||
//         movie.era.toLowerCase().includes(term) ||
//         movie.tags.some(tag => tag.toLowerCase().includes(term)) ||
//         movie.actors.some(actor => actor.toLowerCase().includes(term))
//       )
//     );
//   });
// }, [items, search]);



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

  // const golden = []
  // const silver = []
  // const bronze = []

  // const filmsByCategory = {
  //   "Golden Age": golden,
  //   "Silver Age": silver,
  //   "Bronze Age": bronze,
  // };

  // const sortEra = () => {
  //   movies.forEach(film => {
  //     switch (film.era.toLowerCase()) {
  //       case "golden":
  //         golden.push(film);
  //         break;
  //       case "silver":
  //         silver.push(film);
  //         break;
  //       case "bronze":
  //         bronze.push(film);
  //         break;
  //     }
  //   })
  //   doThis()
  // }

  // const doThis = () => {
  //   Object.entries(filmsByCategory).forEach(([header, filmArray]) => {
  //     filmArray.forEach(film => {
  //       console.log(`• ${film.movie} (${film.year})`);
  //     });
  //   });
  // }
  

  const filterName = (film, year) => {
    const filterName = film.replace(/[:\-()\/.,!'"]/g, '')
    return `${filterName} ${year}`
  }


  return (
    <div className='search'>
      <div className="categoryChoice">
        <ul>
          <li onClick={()=>setSearch('')} ><img src="/allMovies.png"/>ALL MOVIES</li>
          <li onClick={()=>setSearch('halloween')}><img src="/halloween.png"/>HALLOWEEN</li>
          <li onClick={()=>setSearch('slasher')}><img src="/slasher.png"/>SLASHER</li>
          <li onClick={()=>setSearch('monster')}><img src="/monster.png"/>MONSTER</li>
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