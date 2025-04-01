const express = require('express');
const path = require('path');

const app = express();

// Serve static files (your frontend HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check route for Docker health check
app.get('/health', (req, res) => {
    res.status(200).send('Healthy');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
