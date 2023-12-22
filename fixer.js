const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;


const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('profileImage'), (req, res) => {
    const image = req.file; 
    const description = req.body.description; 
    const amount = req.body.amount;

    
    console.log('Image:', image);
    console.log('Description:', description);
    console.log('Amount:', amount);

    res.send('Upload successful!');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
