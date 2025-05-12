import React, { useState, useEffect } from 'react';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [error, setError] = useState('');
  const [type, setType] = useState('p');  // 'p' for prime numbers initially

  useEffect(() => {
    // Fetch data from backend when the type changes
    fetch(`http://localhost:5000/api/numbers/${type}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setNumbers(data.numbers);  
        setError('');  
      })
      .catch(err => {
        setError('Error fetching data.');  
        setNumbers([]);  
      });
  }, [type]);  

  const handleChangeType = (newType) => {
    setType(newType); 
  };

  return (
    <div className="App">
      <h1>Number Generator</h1>

      <div>
        <button onClick={() => handleChangeType('p')}>Prime Numbers</button>
        <button onClick={() => handleChangeType('f')}>Fibonacci Numbers</button>
        <button onClick={() => handleChangeType('e')}>Even Numbers</button>
        <button onClick={() => handleChangeType('r')}>Random Numbers</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {numbers.length > 0 ? (
          numbers.map((num, index) => <li key={index}>{num}</li>)
        ) : (
          <p>No numbers to display</p>
        )}
      </ul>
    </div>
  );
}

export default App;
