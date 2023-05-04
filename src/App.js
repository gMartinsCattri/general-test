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
    const timestamp = new Date().getTime();

    // Convert timestamp to Unix
    const unixTimestamp = Math.round(timestamp / 1000);

    const postBody = {
      id_campaing,
      id_resource,
      startTime: unixTimestamp,
      endTime: unixTimestamp,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody),
    };

    console.log('dados enviados en el body', postBody);
    await fetch('https://local.alfred.com/deneva-service/AuditCampaign', requestOptions);
    getNextCampaign();
  };

  useEffect(() => {
    getNextCampaign();
  }, []);

  return (
    <div>
      {videoSrc && (
        <video
          style={{width: '500px', height: '1500px'}}
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
