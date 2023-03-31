import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://alfred.to/reservas/sports-nation/v2/soccer', {
        headers: {
          Authorization: 'Basic QWxmcmVkOlREODI0MThZYlBweCpuWDV4WDNrSlRrVFNeRTZndQ=='
        }
      });
      const jsonData = await response.json();
      setData(jsonData);
    }
    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      {data.map((sport) => (
        <div key={sport.id}>
          <strong>Sport Name: </strong>{sport.sportName}<br />
          <strong>Sport Icon: </strong>{sport.sportIcon}<br />
          {sport.sportLeagues.map((league) => (
            <div key={league.id}>
              <strong>League: </strong>{league.league}<br />
              <ul>
                {league.sportGeneralTable.map((tableItem) => (
                  <li key={tableItem.id}>{tableItem.id}. {tableItem.teamName} - {tableItem.totalPoints} points</li>
                ))}
              </ul>
              <ul>
                {league.sportResults.map((result) => (
                  <li key={result.id}><strong>Result: </strong>{result.teamAName} {result.teamAPoints} - {result.teamBPoints} {result.teamBName}</li>
                ))}
              </ul>
              
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
