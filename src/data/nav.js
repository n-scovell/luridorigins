import { lazy } from "react";
export const GlobalMenu = [
    { item:'Home', path:'/', comp:'Home' },
    { item:'ORIGINS', path:'/SearchFilms', comp:'SearchFilms'},
    { item:'GALLERY', path:'/SearchFilms', comp:'SearchFilms'},
    { item:'SHOP', path:'/SearchFilms', comp:'SearchFilms'},
    { item:'CONTACT', path:'/SearchFilms', comp:'SearchFilms'},
]
const modules = import.meta.glob('../pages/*.jsx');
export const comps = Object.fromEntries(
  Object.entries(modules).map(([path, loader]) => {
    const name = path.split('/').pop().replace('.jsx', '');
    return [name, lazy(loader)];
  })
);