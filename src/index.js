import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const usuariosServidor = [];
const tweetsServidor = [];

app.post('/sign-up', (req, res) => {
    if (!req.body.username || typeof req.body.username !== "string"
    || !req.body.avatar || typeof req.body.avatar !== "string"){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    usuariosServidor.push({username: req.body.username, avatar: req.body.avatar});
    return res.status(201).send("OK");
});

app.post('/tweets', (req, res) => {
    if (!req.body.username || typeof req.body.username !== "string"
    || !req.body.tweet || typeof req.body.tweet !== "string"){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    const usuario = usuariosServidor.find(elem => elem.username === req.body.username);

    if (usuario){
        tweetsServidor.push({username: req.body.username, avatar: usuario.avatar, tweet: req.body.tweet});
        return res.status(201).send("OK");
    }

    return res.status(401).send("UNAUTHORIZED");
});

app.get('/tweets', (req, res) => {
    res.send(tweetsServidor.slice(-10));
});

app.get('/tweets/:username', (req, res) => {
    const username = req.params.username;
    const userTweets = tweetsServidor.filter(elem => elem.username === username);

    res.send(userTweets);
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));