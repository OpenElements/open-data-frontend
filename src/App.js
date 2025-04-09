import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5050';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/items`)
    .then(response => response.json())
    .then(data => setItems(data));
  }, []);

  return (
      <div>
        <h1>Items List</h1>
        <ul>
          {items.map(item => (
              <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
  );
}

export default App;