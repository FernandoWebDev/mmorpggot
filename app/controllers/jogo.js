module.exports.jogo = function(application, req, res){
  
  if (req.session.autorizado != true){
    application.app.controllers.index.index(application, req, res);
  }

  var msg = "";
  if(req.query.msg != ''){
    msg = req.query.msg;
  }

  var usuario = req.session.usuario;
  var casa = req.session.casa;

  var connection = new application.config.dbConnection;
  var jogoDAO = new application.app.models.jogoDAO(connection);

  jogoDAO.iniciaJogo(res, usuario, casa, msg);

};

module.exports.sair = function(application, req, res){
  
  req.session.destroy(function(err){
    res.render("index", {validacao: {}, dadosForm: {}});
  });
};

module.exports.aldeoes = function(application, req, res){    
  if (req.session.autorizado != true){
    application.app.controllers.index.index(application, req, res);
  }

  res.render("aldeoes", {validacao: {} });  
};

module.exports.pergaminhos = function(application, req, res){   

  if (req.session.autorizado != true){
    application.app.controllers.index.index(application, req, res);
  }  
  
  res.render("pergaminhos", {validacao: {} });  
};

module.exports.ordenar_acao_sudito = function(application, req, res){    

  if (req.session.autorizado != true){
    application.app.controllers.index.index(application, req, res);
  }

  var dadosForm = req.body;

  req.assert("acao", "Ação deve ser informada").notEmpty();
  req.assert("quantidade", "Quantidade deve ser informada").notEmpty();

  var erros = req.validationErrors();

  if (erros){
    res.redirect("jogo?msg=A");
    return;
  }

  var connection = new application.config.dbConnection;
  var jogoDAO = new application.app.models.jogoDAO(connection);

  dadosForm.usuario = req.session.usuario;
  jogoDAO.acao(dadosForm);

  res.redirect('jogo?msg=B');

};