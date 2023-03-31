import React, { useState, useEffect } from "react";

function Dados() {
  const [driverData, setDriverData] = useState([]);
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    fetch("https://alfred.to/reservas/sports-nation/v2/sports-plus", {
  headers: {
    Authorization: "Basic QWxmcmVkOlREODI0MThZYlBweCpuWDV4WDNrSlRrVFNeRTZndQ==",
  },
})
      .then((response) => response.json())
      .then((data) => {
        const driverArray = data.f1SportInfo[0].f1GeneralTable.map((driver) => {
          return {
            driverIcon: driver.driverIcon,
            driverName: driver.driverName,
            driverGpPosition: driver.driverGpPosition,
          };
        });
        setDriverData(driverArray);

        const teamArray = data.f1SportInfo[0].f1GeneralTable.map((driver) => {
          return {
            teamIcon: driver.teamIcon,
            driverLapTime: driver.driverLapTime,
            driverPoints: driver.driverPoints,
          };
        });
        setTeamData(teamArray);
      });
  }, []);

  return (
    <div>
      <div>
        {driverData.map((driver) => (
          <div key={driver.driverName}>
            <img src={driver.driverIcon} alt={driver.driverName} />
            <p>{driver.driverName}</p>
            <p>{driver.driverGpPosition}</p>
          </div>
        ))}
      </div>
      <div>
        {teamData.map((driver) => (
          <div key={driver.teamIcon}>
            <img src={driver.teamIcon} alt="team logo" />
            <p>{driver.driverLapTime}</p>
            <p>{driver.driverPoints}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dados;
