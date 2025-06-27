const express = require('express');
const path = require('path');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Página de equipamentos (consulta ao banco)
app.get('/equipamentos', async (req, res) => {
  try {
    const produtos = await prisma.produtos.findMany();
    res.render('equipamentos', { produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).send('Erro ao carregar produtos');
  }
});

// Página de produto individual
app.get('/produto/:nome', async (req, res) => {
  try {
    const nome = req.params.nome;
    const produto = await prisma.produtos.findFirst({
      where: { nome }
    });

    if (produto) {
      res.render('produto', { produto });
    } else {
      res.status(404).send('Produto não encontrado');
    }
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).send('Erro ao carregar produto');
  }
});

// Outras páginas
app.get('/sobre', (req, res) => {
  res.render('sobre');
});

app.get('/contato', (req, res) => {
  res.render('contato');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
