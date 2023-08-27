import React, { useEffect, useState } from 'react';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import Loader from 'react-loader-spinner';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('Search for Music!');
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    if (searchTerm) {
      document.title = `${searchTerm} Music`;
      const fetchData = async () => {
        setIsLoading(true); 
        try {
          const response = await fetch(
            `https://itunes.apple.com/search?term=${searchTerm}`
          );
          const resData = await response.json();
          if (resData.results.length > 0) {
            setData(resData.results);
          } else {
            setMessage('Not Found');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false); // Set isLoading to false after fetching
        }
      };
      fetchData();
    }
  }, [searchTerm]);

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearchTerm(term);
  };

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {isLoading ? (
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
      ) : (
        <div>
          {message}
          <Gallery data={data} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}

export default App
