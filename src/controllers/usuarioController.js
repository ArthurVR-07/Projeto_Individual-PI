var usuarioModel = require("../models/usuarioModel");

// Definindo a tabela ASCII estendida com os principais caracteres do teclado ABNT para criptografar / descriptografar a senha
let tabelaASCII = {
    ' ': 32,  '!': 33,  '"': 34,  '#': 35,  '$': 36,  '%': 37,  '&': 38,  "'": 39, '(': 40,  ')': 41,  '*': 42,  '+': 43,  ',': 44,  '-': 45,  '.': 46,  '/': 47, '0': 48,  '1': 49,  '2': 50,  '3': 51,  '4': 52,  '5': 53,  '6': 54,  '7': 55, '8': 56,  '9': 57,  ':': 58,  ';': 59,  '<': 60,  '=': 61,  '>': 62,  '?': 63,
    '@': 64,  'A': 65,  'B': 66,  'C': 67,  'D': 68,  'E': 69,  'F': 70,  'G': 71, 'H': 72,  'I': 73,  'J': 74,  'K': 75,  'L': 76,  'M': 77,  'N': 78,  'O': 79, 'P': 80,  'Q': 81,  'R': 82,  'S': 83,  'T': 84,  'U': 85,  'V': 86,  'W': 87, 'X': 88,  'Y': 89,  'Z': 90,  '[': 91,  '\\': 92, ']': 93,  '^': 94,  '_': 95,
    '`': 96,  'a': 97,  'b': 98,  'c': 99,  'd': 100, 'e': 101, 'f': 102, 'g': 103, 'h': 104, 'i': 105, 'j': 106, 'k': 107, 'l': 108, 'm': 109, 'n': 110, 'o': 111, 'p': 112, 'q': 113, 'r': 114, 's': 115, 't': 116, 'u': 117, 'v': 118, 'w': 119, 'x': 120, 'y': 121, 'z': 122, '{': 123, '|': 124, '}': 125, '~': 126, 'Ç': 128, 
    'é': 130, 'â': 131, 'à': 133, 'ç': 135, 'ê': 136, 'É': 144, 'ô': 147, '¢': 155, '£': 156, '¥': 157, '×': 158, 'á': 160, 'í': 161, 'ó': 162, 'ú': 163, 'ª': 166, 'º': 167, '¿': 168, '¬': 170, '½': 171, '¼': 172, '¡': 173, '«': 174, '»': 175, 'Á': 181, 'Â': 182, 'À': 183, 'ã': 198, 'Ã': 199, 'Ê': 210, 'Í': 214, 'Ó': 224, 
    'Ô': 226, 'õ': 228, 'Õ': 229, 'Ú': 233, '±': 241, '¾': 243, '§': 245, '÷': 246, 
    '°': 248, '¹': 251, '³': 252, '²': 253
};

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        // Criptografando a senha denovo para coincidir com a senha no banco de dados
        let vetor_separar_senha = [];

        // Guarda o decimal de cada caractere no vetor
        for (let i = 0; i < senha.length; i++) {
            vetor_separar_senha[i] = (tabelaASCII[senha[i]] + 3) * 2;
        }

        // Transforma o vetor em string para postar no banco de dados
        let senhaCriptografada = "";
        for (let i = 0; i < vetor_separar_senha.length; i++) {
            senhaCriptografada += vetor_separar_senha[i];
            if (i < vetor_separar_senha.length - 1) {
                senhaCriptografada += "-";
            }
        }

        usuarioModel.autenticar(email, senhaCriptografada)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                    res.json({
                        id:       resultadoAutenticar[0].id,
                        nome:     resultadoAutenticar[0].nome,
                        username: resultadoAutenticar[0].user_name,
                        email:    resultadoAutenticar[0].email
                    });
                    
                    
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Variável que recura os valores do cadastro.html
    var nome = req.body.nomeServer;
    var username = req.body.usernameServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (username == undefined){
        res.status(400).send("Seu username está undefined!")
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Criptografando a senha
        let vetor_separar_senha = [];

        // Guarda o decimal de cada caractere no vetor
        for (let i = 0; i < senha.length; i++) {
            vetor_separar_senha[i] = (tabelaASCII[senha[i]] + 3) * 2;
        }

        // Transforma o vetor em string para postar no banco de dados
        let senhaCriptografada = "";
        for (let i = 0; i < vetor_separar_senha.length; i++) {
            senhaCriptografada += vetor_separar_senha[i];
            if (i < vetor_separar_senha.length - 1) {
                senhaCriptografada += "-";
            }
        }

        // Enviando valores como parâmetro para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, username, email, senhaCriptografada)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}