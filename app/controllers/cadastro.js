module.exports.cadastro = function(application, req, res){
  res.render("cadastro", {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res){

  var dadosForm = req.body;

  req.assert("nome", "Nome não pode ser vazio").notEmpty();
  req.assert("usuario", "Usuário não pode ser vazio").notEmpty();
  req.assert("senha", "Senha não pode ser vazio").notEmpty();
  req.assert("casa", "Casa não pode ser vazio").notEmpty();

  var erros = req.validationErrors();

  if (erros){
    res.render("cadastro", {validacao: erros, dadosForm: dadosForm});
    return;
  }

  var connection = new application.config.dbConnection;

  var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
  var jogoDAO = new application.app.models.jogoDAO(connection);

  UsuariosDAO.inserirUsuario(dadosForm);
  jogoDAO.gerarParametros(dadosForm.usuario);

  application.app.controllers.index.index(application, req, res);
}
