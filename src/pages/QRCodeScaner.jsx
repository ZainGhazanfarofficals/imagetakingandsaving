import React, { useState, useEffect } from 'react';
import Scanner from '../components/Scanner';
import { useNavigate } from 'react-router-dom';

function QRCodeScanner() {
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (result) {
      const timeoutId = setTimeout(() => {
        navigate('/signature');
      }, 3000); // 3 seconds delay
      return () => clearTimeout(timeoutId);
    }
  }, [result, navigate]);

  return (
    <div>
      <h1>QR Code</h1>
      <Scanner type={"QR"} onResult={(res) => setResult(res)} />
      <a href={result}>{result}</a>
    </div>
  );
}

export default QRCodeScanner;
