const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

let records = [];

app.use(express.json());
app.use(cors());

app.get('/records', (req, res) => {
    res.json(records);
});

app.post('/records', (req, res) => {
    const newRecord = req.body;
    newRecord.id = records.length + 1; 
    records.push(newRecord);
    res.status(201).json(newRecord);
});

app.delete('/records/:id', (req, res) => {
    const id = parseInt(req.params.id);
    records = records.filter(record => record.id !== id);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
