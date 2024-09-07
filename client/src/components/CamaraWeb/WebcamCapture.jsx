import { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./webcamcapture.css";

const videoConstraints = {
  width: window.innerWidth,
  height: window.innerHeight,
  facingMode: "environment",
};

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    if (onCapture) onCapture(imageSrc); // Llama a la función onCapture pasada como prop
  };

  const handleChangeCapture = () => {
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
      {!imageSrc && (
        <button className="btn btn-capture" onClick={capture}>
          Sacar Foto
        </button>
      )}

      {imageSrc && (
        <>
          <div className="image-container">
            <img src={imageSrc} alt="captured" className="captured-image" />
          </div>

          <button className="btn-volver-sacar-foto" onClick={handleChangeCapture}>
            Volver a Tomar Foto
          </button>
        </>
      )}
    </div>
  );
};

export default WebcamCapture;
