const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;




// Obsluha základní cesty
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Nastavení úložište obrázku
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Statická složka pro obrázky
app.use('/uploads', express.static('uploads'));

// API pro nahrání obrázku
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Žádný soubor nebyl nahrán.');
    }
    res.json({ url: `/uploads/${req.file.filename}` });
});

// Spuštení serveru
app.listen(PORT, () => {
    console.log(`Server beží na http://localhost:${PORT}`);
});



