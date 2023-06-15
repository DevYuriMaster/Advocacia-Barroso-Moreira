const express = require('express');
const connection = require("./assets/database/database");
const Cadastro = require("./assets/database/cadastro");
const Newsletter = require("./assets/database/newsletter");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Pergunta = require('./assets/database/pergunta');
const Resposta = require('./assets/database/resposta');
const session = require('express-session');
const { Op } = require("sequelize");
const app = express();
const path = require('path');

// Configuração do mecanismo de visualização do Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: '' }));
app.set('views', path.join(__dirname, 'views'));
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
app.use(bodyParser.urlencoded({ extended: true })); // Alterado para extended: true
app.use(bodyParser.json());

//session-config
app.use(session({
    secret: "Master71190407*",
    resave: false,
    saveUninitialized: true
}));

//Verificador

function verificarAutenticacao(req, res, next) {
    if (req.session.autenticado) {
        // O usuário está autenticado, permita o acesso à próxima rota
        return next(); // Adicionado o 'return' aqui
    } else {
        // O usuário não está autenticado, redirecione-o para a página de loginADM
        return res.redirect("/loginADM"); // Adicionado o 'return' aqui
    }
}


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

app.get("/loginADM", (req, res) => {
    res.render('layouts/loginADM');
});

app.post("/loginADM", (req, res) => {
    const cpf = req.body.cpf;
    const senha = req.body.senha;

    // Realizei a validação do CPF e senha aqui


    const usuarioCorreto = {
        cpf: "00000000000",
        senha: "admin"
    };

    if (cpf === usuarioCorreto.cpf && senha === usuarioCorreto.senha) {
        // CPF e senha estão corretos, redirecione o usuário para a página inicial
        req.session.autenticado = true;
        return res.redirect("/login"); // Alterado para /login
    } else {
        // CPF ou senha incorretos, redirecione-o para a página de loginADM
        return res.redirect("/loginADM");
    }
});

app.get("/login", verificarAutenticacao, (req, res) => {

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
        res.redirect('logar');
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



app.get("/logar", (req, res) => {
    res.render('layouts/logar');
});

app.post("/logar", (req, res) => {
    var cpf = req.body.cpf;
    var senha = req.body.senha;
    Cadastro.findOne({ where: { cpf: cpf, senha: senha } }).then((cadastro) => {
        console.log(cadastro)
        if (cadastro) {
            // Autenticação bem-sucedida, redirecione o usuário para a página inicial
            console.log("Login bem sucedido!");
            res.redirect('/');
        } else {
            // Autenticação falhou, exiba uma mensagem de erro
            console.log("Erro ao logar ou usuário não encontrado");
            res.render('layouts/logar', { erro: 'CPF ou senha inválida!' });
        }
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
                const respostasContext = respostas.map(resposta => {
                    return {
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

app.post("/pergunta/:id/responder", verificarAutenticacao, (req, res) => {
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
