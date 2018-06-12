function UsuariosDAO(connection) {
  this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
  var mongoConnected = this._connection.connectToMongo(function(client, db) {
      const collection = db.collection('usuarios');
      collection.insert(usuario);
      client.close();
  })
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res) {
  var mongoConnected = this._connection.connectToMongo(function(client, db) {
      const collection = db.collection('usuarios');
      collection.find(usuario).toArray(function(err, result){        

        if(result[0] != undefined){
          req.session.autorizado = true;
          req.session.usuario = result[0].usuario;
          req.session.casa = result[0].casa;
        }

        if (req.session.autorizado){
          res.redirect('jogo');
        } else {
          res.render("index", {validacao: [{msg: 'Usuário ou senha não encontrados.'}], dadosForm: usuario});
        }

      });
      client.close();
  })
}

module.exports = function(){
  return UsuariosDAO;
}
