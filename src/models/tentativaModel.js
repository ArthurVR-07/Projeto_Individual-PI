var database = require("../database/config");

function salvarTentativa(porcentagem_acerto, id_usuario) {
    var instrucaoSql = `
        INSERT INTO tentativa (porcentagem_acerto, id_usuario)
        VALUES (${porcentagem_acerto}, ${id_usuario});
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarRespostasQuestoes(tentativa_id, respostas) {
    var valores = "";

    for (let i = 0; i < respostas.length; i++) {
        valores += `(${tentativa_id}, ${respostas[i].questao_id}, ${respostas[i].resultado})`;

        if (i < respostas.length - 1) {
            valores += ", ";
        }
    }

    var instrucaoSql = `
        INSERT INTO tentativa_questao (tentativa_id, questao_id, resultado)
        VALUES ${valores};
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimoQuiz(id_usuario) {
    var instrucaoSql = `
        SELECT porcentagem_acerto
        FROM tentativa
        WHERE id_usuario = ${id_usuario}
        ORDER BY data_horario DESC
        LIMIT 1;
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarAcertosPorQuestao() {
    var instrucaoSql = `
        SELECT 
            questao_id,
            ROUND((SUM(resultado) / COUNT(*)) * 100) AS porcentagem_acertos
        FROM tentativa_questao
        GROUP BY questao_id
        ORDER BY questao_id ASC;
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarPontuacao(id_usuario){
    var instrucaoSql = `
    SELECT pontuacao
    FROM usuario
    WHERE id = ${id_usuario}
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarPontuacao(id_usuario, pontos_ganhos) {
    var instrucaoSql = `
        UPDATE usuario
        SET pontuacao = pontuacao + ${pontos_ganhos}
        WHERE id = ${id_usuario};
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRank(id_usuario){
    var instrucaoSql = `
        SELECT COUNT(*) + 1 AS posicao
        FROM usuario
        WHERE pontuacao > (
            SELECT pontuacao 
            FROM usuario 
            WHERE id = ${id_usuario}
        );
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    salvarTentativa,
    salvarRespostasQuestoes,
    buscarUltimoQuiz,
    buscarPontuacao,
    buscarAcertosPorQuestao,
    atualizarPontuacao,
    buscarRank
};