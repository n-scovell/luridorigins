import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../data/store'

export default function MoviesDisplay() {
  const { luridOriginsLimit, setMovie } = useStore()

  const getFile = (film, year) => {
    const filterName = film.replace(/[:\-()\/.,!'"]/g, '')
    return `${filterName} ${year}`
  }

  const moviesKey = luridOriginsLimit.map(m => m.Film + m.Year).join('-')

  return (
    <section className="inner">
      <AnimatePresence initial={false}>
        <motion.div
          key={moviesKey}
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ duration: .5 }}
        >
          <ul>
            {luridOriginsLimit.map((m) => (
              <li key={m.Film + m.Year}>
                <div className="poster">
                  <img
                    src={`/images/processed/thumb/${getFile(m.Film, m.Year)}.jpg`}
                    alt={m.Film}
                    className="w-full h-auto rounded"
                  />
                </div>
                <div className="text">
                  <h3>{m.Film}</h3>
                  <p>{m.Year}</p>
                  <button onClick={() => setMovie(m.Film, m.Year.toString())}>SEE FILM</button>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}