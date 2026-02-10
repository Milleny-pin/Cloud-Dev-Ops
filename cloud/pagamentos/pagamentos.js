const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ serviço: "Pagamentos", operante: true, gateway: "Visa/Master" });
});

app.get('/health', (req, res) => res.status(200).send('Alive'));

app.listen(PORT, () => console.log(`Serviço de Pagamentos rodando na porta ${PORT}`));