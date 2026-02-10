const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ serviço: "Estoque", itens: ["Caderno", "Lapiseira", "Tênis nike"], status: "Sincronizado" });
});

app.get('/health', (req, res) => res.status(200).send('Alive'));

app.listen(PORT, () => console.log(`Serviço de Estoque rodando na porta ${PORT}`));