// src/routes/tentativas.js
var express = require("express");
var router = express.Router();
var tentativaController = require("../controllers/tentativaController");

router.post("/salvar", function(req, res) {
    tentativaController.salvar(req, res);
});

router.get("/ultimo/:id_usuario", function(req, res) {
    tentativaController.buscarUltimoQuiz(req, res);
});

router.get("/pontuacao/:id_usuario", function(req, res) {
    tentativaController.buscarPontuacao(req, res);
});

router.get("/rank/:id_usuario", function(req, res) {
    tentativaController.buscarRank(req, res);
});

router.get("/questoes", function(req, res) {
    tentativaController.buscarAcertosPorQuestao(req, res);
});

module.exports = router;