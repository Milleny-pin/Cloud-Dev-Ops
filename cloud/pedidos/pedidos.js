const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;


const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'mimi123',
  database: process.env.DB_NAME || 'cloud_loja',
  port: 5432,
});


app.use(express.json());


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar no Postgres:', err.message);
  } else {
    console.log('Conectado ao Banco de Dados PostgreSQL com sucesso!');
  }
});


app.get('/', (req, res) => {
  res.json({ 
    servico: "Pedidos", 
    status: "Online",
    instrucao: "Use a rota /health para checagem do Kubernetes" 
  });
});


app.post('/pedidos', async (req, res) => {
  try {

    res.status(201).json({ mensagem: "Pedido recebido e sendo processado!" });
  } catch (error) {
    res.status(500).json({ erro: "Falha interna no serviço de pedidos" });
  }
});


app.get('/health', (req, res) => {
  res.status(200).send('Saudável');
});


app.get('/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).send('Pronto');
  } catch (err) {
    res.status(500).send('Não está pronto: Banco de dados inacessível');
  }
});

app.listen(PORT, () => {
  console.log(`Microsserviço de Pedidos rodando na porta ${PORT}`);
});