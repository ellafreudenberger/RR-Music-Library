import React, { useEffect, useState } from 'react';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import Favorites from './Favorites';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('Search for Music!');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      document.title = `${searchTerm} Music`;
      const fetchData = async () => {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${searchTerm}`
        );
        const resData = await response.json();
        if (resData.results.length > 0) {
          setData(resData.results);
        } else {
          setMessage('Not Found');
        }
      };
      fetchData();
    }
  }, [searchTerm]);

  const toggleFavorite = (musicItem) => {
    if (favorites.some((item) => item.trackId === musicItem.trackId)) {
      setFavorites(favorites.filter((item) => item.trackId !== musicItem.trackId));
    } else {
      setFavorites([...favorites, musicItem]);
    }
  };

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearchTerm(term);
  };

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      <Favorites toggleFavorite={toggleFavorite} favorites={favorites} />
      {message}
      <Gallery data={data} toggleFavorite={toggleFavorite} favorites={favorites} />
    </div>
  );
}

export default App
