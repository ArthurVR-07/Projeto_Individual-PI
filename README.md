<div align="center">

# ⚔️ Akame Ga Kill

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />

> Projeto individual desenvolvido para a disciplina de Pesquisa e Inovação, um site interativo dedicado ao universo do anime **Akame Ga Kill**, com sistema de login, quiz e dashboard de resultados.

</div>


## 📖 Sobre o Projeto

Este projeto é um fan site temático do anime **Akame Ga Kill**, desenvolvido como projeto individual para a faculdade. O site apresenta informações sobre o universo do anime, incluindo as **Armas Imperiais (Teigu)**, os membros da **Night Raid** e dos **Jaegers**, além de um sistema completo de **autenticação**, **quiz temático** e **dashboard de resultados**.

---

## ✨ Funcionalidades

- 📜 **Catálogo de Teigu** — Apresentação das principais Armas Imperiais do anime
- 🗡️ **Night Raid** — Seção com todos os membros e seus respectivos Teigu
- 🛡️ **Jaegers** — Seção com todos os membros e seus respectivos Teigu
- 📖 **Arcos do Anime** — Resumo de cada arco narrativo ao final da página principal
- 🔐 **Login e Cadastro** — Sistema de autenticação de usuários
- 🧠 **Quiz Temático** — Quiz sobre o universo de Akame Ga Kill (disponível após login)
- 📊 **Dashboard** — Painel com pontuação, percentual de acerto, ranking do usuário e porcentagem de acerto de todos os usuários

---

## 🗺️ Estrutura do Site

### Página Principal (`index.html`)

A página inicial é dividida em quatro seções principais:

**1. Armas Imperiais (Teigu)**
Introdução e explicação sobre o que são as Armas Imperiais, com cards descritivos de cada uma.

**2. Night Raid**
Apresentação de todos os membros da organização revolucionária secreta, com foto, descrição e o Teigu de cada personagem.

**3. Jaegers**
Apresentação de todos os membros da força imperial antagonista, com foto, descrição e o Teigu de cada personagem.

**4. Arcos do Anime**
Resumo cronológico de cada arco da história, ao final da página.

---

### Sistema de Autenticação

| Página | Descrição |
|--------|-----------|
| `login.html` | Formulário de login com e-mail e senha |
| `cadastro.html` | Formulário de cadastro de novo usuário |

Após o login bem-sucedido, o usuário é redirecionado automaticamente para a página de quiz.

---

### Quiz (`dashboard_quiz.html`)

- Perguntas sobre personagens, Teigu, arcos e eventos do anime
- Ao concluir, o usuário pode **tentar novamente** ou acessar a **dashboard**

---

### Dashboard (`dashboard_graficos.html`)

Painel de resultados com:
- 📈 Pontuação individual do usuário
- 📊 Percentual de acerto do usuário
- 🏆 Ranking do usuário
- 📊 Percentual de acerto de cada pergunta de **todos os usuários**

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 14 ou superior)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/ArthurVR-07/Projeto_Individual-PI.git

# 2. Acesse a pasta do projeto
cd Projeto_Individual-PI

# 3. Instale as dependências (se houver)
npm i

# 4. Inicie o servidor
node start

# 5. Acesse no navegador
# http://localhost:8080
```

## 📁 Estrutura de Arquivos

```
Projeto_Individual-PI/
│
├── public/
│   │
│   ├── assets/
│   │
│   ├── css/
│   │   ├── dashboard.css
│   │   ├── equipes.css
│   │   ├── index.css
│   │   ├── login_cadastro.css
│   │   ├── quiz.css
│   │   └── sidebar.css
│   │
│   ├── js/
│   │   ├── criptografia.js
│   │   └── sessao.js
│   │
│   ├── dashboard/
│   │   ├── dashboard_graficos.html
│   │   └── dashboard_quiz.html
│   │
│   ├── cadastro.html
│   ├── index.html
│   ├── jaegers.html
│   ├── login.html
│   └── night_raid.html
│
├── src/
│   │
│   ├── controllers/
│   │   ├── tentativaController.js
│   │   └── usuarioController.js
│   │
│   ├── database/
│   │   ├── config.js
│   │   └── script-tabelas.sql
│   │
│   ├── models/
│   │   ├── tentativaModel.js
│   │   └── usuarioModel.js
│   │
│   └── routes/
│       ├── index.js
│       ├── tentativas.js
│       └── usuarios.js
│
├── app.js
├── package.json
├── .gitignore
├── LICENSE
└── README.md
```
