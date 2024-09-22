const express = require('express'); // Import express
const multer = require('multer'); // Import multer for file uploads
const path = require('path'); // Import path for file paths
const fs = require('fs'); // Import fs for file system operations

const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'app/src/main/assets')));

// Set up storage location for uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'BugBusterFiles')); // Use the correct uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
    }
});

const upload = multer({ storage: storage });

// Create BugBusterFiles folder if it doesn't exist
const dir = path.join(__dirname, 'BugBusterFiles');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.'); // Handle no file case
    }
    console.log(req.file); // Log file info
    res.send('File uploaded successfully!');
});

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/src/main/assets', 'index.html')); // Serve the index.html file
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


