# Sistema de Microsserviços – E-commerce
## Projeto de Arquitetura de Software: Cloud & DevOps

Este projeto apresenta uma arquitetura de microsserviços voltada para um fluxo de compras online, aplicando práticas modernas de conteinerização, orquestração e observabilidade, com foco em escalabilidade, resiliência e automação.

---

## 1. Visão Geral da Arquitetura

A aplicação é composta por serviços independentes, isolados em containers Docker e comunicando-se via APIs REST.

### Componentes

- **API Gateway (Porta 8080)**  
  Ponto de entrada único do sistema. Responsável pelo roteamento das requisições e pela implementação de Trace-ID, garantindo rastreabilidade completa entre os microsserviços.

- **Serviço de Pedidos (Porta 3000)**  
  Gerencia o ciclo de vida das transações, incluindo criação e persistência de pedidos em banco de dados relacional.

- **Serviço de Estoque (Porta 3000)**  
  Responsável pela validação e reserva de produtos durante o fluxo de compra.

- **Banco de Dados – PostgreSQL**  
  Sistema de persistência relacional utilizado para armazenamento dos dados de pedidos.

---

## 2. Tecnologias Utilizadas

### 2.1 Infraestrutura e Orquestração

- Docker & Docker Compose  
  Empacotamento das aplicações e padronização do ambiente de desenvolvimento.

- Kubernetes (Minikube)  
  Orquestrador responsável por:
  - Alta disponibilidade  
  - Escalabilidade  
  - Resiliência (Self-healing)

- GitHub Actions  
  Pipeline de CI/CD para automação dos processos de integração e entrega contínua.

### 2.2 Desenvolvimento (Backend)

- Node.js & Express  
  Framework para construção das APIs REST.

- Axios  
  Cliente HTTP para comunicação entre microsserviços.

- node-postgres (PG Driver)  
  Conectividade nativa com o banco de dados PostgreSQL.

---

## 3. Resiliência e Monitoramento (Kubernetes)

Para atender aos requisitos mínimos de produção, a arquitetura implementa os seguintes mecanismos:

- **Liveness Probe**  
  Monitoramento contínuo via endpoint `/health`.  
  Em caso de falha crítica, o Kubernetes reinicia automaticamente o container (Self-healing).

- **Readiness Probe**  
  Endpoint `/ready` utilizado para validar a conectividade com o banco de dados antes de liberar o serviço para receber tráfego.

- **Alta Disponibilidade**  
  Configuração de múltiplas réplicas para serviços críticos, eliminando pontos únicos de falha e garantindo continuidade operacional.

---

## 4. Como Executar o Projeto

### 4.1 Pré-requisitos

- Docker Desktop  
- Docker Compose  
- Minikube  
- Kubectl  
- Node.js (opcional para execução local fora do container)

---

### 4.2 Execução Local (Docker Compose)

```bash
# Iniciar a orquestração de todos os serviços e o banco de dados
docker-compose up -d

# Validar se todos os containers estão em execução
docker ps
