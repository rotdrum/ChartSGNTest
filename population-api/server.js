const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

app.use(cors()); // Use the cors middleware

app.get('/data', (req, res) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, 'data.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
