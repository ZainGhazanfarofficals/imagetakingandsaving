import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
let html5QrCode;

const Scanner = (props) => {
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (!qrCodeRef.current) {
      html5QrCode = new Html5Qrcode("reader");

      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        props.onResult(decodedText);
      };

      html5QrCode.start(
        { facingMode: "environment" },
        props.type === "QR" ? qrConfig : brConfig,
        qrCodeSuccessCallback
      );

      qrCodeRef.current = html5QrCode;
    }

    return () => {
      // Cleanup when the component unmounts
      handleStop();
    };
  }, [props]);

  const handleStop = () => {
    try {
      if (qrCodeRef.current) {
        qrCodeRef.current
          .stop()
          .then((res) => {
            qrCodeRef.current.clear();
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ position: "relative", width: "50%" }}>
      <div id="reader" width="500px" />
    </div>
  );
};

export default Scanner;
