const authMiddleware = (req, res, next) => {
    const cpf = req.body.cpf;
    const senha = req.body.senha;

    if (cpf === "00000000000" && senha === "admin") {
        // CPF e senha válidos, permitir o acesso à próxima rota
        next();
    } else {
        // CPF ou senha inválidos, redirecionar para página de loginADM
        res.redirect("/login");
    }
};