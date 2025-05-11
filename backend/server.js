// server.js - Main Express server file
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { encrypt, decrypt } = require('./cryptography/cryptoService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// API endpoints
app.post('/api/encrypt', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { path: filePath, filename } = req.file;
    const encryptionKey = req.body.key || 'My Name Is Aarti Rathi'; // Default key from original code
    
    // Define output path
    const outputFileName = `encrypted_${filename}`;
    const outputPath = path.join(__dirname, 'public', 'output', outputFileName);
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    console.log(`Creating output directory at ${outputDir}`);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    console.log(`Output directory created at ${outputDir}`);
    console.log(`Output path for encrypted file: ${outputPath}`);   
    console.log(`File path for uploaded file: ${filePath}`);
    // Perform encryption
    await encrypt(filePath, outputPath, encryptionKey);
    
    // Send response with file URL
    res.json({
      message: 'File encrypted successfully',
      originalFile: req.file.originalname,
      encryptedFile: outputFileName,
      downloadUrl: `/output/${outputFileName}`
    });
  } catch (error) {
    console.error('Encryption error:', error);
    res.status(500).json({ message: 'Error encrypting file', error: error.message });
  }
});

app.post('/api/decrypt', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { path: filePath, filename } = req.file;
    const decryptionKey = req.body.key || 'My Name Is Aarti Rathi'; // Default key
    
    // Define output path
    const outputFileName = `decrypted_${filename}`;
    const outputPath = path.join(__dirname, 'public', 'output', outputFileName);
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Perform decryption
    await decrypt(filePath, outputPath, decryptionKey);
    
    // Send response with file URL
    res.json({
      message: 'File decrypted successfully',
      originalFile: req.file.originalname,
      decryptedFile: outputFileName,
      downloadUrl: `/output/${outputFileName}`
    });
  } catch (error) {
    console.error('Decryption error:', error);
    res.status(500).json({ message: 'Error decrypting file', error: error.message });
  }
});

// Serve the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});