import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoData, setVideoData] = useState({});
  const videoRef = useRef(null);

  useEffect(() => {
    axios.get('http://local.alfred.com/deneva-service/GetNextCampaignn')
      .then(response => {
        const { src } = response.data;
        const srcValue = src.split('//')[1];
        const url = `http://local.alfred.com/deneva/${srcValue}`;
        setVideoUrl(url);
        setVideoData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleVideoEnd = () => {
    const { id_campaing, id_resource } = videoData;
    const startTime = videoRef.current.currentTime;
    const endTime = new Date().getTime() / 1000;
    const data = { id_campaing, id_resource, startTime, endTime };
    axios.post('http://local.alfred.com/deneva-service/AuditCampaign ', data);
  };

  return (
    <div>
      <video
        src={videoUrl}
        controls
        onEnded={handleVideoEnd}
      />
    </div>
  );
}

export default VideoPlayer;
