import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoData, setVideoData] = useState({});
  const [campaigns, setCampaigns] = useState([]);
  const [currentCampaignIndex, setCurrentCampaignIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    axios.get('http://local.alfred.com/deneva-service/GetNextCampaign')
      .then(response => {
        const { src } = response.data;
        const srcValue = src.split('//')[1];
        const url = `http://local.alfred.com/media/deneva/${srcValue}`;
        setVideoUrl(url);
        setVideoData(response.data);
        setCampaigns([...campaigns, response.data]);
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
    axios.post('http://local.alfred.com/deneva-service/AuditCampaign', data)
      .then(() => {
        setCurrentCampaignIndex(currentCampaignIndex + 1);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (currentCampaignIndex < campaigns.length) {
      const campaign = campaigns[currentCampaignIndex];
      const { src } = campaign;
      const srcValue = src.split('//')[1];
      const url = `http://local.alfred.com/media/deneva/${srcValue}`;
      setVideoUrl(url);
      setVideoData(campaign);
    } else {
      axios.get('http://local.alfred.com/deneva-service/GetNextCampaign')
        .then(response => {
          const { src } = response.data;
          const srcValue = src.split('//')[1];
          const url = `http://local.alfred.com/media/deneva/${srcValue}`;
          setVideoUrl(url);
          setVideoData(response.data);
          setCampaigns([...campaigns, response.data]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [currentCampaignIndex]);

  return (
    <div>
      <video
        src={videoUrl}
        controls
        onEnded={handleVideoEnd}
        ref={videoRef}
      />
    </div>
  );
}

export default VideoPlayer;
