import React,{useState,useCallback,FC} from 'react'
import FaceAutoCapture from '../components/FaceAutoCapture';
import PhotoResult from '../components/PhotoResult';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

interface FaceDetectionProps {
  photoUrl: string;
  setPhotoUrl: (url: string) => void;
}
const FaceDetection: FC<FaceDetectionProps> = (props) => {
  const navigate = useNavigate();
  const {photoUrl,setPhotoUrl}=props;
  const handlePhotoTaken = async (
    image: Blob,
    data: any,
    content?: Uint8Array
  ) => {
    const imageUrl = URL.createObjectURL(image);
    localStorage.setItem("image", imageUrl);
    setPhotoUrl(imageUrl);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const imageUrl = await response.text();
      } else {
        const errorText = await response.text();
        alert("Image upload failed");
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleFaceCapturePhotoTaken = (image: Blob, data: any) => {
    handlePhotoTaken(image, data);
    setTimeout(() => {
      navigate("/result");
    }, 5000);
    
  };
  const handleError = useCallback((error: Error) => {
    alert(error);
  }, []);

  return (
    <div>
      <FaceAutoCapture
              onPhotoTaken={handleFaceCapturePhotoTaken}
              onError={handleError}
            />
            <h1> Face</h1>
        {photoUrl && <PhotoResult photoUrl={photoUrl} />}

          
    </div>
  )
}

export default FaceDetection
