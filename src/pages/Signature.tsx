import React from "react";
import "./../styles/signature.css";
import SignaturePad from "react-signature-canvas";
import SignatureCanvas from "react-signature-canvas";

export default function Signature() {
  const [dataURL, setDataURL] = React.useState<string | null>(null);

  let padRef = React.useRef<SignatureCanvas>(null);

  const clear = () => {
    padRef.current?.clear();
  };

  const trim = () => {
    const url = padRef.current?.getTrimmedCanvas().toDataURL("image/png");
    if (url) setDataURL(url);
  };

  return (
    <div>
      <h1>Signature</h1>
      <SignaturePad ref={padRef} canvasProps={{ className: "sigCanvas" }} />
      <div className="sigPreview">
        <button onClick={trim} style={{
            backgroundColor: "#00bfb2",
            color: "white",
            padding: "15px 25px",
            textDecoration: "none",
            margin: "30px",
            textAlign: "center",
            top: "50%",
          }}>Capture</button>
        <button onClick={clear} style={{
            backgroundColor: "#00bfb2",
            color: "white",
            padding: "15px 25px",
            textDecoration: "none",
            marginTop: "30px",
            textAlign: "center",
            top: "50%",
          }}>Clear</button>
        {dataURL ? (
          <img
            className={"sigImage"}
            src={dataURL}
            alt="user generated signature"
            
          />
        ) : null}
      </div>
    </div>
  );
}
