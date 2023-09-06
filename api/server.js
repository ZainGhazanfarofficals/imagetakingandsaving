const cors = require("cors");

const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
      // Set the extension to ".png" regardless of the original extension
      const newFileName = Date.now() + ".png";
      cb(null, newFileName);
    },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Return the URL where the image is stored
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).send(imageUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
