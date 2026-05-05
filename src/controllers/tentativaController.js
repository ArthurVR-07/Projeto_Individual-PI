// src/controllers/tentativaController.js
var tentativaModel = require("../models/tentativaModel");

function salvar(req, res) {
    var certas      = req.body.certas;
    var erradas     = req.body.erradas;
    var id_usuario  = req.body.id_usuario;
    var respostas   = req.body.respostas;

    tentativaModel.salvarTentativa(certas, erradas, id_usuario)
        .then(function(resultado) {
            var tentativa_id = resultado.insertId;

            return tentativaModel.salvarRespostasQuestoes(tentativa_id, respostas);
        })
        .catch(function(erro) {
            console.log("Erro ao salvar tentativa:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarUltimoQuiz(req, res) {
    var id_usuario = req.params.id_usuario;

    tentativaModel.buscarUltimoQuiz(id_usuario)
        .then(function(resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum resultado encontrado");
            }
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarUltimos10Quiz(req, res) {
    var id_usuario = req.params.id_usuario;

    tentativaModel.buscarUltimos10Quiz(id_usuario)
        .then(function(resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarAcertosPorQuestao(req, res) {
    tentativaModel.buscarAcertosPorQuestao()
        .then(function(resultado) {
            if (resultado.length > 0){
                res.status(200).json(resultado)
            } else{
                res.status(204).send("Nenhum resultado encontrado");
            }
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    salvar,
    buscarUltimoQuiz,
    buscarUltimos10Quiz,
    buscarAcertosPorQuestao
};