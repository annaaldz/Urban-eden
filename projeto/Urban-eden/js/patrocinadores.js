function configurarMenu() {
  const botao = document.getElementById("menuToggle");
  const menu = document.getElementById("menuPrincipal");

  if (botao === null || menu === null) {
    return;
  }

  function alternarMenu() {
    menu.classList.toggle("aberto");

    const aberto = menu.classList.contains("aberto");
    botao.setAttribute("aria-expanded", aberto);
    console.log("Menu aberto? " + aberto);
  }

  botao.addEventListener("click", alternarMenu);

  const linksMenu = menu.querySelectorAll("a");
  linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("aberto");
      botao.setAttribute("aria-expanded", false);
    });
  });
}

function marcarPaginaAtual() {
  const caminho = window.location.pathname.split("/");
  const arquivo = caminho[caminho.length - 1];

  const paginas = {
    "index.html": "sobre",
    "patrocinadores.html": "sobre",
    "formulario.html": "sobre",
  };

  const paginaAtual = paginas[arquivo];
  console.log("Página atual: " + arquivo + " → " + paginaAtual);

  const links = document.querySelectorAll(".main-header nav a[data-pagina]");
  links.forEach(function (link) {
    if (link.getAttribute("data-pagina") === paginaAtual) {
      link.classList.add("active");
    }
  });
}

function configurarBotaoPatrocinador() {
  const botao = document.getElementById("btnPatrocinador");
  if (botao === null) {
    return; 
  }

  botao.addEventListener("click", function () {
    const caminho = window.location.pathname;
    const emPages = caminho.indexOf("/pages/") !== -1;
    const destino = emPages ? "formulario.html" : "pages/formulario.html";
    console.log("Indo para: " + destino);
    window.location.href = destino;
  });
}

function configurarAnimacaoFotos() {
  const cards = document.querySelectorAll(".card-parceiro");
  if (cards.length === 0) {
    return;
  }

  const listaCards = [];
  cards.forEach(function (card) {
    listaCards.push(card);
  });
  console.log("Cards de patrocinadores encontrados: " + listaCards.length);

  listaCards.forEach(function (card) {
    const foto = card.querySelector("img");

    card.addEventListener("mousemove", function (evento) {
      const retangulo = card.getBoundingClientRect();

      const x = (evento.clientX - retangulo.left) / retangulo.width;
      const y = (evento.clientY - retangulo.top) / retangulo.height;

      const mx = x - 0.5;
      const my = y - 0.5;

      if (foto !== null) {
        foto.style.setProperty("--mx", mx);
        foto.style.setProperty("--my", my);
      }
    });

    card.addEventListener("mouseleave", function () {
      if (foto !== null) {
        foto.style.setProperty("--mx", 0);
        foto.style.setProperty("--my", 0);
      }
    });
  });
}

function aplicarMascaraTelefone(valor) {
  let numeros = valor.replace(/\D/g, "");

  if (numeros.length > 11) {
    numeros = numeros.slice(0, 11);
  }

  let resultado = "";
  if (numeros.length > 0) {
    resultado = "(" + numeros.substring(0, 2);
  }
  if (numeros.length > 2) {
    resultado += ") " + numeros.substring(2, 7);
  }
  if (numeros.length > 7) {
    resultado += "-" + numeros.substring(7, 11);
  }
  return resultado;
}

function configurarMascaraTelefone() {
  const telefone = document.getElementById("telefone");
  if (telefone === null) {
    return; 
  }

  telefone.addEventListener("input", function () {
    telefone.value = aplicarMascaraTelefone(telefone.value);
  });
}

function configurarToggleSenha() {
  const botoes = document.querySelectorAll(".btn-toggle-senha");
  if (botoes.length === 0) {
    return;
  }

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const alvoId = botao.getAttribute("data-target");
      const input = document.getElementById(alvoId);
      if (input === null) {
        return;
      }

      if (input.type === "password") {
        input.type = "text";
        botao.setAttribute("aria-label", "Ocultar senha");
      } else {
        input.type = "password";
        botao.setAttribute("aria-label", "Mostrar senha");
      }

      const olhoAberto = botao.querySelector(".olho-aberto");
      const olhoFechado = botao.querySelector(".olho-fechado");
      if (olhoAberto !== null && olhoFechado !== null) {
        const visivel = input.type === "text";
        olhoAberto.style.display = visivel ? "none" : "inline";
        olhoFechado.style.display = visivel ? "inline" : "none";
      }
    });
  });
}

const camposParaValidar = [
  "empresa",
  "responsavel",
  "email",
  "telefone",
  "senha",
  "senhaConfirm",
];

function validarCampo(idCampo) {
  const campo = document.getElementById(idCampo);
  if (campo === null) {
    return "";
  }
  const valor = campo.value.trim();

  if (valor === "") {
    return "Este campo é obrigatório.";
  }

  if (idCampo === "email") {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexEmail.test(valor) === false) {
      return "E-mail inválido.";
    }
  }

  if (idCampo === "telefone") {

    const digitos = valor.replace(/\D/g, "");
    if (digitos.length < 10) {
      return "Telefone incompleto.";
    }
  }

  if (idCampo === "senha") {
    if (valor.length < 6) {
      return "A senha precisa ter no mínimo 6 caracteres.";
    }
  }

  if (idCampo === "senhaConfirm") {
    const senha = document.getElementById("senha");
    if (senha !== null && valor !== senha.value) {
      return "As senhas não coincidem.";
    }
  }

  return ""; 
}

function mostrarErro(idCampo, mensagem) {
  const campo = document.getElementById(idCampo);
  const spanErro = document.getElementById("erro-" + idCampo);

  if (campo !== null) {
    if (mensagem !== "") {
      campo.classList.add("erro");
      campo.classList.remove("sucesso");
    } else {
      campo.classList.remove("erro");
      if (campo.value.trim() !== "") {
        campo.classList.add("sucesso");
      }
    }
  }

  if (spanErro !== null) {
    spanErro.textContent = mensagem;
  }
}

function mostrarMensagemGeral(tipo, texto) {
  const caixa = document.getElementById("mensagemBox");
  if (caixa === null) {
    return;
  }
  caixa.textContent = texto;
  caixa.classList.remove("erro", "sucesso");
  if (tipo !== "") {
    caixa.classList.add(tipo);
  }
}

function esperar(ms) {
  return new Promise(function (resolver) {
    setTimeout(resolver, ms);
  });
}

async function validarFormulario(evento) {
  evento.preventDefault();

  let temErro = false;
  const erros = []; 

  camposParaValidar.forEach(function (idCampo) {
    const mensagem = validarCampo(idCampo);
    mostrarErro(idCampo, mensagem);

    if (mensagem !== "") {
      temErro = true;
      erros.push(idCampo + ": " + mensagem); 
    }
  });

  const privacidade = document.getElementById("privacidade");
  const spanPrivacidade = document.getElementById("erro-privacidade");
  const linhaPrivacidade = document.getElementById("linha-privacidade");
  if (privacidade !== null && privacidade.checked === false) {
    temErro = true;
    erros.push("privacidade: você precisa aceitar a Política de Privacidade");
    if (spanPrivacidade !== null) {
      spanPrivacidade.textContent =
        "Você precisa aceitar a Política de Privacidade.";
    }
    if (linhaPrivacidade !== null) {
      linhaPrivacidade.classList.add("erro");
    }
  } else {
    if (spanPrivacidade !== null) {
      spanPrivacidade.textContent = "";
    }
    if (linhaPrivacidade !== null) {
      linhaPrivacidade.classList.remove("erro");
    }
  }

  console.log("Erros encontrados:", erros);

  if (temErro === true) {
    mostrarMensagemGeral("erro", "Por favor, corrija os campos destacados.");
    return;
  }

  const botaoCriar = document.getElementById("btnCriar");
  if (botaoCriar !== null) {
    botaoCriar.classList.add("carregando");
    botaoCriar.textContent = "Enviando...";
  }

  mostrarMensagemGeral("", "");

  const dados = {
    empresa: document.getElementById("empresa").value,
    responsavel: document.getElementById("responsavel").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    newsletter: document.getElementById("newsletter").checked,
  };
  const dadosJSON = JSON.stringify(dados);
  console.log("Dados enviados (JSON):", dadosJSON);

  await esperar(1000);

  if (botaoCriar !== null) {
    botaoCriar.classList.remove("carregando");
    botaoCriar.textContent = "Criar conta";
  }
  mostrarMensagemGeral(
    "sucesso",
    "Cadastro enviado com sucesso! Em breve entraremos em contato. 🌱"
  );

  const form = document.getElementById("formPatrocinador");
  if (form !== null) {
    form.reset();
  }
}

function configurarFormulario() {
  const form = document.getElementById("formPatrocinador");
  if (form === null) {
    return;
  }

  form.addEventListener("submit", validarFormulario);

  camposParaValidar.forEach(function (idCampo) {
    const campo = document.getElementById(idCampo);
    if (campo !== null) {
      campo.addEventListener("blur", function () {
        const mensagem = validarCampo(idCampo);
        mostrarErro(idCampo, mensagem);
      });
    }
  });
}

function configurarBotaoLogin() {
  const botao = document.getElementById("btnLogin");
  if (botao === null) {
    return;
  }

  botao.addEventListener("click", function () {
    alert(
      "Tela de login ainda não implementada. 🚧\n" +
        "Quando estiver pronta, este botão levará até ela."
    );
  });
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Urban Eden — script carregado! 🌱");

  configurarMenu();
  marcarPaginaAtual();
  configurarBotaoPatrocinador();
  configurarAnimacaoFotos();
  configurarMascaraTelefone();
  configurarToggleSenha();
  configurarFormulario();
  configurarBotaoLogin();
});
