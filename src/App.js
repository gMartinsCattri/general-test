import { useState, useEffect } from "react";

function App() {
  const [contentList, setContentList] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    fetch('https://alfred.to/minideneva/mall/dev/channel/ads')
      .then(response => response.json())
      .then(data => {
        setPlaylist(data.playlist);
        setContentList(data.playlist.map(video => video.content));
      });
  }, []);

  console.log(contentList)
  console.log(playlist)

  useEffect(() => {
    const videoElement = document.querySelector("#video-player");

    if (contentList.length > 0) {
      videoElement.src = contentList[0];
      videoElement.addEventListener("ended", handleVideoEnded);
    }
    return () => {
      videoElement.removeEventListener("ended", handleVideoEnded);
    };
  }, [contentList]);

  const handleVideoEnded = () => {
    const videoElement = document.querySelector("#video-player");

    const currentIndex = contentList.indexOf(videoElement.src);

    if (currentIndex < contentList.length - 1) {
      videoElement.src = contentList[currentIndex + 1];
      videoElement.play();
    } else {
      videoElement.src = contentList[0];
      videoElement.play();
    }
  };

  return (
    <div>
      <video autoPlay id="video-player">
        
      </video>
    </div>
  );
}

export default App;
