const checkbox = document.getElementById("aceitar");
const lerMais = document.getElementById("lerMais");

const overlaySermao = document.getElementById("overlaySermão");
const overlayParabens = document.getElementById("overlayParabens");

let leuTermos = false;

// Quando clicar em "Ler mais"
lerMais.addEventListener("click", function () {
  leuTermos = true;
  overlayParabens.style.display = "flex";
});

// Quando marcar a checkbox
checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    if (!leuTermos) {
      overlaySermao.style.display = "flex";
    }
  }
});

function fecharSermão() {
  overlaySermao.style.display = "none";
}

function fecharParabens() {
  overlayParabens.style.display = "none";
}

// efeito glitch
document.addEventListener("DOMContentLoaded", function () {
  const btnAvancar = document.getElementById("btnAvancar");
  const transicao = document.getElementById("transicao");
  const barra = document.getElementById("barra");
  const porcentagem = document.getElementById("porcentagem");
  const texto = document.getElementById("textoCarregando");
  const som = document.getElementById("somTransicao");
  const checkbox = document.getElementById("aceitar");

  btnAvancar.classList.add("bloqueado");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      btnAvancar.classList.remove("bloqueado");
    } else {
      btnAvancar.classList.add("bloqueado");
    }
  });

  

  if (btnAvancar) {
    btnAvancar.addEventListener("click", function (e) {
      e.preventDefault();

      transicao.classList.add("ativa");
      som.volume = 1.0; // volume máximo (vai de 0.0 até 1.0)
      som.play();

      let progresso = 0;

      const intervalo = setInterval(() => {
        progresso++;

        barra.style.width = progresso + "%";
        porcentagem.innerText = progresso + "%";

        // Mensagens dinâmicas
        if (progresso == 30) {
          texto.innerText = "Verificando permissões...";
        }

        if (progresso == 60) {
          texto.innerText = "Autenticando usuário...";
        }

        if (progresso == 85) {
          texto.innerText = "Acesso autorizado";
          texto.classList.add("glitch");
        }

        if (progresso >= 100) {
          clearInterval(intervalo);
          setTimeout(() => {
            window.location.href = btnAvancar.href;
          }, 500);
        }
      }, 20); // velocidade da barra
    });
  }
});
