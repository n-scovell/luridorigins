import { useEffect } from 'react'
import useStore from '../data/store'
import MovieDisplay from '../comps/MoviesDisplay'
import Pagination from '../comps/Pagination'
import Loader from '../comps/Loader'
export default function About() {
  const {isLoading, searchVal, filterSearch, setSearchVal, getLuridOrigins, getAllLuridOrigins, mypage, limit} = useStore()
  useEffect(() => { getLuridOrigins(mypage, limit)}, [mypage])
  useEffect(() => { getAllLuridOrigins(mypage, limit)}, [mypage])
  return (
    <>
    <div className="searchFilms">
      <h1>Search every film</h1>
      <p>
        Go ahead and take a look at all the horror films I have ever watched!
        Starting in order by date, you can see every movie from the Golden Era straight 
        up to the Modern crappy Blumhouse movies!
      </p>
      <div className="mainSearch">
        <input
          value={searchVal}
          value={searchVal}
          onChange={(e) => {
            const val = e.target.value
            setSearchVal(val)
          }}
        />
        <button onClick={() => filterSearch(searchVal)}>FIND</button>
      </div>
      {isLoading ? (
        <>
          <div className="movieDisplay">
            <Pagination />
            <MovieDisplay />
          </div>
        </>
        ) : (
        <Loader />
      )}
    </div>
    </>
  )
}