# App Enhancement with React Router and Pages

In this GitHub repository, we have enhanced our application to provide a more structured and user-friendly navigation experience. We have added the `react-router-dom` library to our project, enabling us to create distinct pages for various functionalities. The following pages have been implemented:

1. **Home**: The main landing page of our application.
2. **Document Detection**: This page allows users to perform document detection tasks.
3. **Face Detection**: Users can utilize this page to perform face detection operations.
4. **QR Code Scanner**: A page dedicated to scanning QR codes.
5. **Signature**: This page provides functionality related to signatures.

## Page Components

To achieve these pages, we have created modular components that are utilized within the respective pages. This approach promotes code reusability and maintainability. Here's an overview of the components used:

- **Home Component**: The main component for the Home page.
- **DocumentDetection Component**: Responsible for the document detection page.
- **FaceDetection Component**: Handles face detection functionalities.
- **QRCodeScanner Component**: Manages the QR code scanning capabilities.
- **Signature Component**: This component deals with signature-related features.

## Backend Data Storage

All data related to documents and face images is stored on the backend of our application. To accomplish this, we have set up a backend server, and the server code can be found in the `api/server.js` file within our project structure.

## Image Storage

The images used in our application are stored in the `upload` directory, which is accessible by the backend server. This directory serves as the repository for all image files utilized in our various detection and scanning processes.

## Getting Started

To run this application locally and explore the added features, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/ZainGhazanfarofficals/imagetakingandsaving.git
   ```
2. Install the required package  :
   ```bash
      yarn install or npm i -f
   ```
3. Start Client:
   ```bash 
       npm start
   ```
   
5. Open new terminal Go to the server folder and install the npm :
   ```bash
      cd api && npm install
   ```
6. run server
     ```bash
       npm start
     ```
7. Open your web browser and visit http://localhost:5173/
     
