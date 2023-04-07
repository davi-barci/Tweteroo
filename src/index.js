import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const usuariosServidor = [];

app.post('/sign-up', (req, res) => {
    usuariosServidor.push({username: req.body.username, avatar: req.body.avatar});
    res.send("OK");
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));