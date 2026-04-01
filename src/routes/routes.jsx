import { Link } from 'react-router-dom';
import { GlobalMenu } from '../data/nav';
export default function Navigation() {
  return (
    <>
      <nav>
        <img src='/LuridOrigins_Logo.png' className="logo" />
        <ul>
          {GlobalMenu.map((i) => (
            <li className={i.item} key={i.item}>
              <Link to={i.path}>{i.item}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}