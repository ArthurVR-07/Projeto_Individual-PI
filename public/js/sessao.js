// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var username = sessionStorage.USER_NAME;
    var id = sessionStorage.ID_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../index.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    var Botao = document.getElementById("botao_cadastro_login");
    Botao.style.display = "none";
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    var Botao = document.getElementById("botao_cadastro_login");
    divAguardar.style.display = "none";
    Botao.style.display = "flex"

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

function Timeout_erro(){
    cardErro.style.display = "none";
    botao_cadastro_login.style.display = "flex";
    document.getElementById("div_aguardar").style.display = "none";
  }

