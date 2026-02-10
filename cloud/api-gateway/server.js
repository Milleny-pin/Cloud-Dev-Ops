const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());

app.get('/health', (req, res) => res.status(200).send('OK'));

app.use((req, res, next) => {
    const traceId = req.headers['x-trace-id'] || Math.random().toString(36).substring(7);
    req.traceId = traceId;
    console.log(`[${new Date().toISOString()}] TRACE-ID: ${traceId} | ${req.method} ${req.url}`);
    req.headers['x-trace-id'] = traceId;
    next();
});

app.post('/checkout', async (req, res) => {
    const { produtoId, valor } = req.body;
    const headers = { 'x-trace-id': req.traceId };

    try {
        console.log(`[TRACE-ID: ${req.traceId}] 1. Verificando estoque...`);
        const estoque = await axios.get(`http://estoque-service:80/estoque/${produtoId}`, { headers });
        
        if (estoque.data.status !== "Disponível") {
            return res.status(400).json({ erro: "Produto fora de estoque" });
        }

        console.log(`[TRACE-ID: ${req.traceId}] 2. Processando pagamento externo...`);
        const pagamento = await axios.post('http://pagamentos-service:80/processar', { valor }, { headers });

        if (pagamento.data.status === "Aprovado") {
            console.log(`[TRACE-ID: ${req.traceId}] 3. Criando pedido no banco de dados...`);
            const novoPedido = await axios.post('http://pedidos-service:80/pedidos', {
                produtoId,
                valor,
                transacaoId: pagamento.data.transacaoId
            }, { headers });
            
            return res.json({
                mensagem: "Compra realizada com sucesso!",
                detalhes: novoPedido.data
            });
        }

    } catch (error) {
        console.error(`[TRACE-ID: ${req.traceId}] ERRO: ${error.message}`);
        res.status(500).json({ 
            erro: "Falha no processo de compra", 
            traceId: req.traceId 
        });
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Gateway rodando na porta ${PORT}`));