import { useState, useEffect, useRef } from 'react';

const App = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [campaignData, setCampaignData] = useState({});
  const videoRef = useRef(null);

  useEffect(() => {
    getNextCampaign();
  }, []);

  const getNextCampaign = async () => {
    const response = await fetch('http://127.0.0.1:3000/GetNextCampaign');
    const data = await response.json();
    console.log('Dados recebidos:', data); // adicionado console.log
    setCampaignData(data);

    const srcValue = data.src.split('//')[1];
    const videoUrl = `http://local.alfred.com/deneva/${srcValue}`;
    setVideoSrc(videoUrl);
  };

  const handleVideoEnd = async () => {
    const { id_campaing, id_resource } = campaignData;
    const startTimestamp = videoRef.current.currentTime - videoRef.current.duration;
    const endTimestamp = videoRef.current.currentTime;
  
    const postData = {
      id_campaing,
      id_resource,
      start_timestamp: startTimestamp,
      end_timestamp: endTimestamp
    };
  
    console.log('Dados enviados:', postData); // adicionado console.log
  
    await fetch('http://127.0.0.1:3000/AuditCampaign', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    getNextCampaign();
  };
  

  return (
    <div>
      <video ref={videoRef} src={videoSrc} onEnded={handleVideoEnd} controls />
    </div>
  );
};

export default App;
// import { useEffect, useRef, useState } from 'react';

// function App() {
//   const [videoSrc, setVideoSrc] = useState('');
//   const [campaignData, setCampaignData] = useState({});
//   const videoRef = useRef(null);

//   const getNextCampaign = async () => {
//     const response = await fetch('http://local.alfred.com/deneva-service/GetNextCampaign');
//     const data = await response.json();
//     setCampaignData(data);

//     const srcValue = data.src.split('//')[1];
//     const videoUrl = `http://local.alfred.com/media/deneva/${srcValue}`;
//     setVideoSrc(videoUrl);
//   };

//   const handleVideoEnded = async () => {
//     const getNextCampaign = async () => {
//       const response = await fetch('http://127.0.0.1:3000/GetNextCampaign');
//       const data = await response.json();
//       console.log('Dados recebidos:', data); // adicionado console.log
//       setCampaignData(data);
    
//       const srcValue = data.src.split('//')[1];
//       const videoUrl = `http://local.alfred.com/deneva/${srcValue}`;
//       setVideoSrc(videoUrl);
//     };
//     // const { id_campaing, id_resource } = campaignData;
//     // const currentTime = videoRef.current.currentTime;
//     // const timestamp = new Date().toISOString();

//     // const postBody = {
//     //   id_campaing,
//     //   id_resource,
//     //   startTime: timestamp,
//     //   endTime: timestamp,
//     // };

//     // const requestOptions = {
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify(postBody),
//     // };

//     // await fetch('http://local.alfred.com/deneva-service/AuditCampaign', requestOptions);
//     getNextCampaign();
//   };

//   useEffect(() => {
//     getNextCampaign();
//   }, []);

//   return (
//     <div>
//       {videoSrc && (
//         <video
//         style={{width: '2000px', height: '3500px'}}
//           ref={videoRef}
//           src={videoSrc}
//           autoPlay
//           muted
//           onEnded={handleVideoEnded}
//         />
//       )}
//     </div>
//   );
// }

// export default App;
