import React from 'react';

const Favorites = ({ toggleFavorite, favorites }) => {
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((item) => (
            <li key={item.trackId}>
              {item.trackName} by {item.artistName}{' '}
              <button onClick={() => toggleFavorite(item)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites
