const express = require('express');
const app = express();
const ytdl = require('ytdl-core');

app.use(express.static('public'));

app.get('/download', async (req, res) => {
    const url= req.query.url;
    
  
        try {
            const info = await ytdl.getInfo(url);
            const title = info.videoDetails.title.replace(/[^\w\s]/gi, ''); // Remueve caracteres especiales del título
            const video = ytdl(url, { filter: 'audioonly' });
            
            res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
            video.pipe(res);
        } catch (error) {
            res.status(500).send('Error al obtener la información del video');
        }
    
});


const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
