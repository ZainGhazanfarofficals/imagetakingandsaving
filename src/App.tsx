import React, { useCallback, useState } from "react";
import ComponentSelect from "./components/ComponentSelect";
import DocumentAutoCapture from "./components/DocumentAutoCapture";
import FaceAutoCapture from "./components/FaceAutoCapture";
import MagnifEyeLiveness from "./components/MagnifEyeLiveness";
import PhotoResult from "./components/PhotoResult";
import styles from "./styles/index.module.css";
import { Step } from "./types";

function App() {
  const [step, setStep] = useState<Step>(Step.SELECT_COMPONENT);
  const [photoUrl, setPhotoUrl] = useState<string>();

  const handlePhotoTaken = async (image: Blob, data: any, content?: Uint8Array) => {
    const imageUrl = URL.createObjectURL(image);
    localStorage.setItem('image',imageUrl);
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
    }  
    catch(e){
      alert(e);
    }  
  };
  
  const handleDocumentPhotoTaken = (image: Blob, data: any) => {
    handlePhotoTaken(image, data);
  };

  const handleFaceCapturePhotoTaken = (image: Blob, data: any) => {
    handlePhotoTaken(image, data);
  };

  const handleMagnifEyeComplete = (
    { image, data }: { image: Blob; data: any },
    content: Uint8Array
  ) => {
    handlePhotoTaken(image, data, content);
  };

  const handleError = useCallback((error: Error) => {
    alert(error);
  }, []);

  const handleBackClick = () => {
    setPhotoUrl(undefined);
    setStep(Step.SELECT_COMPONENT);
  };

  const renderStep = (currentStep: Step) => {
    switch (currentStep) {
      case Step.DOCUMENT_CAPTURE:
        return (
          <>
            <DocumentAutoCapture
              onPhotoTaken={handleDocumentPhotoTaken}
              onError={handleError}
              onBackClick={handleBackClick}
            />
            {photoUrl && <PhotoResult photoUrl={photoUrl} />}
          </>
        );
      case Step.FACE_CAPTURE:
        return (
          <>
            <FaceAutoCapture
              onPhotoTaken={handleFaceCapturePhotoTaken}
              onError={handleError}
              onBackClick={handleBackClick}
            />
            {photoUrl && <PhotoResult photoUrl={photoUrl} />}
          </>
        );
      case Step.MAGNIFEYE_LIVENESS:
        return (
          <>
            <MagnifEyeLiveness
              onComplete={handleMagnifEyeComplete}
              onError={handleError}
              onBackClick={handleBackClick}
            />
            {photoUrl && <PhotoResult photoUrl={photoUrl} />}
          </>
        );
      default:
        return <ComponentSelect setStep={setStep} />;
    }
  };

  return (
    <div className={styles.app}>
      <h1>DOT Web Components Integration</h1>
      {renderStep(step)}
    </div>
  );
}

export default App;
