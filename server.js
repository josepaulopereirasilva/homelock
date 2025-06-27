const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT||3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota da página Sobre
app.get('/sobre', (req, res) => {
  res.render('sobre');
});

app.get('/contato', (req, res) => {
  res.render('contato');
});

// Banco de dados fake
const produtos = {
  'camera-ip-wifi': {
    titulo: 'Câmera IP Wi-Fi',
    preco: 'R$ 299,00',
    descricao: 'Alta resolução, visão noturna e acesso remoto.',
    imagem: 'camera.jpg'
  },
  'intelligent-alarm': {
    titulo: 'Intelligent Alarm',
    preco: 'R$ 199,00',
    descricao: 'Alarme inteligente, com 1 sensor de movimento, 4 sensores de porta/janela, 2 chaveiros RFID, 2 controles remotos, caixa de som. Perfeito para maior segurança em sua casa.',
    imagem: 'alarme.jpg'
  },
  'baba-eletronica': {
    titulo: 'Babá Eletrônica',
    preco: 'R$ 379,00',
    descricao: 'Monitoramento de áudio e vídeo em tempo real para bebês.',
    imagem: 'baba.jpg'
  },
  'revolver': {
    titulo: 'Revólver',
    preco: 'R$ 8.000,00',
    descricao: 'Efetividade Garantida.',
    imagem: 'revolver.jpg'
  },
  'camera-solar': {
    titulo: 'Câmera com Luz Solar',
    preco: 'R$ 449,00',
    descricao: 'Câmera com painel solar e LED de segurança integrado.',
    imagem: 'solar.jpg'
  }
};

// Página inicial
app.get('/', (req, res) => {
  res.render('index')
});

app.get('/equipamentos',(req,res)=>{
  res.render('equipamentos')
})

// Página de produto
app.get('/produto/:nome', (req, res) => {
  const produto = produtos[req.params.nome];
  if (produto) {
    res.render('produto', { produto });
  } else {
    res.status(404).send('Produto não encontrado');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
