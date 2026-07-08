import { Link } from 'react-router-dom';
import { GlobalMenu } from '../data/nav';
import { useState, useEffect, useRef } from 'react'
import '../style/nav.css'
export default function Navigation() {
  const [activeBt, setBt] = useState(window.location.pathname)
  useEffect(() => { 
    setBt(window.location.pathname)
  }, [])
  useEffect(()=> {
    console.log(activeBt)
  },[activeBt])
  return (
    <>
    <header>
        <div className="logo">
          <Link to='/' onClick={()=> setBt('/')}>
            <img src='/LuridOrigins_Logo.png' />
          </Link>
        </div>
        <nav>
          <ul>
            {GlobalMenu.map((i) => (
              <li key={i.item} id={i.comp} className={activeBt === i.path ? 'active' : ''}>
                <Link to={i.path} onClick={()=> setBt(i.path)}>{i.item}</Link>
              </li>
            ))}
          </ul>
        </nav>
    </header>
    </>
  )
}