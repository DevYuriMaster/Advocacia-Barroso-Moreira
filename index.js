const express = require('express');
const connection = require("./assets/database/database");
const Cadastro = require("./assets/database/cadastro");
const Newsletter = require("./assets/database/newsletter");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Pergunta = require('./assets/database/pergunta');
const Resposta = require('./assets/database/resposta');
const app = express();
const path = require('path');

// Configuração do mecanismo de visualização do Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: '' }));
app.set('view engine', 'handlebars');


//Pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, "assets")));

//Autênticando conexão 
connection.authenticate().then(() => {
    console.log("Conectado ao banco de dados ");
}).then(() => {
    console.log('Erro ao se conectar');
});


//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
    res.render('layouts/index');
});


app.post("/newsletter", (req, res) => {
    Newsletter.create({
        email: req.body.email
    }).then(() => {
        res.send('Email cadastrado');
    }).catch((erro) => {
        res.send('Erro ao cadastrar o usuário. ' + erro);
    });
});

app.get("/cadastro", (req, res) => {
    res.render('layouts/cadastro');
});

app.get("/login", (req, res) => {
    Cadastro.findAll().then((cadastros) => {
        const context = cadastros.map(cadastro => cadastro.get({ plain: true }));
        res.render('layouts/login', { cadastros: context });
    }).catch(err => {
        console.log('Falha ao exibir usuários');
    });

});

app.post("/login", (req, res) => {
    Cadastro.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        cpf: req.body.cpf,
        senha: req.body.senha
    }).then(() => {
        res.redirect('login');
    }).catch((erro) => {
        res.send("Erro ao cadastrar o usuário" + erro);
    });
});


app.get('/login/:id', (req, res) => {
    Cadastro.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect('login');
    }).catch((erro) => {
        console.log('Usuário não excluído');
    });
});

app.get("/calculo", (req, res) => {
    res.render('layouts/calculoPenal');
});


app.get("/consultar", (req, res) => {
    res.render('layouts/consultoria');
});


app.get("/salvar", (req, res) => {
    Pergunta.findAll().then((perguntas) => {
        const context = perguntas.map(pergunta => pergunta.get({ plain: true }));
        res.render('layouts/visualizar', { perguntas: context });
    }).catch(() => {
        console.log('Falha ao exibir as perguntas');
    });
});


app.post("/salvar", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    /*Insert into*/
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/salvar");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                tableName: 'resposta'
            }).then(respostas => {
                console.log(respostas);
                const respostasContext = respostas.map(resposta =>{
                    return{
                        corpo: resposta.corpo
                    };
                });    
                
               console.log(respostasContext);

                res.render("layouts/pergunta", {
                    pergunta: pergunta.get(),
                    respostas: respostasContext
                });
            });
        } else {
            res.redirect("/salvar");
        }
    });
});

app.post("/pergunta/:id/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

app.listen(8080, (err) => {
    if (err) {
        console.log('Erro ao iniciar o servidor!');
    } else {
        console.log('Servidor rodando na porta: 8080');
    }
});
