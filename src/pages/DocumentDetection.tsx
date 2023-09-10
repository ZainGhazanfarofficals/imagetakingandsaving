import React, { useState, useCallback, FC, useEffect } from "react";
import DocumentAutoCapture from "../components/DocumentAutoCapture";
import PhotoResult from "../components/PhotoResult";
import "./../styles/button.module.css";
import { useNavigate } from "react-router-dom";
interface DocumentDetectionProps {
  frontphotoUrl: string;
  backphotoUrl: string;
  setfrontPhotoUrl: (url: string) => void;
  setbackPhotoUrl: (url: string) => void;
}

const DocumentDetection: FC<DocumentDetectionProps> = (props) => {
  const { frontphotoUrl, backphotoUrl, setfrontPhotoUrl, setbackPhotoUrl } = props;

  const handlePhotoTaken = async (
    image: Blob,
    data: any,
    content?: Uint8Array
  ) => {
    const imageUrl = URL.createObjectURL(image);
    localStorage.setItem("image", imageUrl);

    if (!frontphotoUrl) {
      setfrontPhotoUrl(imageUrl);
    } else {
      setbackPhotoUrl(imageUrl);
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert("Image upload failed");
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleError = useCallback((error: Error) => {
    alert(error);
  }, []);

  const handleDocumentPhotoTaken = (image: Blob, data: any) => {
    handlePhotoTaken(image, data);
  };

  const getcheckvalue = () => {
     return frontphotoUrl && backphotoUrl?true:false;
  };

  useEffect(() => {
    // Check the condition and invoke the function as long as it's true
    if (getcheckvalue()) {
      // You don't need empty curly braces here
    }
  }, [frontphotoUrl, backphotoUrl]);
  const navigate = useNavigate();
  return (
    <div>
      <>
        <DocumentAutoCapture
          onPhotoTaken={handleDocumentPhotoTaken}
          onError={handleError}
          
        />
        <h1>Front Document</h1>
        {frontphotoUrl && <PhotoResult photoUrl={frontphotoUrl} />}

        <h1>Back Document</h1>
        {backphotoUrl && <PhotoResult photoUrl={backphotoUrl} />}
        {frontphotoUrl && backphotoUrl ? (
          navigate('/facedetection')
        ) : null}
      </>
    </div>
  );
};

export default DocumentDetection;
