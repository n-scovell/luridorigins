import useStore from '../data/store'
import MovieDisplay from '../comps/MoviesDisplay'
import { useEffect } from 'react'
import Loader from '../comps/Loader'
export default function About() {
  const {isLoading, searchVal, filterSearch, setSearchVal, getLuridOrigins, getAllLuridOrigins, mypage, limit} = useStore()
  useEffect(() => { getLuridOrigins(mypage, limit)}, [mypage])
  // useEffect(() => { getAllLuridOrigins(mypage, limit)}, [mypage])
  return (
    <>
    <div>
      <input
        value={searchVal}
        value={searchVal}
        onChange={(e) => {
          const val = e.target.value
          setSearchVal(val)
        }}
      />
      <button onClick={() => filterSearch(searchVal)}>SUBMIT</button>
    </div>
    {isLoading ? (
      <>
        <MovieDisplay />
      </>
      ) : (
      <Loader />
    )}
    </>
  )
}