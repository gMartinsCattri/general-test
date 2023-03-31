import React, { useRef, useEffect}from 'react';
import Webcam from "react-webcam"

function Camera() {




  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);
  // const [dataScreenShot, setDataScreenShot] = useState([{}])

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);

  }, [webcamRef]);
  // console.log("current Url", url)
  const onUserMedia = (e) => {
    console.log(e);
  };
  const urlDns = process.env.REACT_APP_BASE_URL 

  useEffect(() => {
    if(url !== null){
      const requestOptions = {
        method: 'POST',
        headers: { "Authorization": 'Basic QWxmcmVkOlREODI0MThZYlBweCpuWDV4WDNrSlRrVFNeRTZndQ=='
       },
        body: url
    };
    
    
    fetch(`${urlDns}/reservas/qr-code/go-to-your-picture`, requestOptions)
        .then(response => response.blob())
        .then(data => {
          var urlCreator = window.URL || window.webkitURL
          var imageURL = urlCreator.createObjectURL(data)
          document.querySelector("#img").src = imageURL
      });
        
    
    } else{
    }
  }, [url, urlDns])
  // console.log("respose data", dataScreenShot)
  return (
    <div style={{height: '100%', width: '100%'}} className="App">
      <div style={{width:"100%", height:"90vh", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div> <div class="container-fluid float-start my-5 py-5" style={{height:"100%", fontSize:"60px", color:"#000"}}>
    <div class="row row-cols-12 justify-content-md-center my-4">
      <div class="col" style={{background:"transparent", width:"100%", height:"1600px"}}>
      <Webcam
      style={{width:"100%", height:"100%", border: "10px solid white", objectFit: "cover",}}
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        onUserMedia={onUserMedia}
        mirrored={true}
      />
      </div>
    </div>
    <div class="row row-cols-12 justify-content-md-center my-4">
      <div class="col-lg-2 float-start">
        <div class="col" style={{display: "flex", justifyContent:"center", alignItems: "center", height:"100%",}}>
        <img style={{width: "100%"}} src={`${urlDns}/media/imagenes/iconos/flecha_izq_naranja.png`} alt="" />
        </div>
      </div>
      <div class="col-lg-2 float-start">
        <div class="col" style={{display: "flex", justifyContent:"center", alignItems: "center", height:"100%",}}>
        <img style={{width: "100%"}} src={`${urlDns}/media/imagenes/iconos/flecha_der_naranja.png`} alt="" />

        </div>
      </div>
      <div class="col-lg-2 float-start">
        <div class="col" style={{background:"transparent", height:"336px", display: "flex", alignItems: "center", justifyContent:"center"}}>
        <img id="img" alt="" />
        </div>
      </div>
      <div class="col-lg-2 float-start">
        <div class="col" style={{background:"transparent", height:"336px", borderRadius:"100%", display: "flex", justifyContent:"center", alignItems: "center"}}>
        <button style={{width:"100%", background:"transparent", border: "transparent"}} onClick={capturePhoto}>
          <img style={{width: "300px"}} src={`${urlDns}/media/imagenes/iconos/tomar_foto.png`} alt="borrar_foto"></img>
        </button>
        </div>
      </div>
      <div class="col-lg-2 float-start">
        <div class="col" style={{background:"transparent", height:"336px", borderRadius:"100%", display: "flex", justifyContent:"center", alignItems: "center"}}>
        <button style={{width:"100%", background:"transparent", border: "transparent"}} onClick={() => setUrl(null)}>          
        <img style={{width: "300px"}} src={`${urlDns}/media/imagenes/iconos/borrar_foto.png`} alt="borrar_foto"></img>
</button>

        </div>
      </div>
    </div>
    <div class="row row-cols-12 justify-content-md-center">
      <div class="col" style={{background:"transparent", height:"1600px"}}>
        {url === null ? 
        <div></div>:      
         <img style={{width:"100%", height:"100%", border: "10px solid white"}} src={url} alt="Screenshot" />
}

      </div>
    </div>
</div></div>
  </div>
        {/* 

        <div className={'result' + (hasPhoto ? 'hasPhoto': "")}>
          <canvas ref={photoRef}></canvas>
          <button>CLOSE!</button>
        </div> */}
    </div>
  )
}

export default Camera