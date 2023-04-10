import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const usuariosServidor = [];
const tweetsServidor = [];

app.post('/sign-up', (req, res) => {
    if (!req.body.username || typeof req.body.username !== "string"
        || !req.body.avatar || typeof req.body.avatar !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    usuariosServidor.push({ username: req.body.username, avatar: req.body.avatar });
    return res.status(201).send("OK");
});

app.post('/tweets', (req, res) => {
    const user = req.headers.user;

    if (!user|| typeof user !== "string" || !req.body.tweet || typeof req.body.tweet !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    const usuario = usuariosServidor.find(elem => elem.username === user);

    if (usuario) {
        tweetsServidor.push({ username: user, avatar: usuario.avatar, tweet: req.body.tweet });
        return res.status(201).send("OK");
    }

    return res.status(401).send("UNAUTHORIZED");
});

app.get('/tweets', (req, res) => {
    const page = parseInt(req.query.page);

    if (isNaN(page)) {
        res.send([...tweetsServidor].reverse().slice(10));
    } else if (page <= 0) {
        res.status(400).send("Informe uma página válida!");
    } else {
        const limite = 10;
        const iniIndex = (page - 1) * limite;
        res.send([...tweetsServidor].reverse().slice(iniIndex, iniIndex+limite));
    }

});

app.get('/tweets/:username', (req, res) => {
    const username = req.params.username;
    const userTweets = tweetsServidor.filter(elem => elem.username === username);

    res.send(userTweets.reverse());
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));