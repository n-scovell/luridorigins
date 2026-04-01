import useStore from '../data/store'
import { useState, useEffect } from 'react';
import MDXLoader from './Movie'
// import Post from '../data/movies/test.mdx'
export default function Modal() {
    const {luridOrigins, modalOpen, closeModal, selectedMovie} = useStore()
    const [selMovie, setMovie] = useState(selectedMovie)
    const getFile = (film, year) => {
        const filterName = film.replace(/[:\-()\/.,!'"]/g, '')
        return `${filterName} ${year}`
    }
    const getMDX = (film, year) => {
        return `${film}${year}`
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
    }
    useEffect(() => {
    if (modalOpen) {
        const found = luridOrigins.find(
            lo => `${lo.Film} ${lo.Year}` === selectedMovie
        )
        if (found) setMovie(found)
    }
    }, [selectedMovie, modalOpen, luridOrigins])
    return (
        <section className="modal">
            <div className="modalContainer">
                <div className="poster">
                    {selMovie && selMovie.Film && (
                        <img src={`/images/processed/thumb/${getFile(selMovie.Film, selMovie.Year)}.jpg`}/>
                    )}
                </div>
                <div className="text">
                    <p>{selMovie.Film}</p>
                    <p>{selMovie.Year}-{selMovie.Era}</p>
                    <p>{selMovie.Director}</p>
                    <p>{selMovie.Actors}</p>
                    <MDXLoader file={`/posts/${getMDX(selMovie.Film, selMovie.Year)}.mdx`} />
                    {/* <MDXLoader file='/posts/evildeadii1987.mdx' /> */}
                </div>
                <button className="close" onClick={() => closeModal()}>X</button>
            </div>
        </section>
    )
}