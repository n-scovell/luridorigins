import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './data/store';
import './style/index.css'
import LuridOrigins from './App.jsx'



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <LuridOrigins />
    </BrowserRouter>
  </Provider>,
)
