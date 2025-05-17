import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [emotions, setEmotions] = useState([]);

  const captureAndSend = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await (await fetch(imageSrc)).blob();
    const formData = new FormData();
    formData.append('image', blob, 'frame.jpg');

    const res = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data.top_emotions) setEmotions(data.top_emotions);
  };

  useEffect(() => {
    const interval = setInterval(() => captureAndSend(), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
      />
      <div>
        {emotions.map((e, i) => (
          <div key={i}>{e.name}: {e.score}%</div>
        ))}
      </div>
    </div>
  );
};

export default WebcamCapture;
