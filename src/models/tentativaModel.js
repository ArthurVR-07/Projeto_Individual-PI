var database = require("../database/config");

function salvarTentativa(certas, erradas, id_usuario) {
    var instrucaoSql = `
        INSERT INTO tentativa (certas, erradas, id_usuario)
        VALUES (${certas}, ${erradas}, ${id_usuario});
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarRespostasQuestoes(tentativa_id, respostas) {
    var valores = "";

    for (var i = 0; i < respostas.length; i++) {
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
        SELECT certas, erradas
        FROM tentativa
        WHERE id_usuario = ${id_usuario}
        ORDER BY data_horario DESC
        LIMIT 1;
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimos10Quiz(id_usuario) {
    var instrucaoSql = `
        SELECT SUM(certas) AS certas, SUM(erradas) AS erradas
        FROM (
            SELECT certas, erradas
            FROM tentativa
            WHERE id_usuario = ${id_usuario}
            ORDER BY data_horario DESC
            LIMIT 10
        ) AS ultimos10;
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

module.exports = {
    salvarTentativa,
    salvarRespostasQuestoes,
    buscarUltimoQuiz,
    buscarUltimos10Quiz,
    buscarAcertosPorQuestao
};