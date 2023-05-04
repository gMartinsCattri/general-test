import { useEffect, useRef, useState } from 'react';

function App() {
  const [videoSrc, setVideoSrc] = useState('');
  const [campaignData, setCampaignData] = useState({});
  const videoRef = useRef(null);

  const getNextCampaign = async () => {
    const response = await fetch('http://local.alfred.com/deneva-service/GetNextCampaign');
    const data = await response.json();
    setCampaignData(data);

    const srcValue = data.src.split('//')[1];
    const videoUrl = `http://local.alfred.com/media/deneva/${srcValue}`;
    setVideoSrc(videoUrl);
  };

  const handleVideoEnded = async () => {
    const { id_campaing, id_resource } = campaignData;
    const currentTime = videoRef.current.currentTime;
    const timestamp = new Date().toISOString();

    const postBody = {
      id_campaing,
      id_resource,
      startTime: timestamp,
      endTime: timestamp,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody),
    };
    console.log('dados enviados en el body', postBody)
    await fetch('http://127.0.0.1:3000/AuditCampaign', requestOptions);
    getNextCampaign();
  };

  useEffect(() => {
    getNextCampaign();
  }, []);

  return (
    <div>
      {videoSrc && (
        <video
        style={{width: '2000px', height: '3500px'}}
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          onEnded={handleVideoEnded}
        />
      )}
    </div>
  );
}

export default App;
