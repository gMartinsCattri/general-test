import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/deneva-service/GetNextCampaign")
      .then((response) => {
        const srcParts = response.data.src.split("//");
        const srcValue = srcParts[srcParts.length - 1];
        const url = `http://127.0.0.1:3000/deneva-service/${srcValue}`;
        setData(url);
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
    <div>
      <video src={data}></video>
    </div>
    </div>
  );
}

export default App;

