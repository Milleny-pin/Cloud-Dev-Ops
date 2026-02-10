CREATE TABLE IF NOT EXISTS pedido_loja (
    id SERIAL PRIMARY KEY,
    produto VARCHAR(100),
    quantidade INTEGER,
    status VARCHAR(20)
);