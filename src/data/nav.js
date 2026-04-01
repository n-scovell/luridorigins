import { lazy } from "react";
export const GlobalMenu = [
    { item:'Home', path:'/', comp:'Home' },
    { item:'Search Films', path:'/SearchFilms', comp:'SearchFilms'},
    { item:'History', path:'/History', comp:'History'},
]
const modules = import.meta.glob('../pages/*.jsx');
export const comps = Object.fromEntries(
  Object.entries(modules).map(([path, loader]) => {
    const name = path.split('/').pop().replace('.jsx', '');
    return [name, lazy(loader)];
  })
);