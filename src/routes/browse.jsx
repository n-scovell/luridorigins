import { Routes, Route } from 'react-router-dom';
import { Suspense } from "react";
import { GlobalMenu, comps } from '../data/nav';

function Browse() {
  return (
    <>
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

export default Browse;