import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import DocumentDetection from "./pages/DocumentDetection";
import FaceDetection from "./pages/FaceDetection";
import Result from "./pages/Result";
import QRCodeScanner from "./pages/QRCodeScaner";
import Signature from "./pages/Signature";
function App() {
  const [frontphotoUrl, setfrontPhotoUrl] = useState<string>('');
  const [backphotoUrl, setbackPhotoUrl] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/documentdetection" element={<DocumentDetection frontphotoUrl={frontphotoUrl} backphotoUrl={backphotoUrl} setfrontPhotoUrl={setfrontPhotoUrl} setbackPhotoUrl={setbackPhotoUrl}  />} />
        <Route path="/facedetection" element={<FaceDetection photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} />} />
        <Route path="/result" element={<Result frontphotoUrl={frontphotoUrl} backphotoUrl={backphotoUrl}  photoUrl={photoUrl} />} />
        <Route path="/qrcode" element={<QRCodeScanner />} />
        <Route path="/signature" element={<Signature />} />
      </Routes>
    </Router>
  );
}

export default App;
