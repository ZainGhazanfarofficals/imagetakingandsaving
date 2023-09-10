import React, { FC, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

interface DetectionProps {
  frontphotoUrl: string;
  backphotoUrl: string;
  photoUrl: string;
}

const Result: FC<DetectionProps> = (props) => {
  const { frontphotoUrl, backphotoUrl, photoUrl } = props;
  const navigate = useNavigate();

  const isValid = () => {
    return frontphotoUrl !== "" && backphotoUrl !== "" && photoUrl !== "";
  };

  useEffect(() => {
    // Check if the condition is met and then navigate after 3 seconds
    if (isValid()) {
      const timeout = setTimeout(() => {
        navigate('/qrcode');
      }, 3000);
    
      // Clear the timeout if the component unmounts before 3 seconds
      return () => clearTimeout(timeout);
    }
    else{
      const timeout = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [navigate, frontphotoUrl, backphotoUrl, photoUrl]);

  return (
    <>
      {isValid() ? (
        <div>
          <img
            src="./../../public/images/success.png"
            width="500px"
            alt="Success"
          />
        </div>
      ) : (
        <div>
          <img
            src="./../../public/images/failed.png"
            alt="failed"
            width="500px"
          />
        </div>
      )}
    </>
  );
};

export default Result;
