function jogoDAO(connection){
    this._connection = connection;
};

jogoDAO.prototype.gerarParametros = function(usuario) {
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

jogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg) {

    var mongoConnected = this._connection.connectToMongo(function(client, db) {
        const collection = db.collection('jogo');
        collection.find({usuario : usuario}).toArray(function(err, result){                  
            
            res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg});
            
        });
        client.close();
    });
};

jogoDAO.prototype.acao = function(acao){
    var mongoConnected = this._connection.connectToMongo(function(client, db) {
        const collection = db.collection('acao');

        var date = new Date();
        var tempo = null;

        switch (acao.acao) {
            case '1': 
                tempo = 1 * 60 * 60000;                
                break;
            case '2': 
                tempo = 2 * 60 * 60000;
                break;
            case '3': 
                tempo = 3 * 60 * 60000;
                break;
            case '4': 
                tempo = 4 * 60 * 60000;                                                    
                break;
        }

        acao.acao_termina_em = date.getTime() + tempo;
        collection.insert(acao);

        client.close();
    });
};

module.exports = function(){
    return jogoDAO;
};