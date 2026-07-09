
import Navigation from './routes/routes'
import Browser from './routes/browse'
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './states/testSlice'

function App() {
  const dispatch = useDispatch();
  const STATES = useSelector((state)=> state.counter)
  return (
    <>
      <div className="container">
        <Navigation/>
        <main>
          <Browser/>
        </main>
      </div>
    </>
  )
}
export default App
