import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
        .then((response) => {
          setData(response.data);
          localStorage.setItem('lastFetchTime', Date.now().toString());
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
          setIsLoading(false);
        });
    }

    const interval = setInterval(() => {
      const lastFetchTime = localStorage.getItem('lastFetchTime');
      if (!lastFetchTime || Date.now() - Number(lastFetchTime) >= 120000) {
        fetchData();
      }
    }, 120000); // Co 12 sekundy

    // Wykonaj pierwsze zapytanie od razu, jeśli upłynęło 12 sekund od ostatniego
    const lastFetchTime = localStorage.getItem('lastFetchTime');
    if (!lastFetchTime || Date.now() - Number(lastFetchTime) >= 120000) {
      fetchData();
    }

    return () => clearInterval(interval); // Czyść interval przy odmontowywaniu komponentu
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data && (
            <div>
              <h1>Time Series (5min)</h1>
              {Object.entries(data['Time Series (5min)']).map(([date, values]) => (
                <div key={date}>
                  <h3>{date}</h3>
                  <p>Open: {values['1. open']}</p>
                  <p>High: {values['2. high']}</p>
                  <p>Low: {values['3. low']}</p>
                  <p>Close: {values['4. close']}</p>
                  <p>Volume: {values['5. volume']}</p>
                </div>
              ))}
            </div>
          )
        )}
      </header>
    </div>
  );
}

export default App;
