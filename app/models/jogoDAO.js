function jogoDAO(connection){
    this._connection = connection;
}

jogoDAO.prototype.gerarParametros = function(usuario){
    var mongoConnected = this._connection.connectToMongo(function(client, db) {
        const collection = db.collection('jogo');
        collection.insert({
            usuario: usuario,
            moeda: 15,
            suditos: 10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
        client.close();
    });
};

jogoDAO.prototype.iniciaJogo = function(res, usuario, casa) {

    var mongoConnected = this._connection.connectToMongo(function(client, db) {
        const collection = db.collection('jogo');
        collection.find({usuario : usuario}).toArray(function(err, result){                  
            
            console.log(result[0]);
            res.render('jogo', {img_casa: casa, jogo: result[0]});
            
        });
        client.close();
    })
};

module.exports = function(){
    return jogoDAO;
}