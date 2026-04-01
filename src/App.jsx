import useStore from './data/store'
import Navigation from './routes/routes'
import Browser from './routes/browse'
import { useEffect } from 'react'
import Pagin from './comps/Pagination'
import MDisplay from './comps/MoviesDisplay'
import Loader from './comps/Loader'
import Modal from './comps/Modal'
import LO from '/LuridOrigins_Logo.png'
function App() {
  const {
    getLuridOrigins, 
    getAllLuridOrigins, 
    modalOpen, 
    mypage, 
    limit,
    } = useStore()
  // useEffect(() => { getLuridOrigins(mypage, limit)}, [mypage])
  // useEffect(() => { getAllLuridOrigins(mypage, limit)}, [mypage])
  return (
    <>
      <div className="mainContainer">
        <Navigation/>
        <div className="pages">
          <Browser/>
        </div>
      </div>
      {modalOpen && <Modal />}
    </>
  )
}

export default App
