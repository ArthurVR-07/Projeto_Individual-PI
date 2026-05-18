var tentativaModel = require("../models/tentativaModel");

function salvar(req, res) {
    var porcentagem_acerto = req.body.porcentagem_acerto;
    var id_usuario  = req.body.id_usuario;
    var respostas   = req.body.respostas;

    tentativaModel.buscarAcertosPorQuestao()
        .then(function(porcentagens) {

            let pontos_ganhos = 0;
            for (let i = 0; i < respostas.length; i++) {
                if (respostas[i].resultado == 1) {
                    let questao = null;
                    for (let j = 0; j < porcentagens.length; j++) {
                        if (porcentagens[j].questao_id == respostas[i].questao_id) {
                        questao = porcentagens[j];
                        break;
                        }
                    }

                    // Uma validação para caso o banco esteja vazio 
                    let porcentagem = null;
                    if (questao != null) {
                        porcentagem = questao.porcentagem_acertos;
                    } else {
                        porcentagem = 50; 
                    }

                    if (porcentagem >= 70) {
                        pontos_ganhos += 10;
                    } else if (porcentagem >= 30) {
                        pontos_ganhos += 30;
                    } else {
                        pontos_ganhos += 50;
                    }
                }
            }

            return tentativaModel.salvarTentativa(porcentagem_acerto, id_usuario)
                .then(function(resultado) {
                    var tentativa_id = resultado.insertId;
                    return tentativaModel.salvarRespostasQuestoes(tentativa_id, respostas);
                })
                .then(function() {
                    return tentativaModel.atualizarPontuacao(id_usuario, pontos_ganhos);
                })
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
                console.log(resultado)
            } else {
                res.status(204).send("Nenhum resultado encontrado");
            }
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

function buscarPontuacao(req, res) {
    var id_usuario = req.params.id_usuario;

    tentativaModel.buscarPontuacao(id_usuario)
        .then(function(resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
                console.log(resultado)
            } else {
                res.status(204).send("Nenhum resultado encontrado");
            }
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarRank(req, res) {
    var id_usuario = req.params.id_usuario;

    tentativaModel.buscarRank(id_usuario)
    .then(function(resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
            console.log(resultado)
        } else {
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
    buscarPontuacao,
    buscarAcertosPorQuestao,
    buscarRank
};