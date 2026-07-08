import React, { useState, useEffect } from 'react';
import FilteredEffect from '../comps/posterFilter'
export default function About() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://lurid-origins-api.vercel.app/api/movies'); 
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        let filtered = data.filter(item => item.watched === true);
        filtered.sort((a, b) => {
          return new Date(b.watchedDate || b.updatedAt || b.createdAt) - 
                 new Date(a.watchedDate || a.updatedAt || a.createdAt);
        });
        filtered.sort((a, b) => {
          const yearA = a.year || a.releaseYear || a.publishedYear || 0;
          const yearB = b.year || b.releaseYear || b.publishedYear || 0;
          return yearA - yearB; // descending (newest first)
        });
        setItems(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filterName = (film, year) => {
    const filterName = film.replace(/[:\-()\/.,!'"]/g, '')
    return `${filterName} ${year}`
  }

  return (
    <div className='search'>
      <h1>Watched Items ({items.length})</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id || item._id}>
            
            <div className="image">
              
              <div className="cont">
                <FilteredEffect myStyle='cool' />
                <img src={'images/processed/large/' + filterName(item.movie,item.year) + '.webp'} />
              </div>
              {/* <div className="cont">
                <img src={'images/processed/large/' + filterName(item.movie,item.year) + '.webp'} />
              </div> */}
            </div>
            <div className="text">
              <h4>{item.movie}</h4>
              <h5>{item.year || 'NA'}</h5>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}