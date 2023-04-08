import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const usuariosServidor = [];
const tweetsServidor = [];

app.post('/sign-up', (req, res) => {
    usuariosServidor.push({username: req.body.username, avatar: req.body.avatar});
    res.send("OK");
});

app.post('/tweets', (req, res) => {
    const usuario = usuariosServidor.find(elem => elem.username === req.body.username);

    if (usuario){
        tweetsServidor.push({username: req.body.username, tweet: req.body.tweet});
        return res.send("OK");
    }

    res.send("UNAUTHORIZED");
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));