import { Routes, Route, Link } from 'react-router-dom';
import { Suspense, lazy } from "react";
import { GlobalMenu } from '../data/nav';
const modules = import.meta.glob('../pages/*.jsx');

const comps = Object.fromEntries(
  Object.entries(modules).map(([path, loader]) => {
    const name = path.split('/').pop().replace('.jsx', '');
    return [name, lazy(loader)];
  })
);

function Navigation() {
  return (
    <>
      <nav>
        <ul>
          {GlobalMenu.map((i) => (
            <li className={i.item} key={i.item}>
              <Link to={i.path}>{i.item}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {GlobalMenu.map((n) => {
            const LComp = comps[n.comp];
            if (!LComp) {
              return (
                <Route key={n.path} path={n.path} element={<div>Page not found: {n.item}</div>} />
              );
            }
            return (
              <Route key={n.path} path={n.path} element={<LComp />} />
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
}

export default Navigation;