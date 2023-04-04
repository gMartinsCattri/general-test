import { useState, useEffect, useRef } from "react";
import './App.css'

function App() {
  const [contentList, setContentList] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    fetch('https://alfred.to/minideneva/mall/dev/channel/ads')
      .then(response => response.json())
      .then(data => {
        setContentList(data.playlist.map(video => video.content));
      });
  }, []);

  useEffect(() => {
    if (contentList.length > 0) {
      const videoElement = videoRef.current;
      videoElement.src = contentList[0];
    }
  }, [contentList]);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoEnded = () => {
      const currentIndex = contentList.indexOf(videoElement.src);

      if (currentIndex < contentList.length - 1) {
        videoElement.src = contentList[currentIndex + 1];
        videoElement.play();
      } else {
        videoElement.src = contentList[0];
        videoElement.play();
      }
    };

    if (videoElement && contentList.length > 0) {
      videoElement.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, [contentList]);

  return (
    <div className="video-container">
      <video className="video" autoPlay muted ref={videoRef}>
        
      </video>
    </div>
  );
}

export default App;