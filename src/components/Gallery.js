import React from 'react';
import Loader from 'react-loader-spinner'; 

function Gallery({ data, isLoading }) {
  return (
    <div>
      {isLoading ? (
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
      ) : (
        data.map((song) => (
          <div key={song.trackId}>
            <img src={song.artworkUrl100} alt={song.trackName} />
            <h3>{song.trackName}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default Gallery;


