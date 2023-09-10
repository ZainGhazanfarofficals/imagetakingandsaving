import React, { useEffect } from "react";
import {
  DocumentCallback,
  DocumentComponentData,
} from "@innovatrics/dot-document-auto-capture";
import {
  dispatchControlEvent,
  DocumentCustomEvent,
  ControlEventInstruction,
} from "@innovatrics/dot-document-auto-capture/events";
import styles from "../styles/index.module.css";
import buttonStyles from "../styles/button.module.css";
import DocumentCamera from "./DocumentCamera";
import DocumentUi from "./DocumentUi";

interface Props {
  onPhotoTaken: DocumentCallback;
  onError: (error: Error) => void;
}

function DocumentAutoCapture({ onPhotoTaken, onError }: Props) {
  const handlePhotoTaken = (image: Blob, data: DocumentComponentData) => {
    onPhotoTaken(image, data);
  };

  const handleContinueDetection = () => {
    dispatchControlEvent(
      DocumentCustomEvent.CONTROL,
      ControlEventInstruction.CONTINUE_DETECTION
    );
  };

  // Use setTimeout directly in the component without conditional check
  setTimeout(() => {
    handleContinueDetection();
  }, 5000);

  return (
    <div>
      <h2>Upload Document</h2>
      <div></div>
      {/* parent container must have position: relative */}
      <div className={styles.container}>
        <DocumentCamera
          imageType="png"
          cameraFacing="environment"
          onPhotoTaken={handlePhotoTaken}
          onError={onError}
        />
        <DocumentUi showCameraButtons />
      </div>
    </div>
  );
}

export default DocumentAutoCapture;
