function UsuariosDAO(connection) {
  this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
  var mongoConnected = this._connection.connectToMongo(function(client, db) {
      const collection = db.collection('usuarios');
      console.log('UsuariosDAO.collection = ' + collection);
      collection.insert(usuario);
      client.close();
  })
}

module.exports = function(){
  return UsuariosDAO;
}
