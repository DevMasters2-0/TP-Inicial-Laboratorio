import { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./webcamcapture.css"; // Asegúrate de importar el archivo CSS

const videoConstraints = {
  width: window.innerWidth,
  height: window.innerHeight,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  const handleClose = () => {
    setImageSrc(null);
  };

  return (
    <div className="container">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className={`webcam ${imageSrc ? "hidden" : ""}`}
      />
      {!imageSrc ? (
        <button
          className="btn btn-capture"
          onClick={capture}
        >
          Sacar Foto
        </button>
      ) : (
        <button
          className="btn btn-close"
          onClick={handleClose}
        >
          X
        </button>
      )}
      {imageSrc && (
        <div className="image-container">
          <img src={imageSrc} alt="captured" className="captured-image" />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
