const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Readable } = require('stream');
const speech = require('@google-cloud/speech');

const app = express();
const port = 3000;

app.use(express.static('public'));

// Configuração do Multer para receber arquivos de áudio
const upload = multer({ dest: 'uploads/' });
app.get('/processar_fala', (req, res) => {
    res.send('Rota não permitida para GET. Use POST para processar a fala.');
});

app.post('/processar_fala', upload.single('audio'), async (req, res) => {
    try {
        const audioBuffer = fs.readFileSync(req.file.path);
        const audio = {
            content: audioBuffer.toString('base64'),
        };

        const client = new speech.SpeechClient();
        const config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'pt-BR',
        };
        const request = {
            audio: audio,
            config: config,
        };

        const [response] = await client.recognize(request);
        const texto = response.results.map(result => result.alternatives[0].transcript).join('\n');

        res.json({ texto });
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});