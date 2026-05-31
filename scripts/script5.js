/* =========================
   RELÓGIO — HUD
========================= */

/* =========================
   ID DE SESSÃO — HUD
========================= */

/* =========================
   BOTÃO CONTINUAR — MODAL
========================= */

document.getElementById("btnContinuar").addEventListener("click", function () {
  const overlay = document.getElementById("modalOverlay");
  const central = document.getElementById("centralWrapper");
  const somContinuar = document.getElementById("somContinuar");
  const musicaFundo = document.getElementById("musicaFundo");

  // Evita múltiplos cliques
  this.disabled = true;

  // Guarda o volume atual
  const volumeOriginal = musicaFundo.volume;

  // Abaixa a música de fundo
  musicaFundo.volume = 0.1;

  // Toca o som
  somContinuar.currentTime = 0;
  somContinuar.play();

  // Após 1 segundo
  setTimeout(() => {
    // Para o som
    somContinuar.pause();
    somContinuar.currentTime = 0;

    // Restaura o volume da música
    musicaFundo.volume = volumeOriginal;

    // Fecha o modal
    overlay.classList.add("fechando");

    // Aguarda a animação terminar
    setTimeout(() => {
      overlay.style.display = "none";
      central.classList.add("liberado");
    }, 600);
  }, 1000); // 1000 ms = 1 segundo
});

/* =========================
   LÓGICA DOS CARDS
========================= */

// Rastreia quais cards foram configurados
const cardsConfigurados = {
  bloqueio: false,
  tempo: false,
  relatorio: false,
  alertas: false,
  controle: false,
};

// Marca card como configurado e atualiza visual
function marcarConfigurado(cardId, badgeTexto) {
  if (cardsConfigurados[cardId]) return;

  cardsConfigurados[cardId] = true;

  const card = document.getElementById("card-" + cardId);
  const status = document.getElementById("status-" + cardId);
  const badge = document.getElementById("badge-" + cardId);

  card.classList.add("configurado");
  status.textContent = "CONFIGURADO";
  badge.textContent = badgeTexto || "OK";

  atualizarProgresso();
}

// Atualiza barra de progresso e mostra botão ao completar
function atualizarProgresso() {
  const total = Object.keys(cardsConfigurados).length;
  const concluidos = Object.values(cardsConfigurados).filter(Boolean).length;
  const pct = (concluidos / total) * 100;

  document.getElementById("progressoBar").style.width = pct + "%";
  document.getElementById("progressoTexto").textContent =
    concluidos + " / " + total;

  if (concluidos === total) {
    document.getElementById("concluidoWrap").classList.add("visivel");
  }
}

/* --- CARD 1: Bloqueio de apps (qualquer toggle) --- */
document.querySelectorAll('input[data-card="bloqueio"]').forEach((input) => {
  input.addEventListener("change", function () {
    const ativos = document.querySelectorAll(
      'input[data-card="bloqueio"]:checked',
    ).length;
    if (ativos > 0) marcarConfigurado("bloqueio", ativos + " APP");
  });
});

/* --- CARD 2: Tempo de tela (qualquer slider movido) --- */
document.querySelectorAll('.slider[data-card="tempo"]').forEach((slider) => {
  let jaMoveu = false;
  slider.addEventListener("input", function () {
    const label = this.dataset.label;
    document.getElementById("val-" + label).textContent = this.value + " min";
    if (!jaMoveu) {
      jaMoveu = true;
      marcarConfigurado("tempo", "SET");
    }
  });
});

/* --- CARD 3: Relatório (radio selecionado = já tem default, marca ao mudar) --- */
document
  .querySelectorAll('input[name="relatorio"], input[name="formato"]')
  .forEach((radio) => {
    radio.addEventListener("change", function () {
      const freq = document.querySelector('input[name="relatorio"]:checked');
      const formato = document.querySelector('input[name="formato"]:checked');
      if (freq && formato) {
        marcarConfigurado("relatorio", freq.value.slice(0, 3).toUpperCase());
      }
    });
  });

/* --- CARD 4: Alertas (qualquer toggle) --- */
document.querySelectorAll('input[data-card="alertas"]').forEach((input) => {
  input.addEventListener("change", function () {
    marcarConfigurado("alertas", "SET");
  });
});

/* --- CARD 5: Controle remoto (radio selecionado = já tem default, marca ao mudar) --- */
document.querySelectorAll('input[name="controle"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    marcarConfigurado("controle", this.value.slice(0, 3).toUpperCase());
  });
});

/* =========================
   BOTÃO CONCLUÍDO
========================= */

const btnConcluido = document.getElementById("btnConcluido");
const somClique = document.getElementById("somClique");
const musicaFundo = document.getElementById("musicaFundo");

btnConcluido.addEventListener("click", () => {
  // Evita múltiplos cliques
  btnConcluido.disabled = true;

  // Guarda o volume atual
  const volumeOriginal = musicaFundo.volume;

  // Abaixa a música de fundo
  musicaFundo.volume = 0.1;

  // Toca o efeito
  somClique.currentTime = 0;
  somClique.play();

  // Após 1 segundo
  setTimeout(() => {
    // Para o efeito
    somClique.pause();
    somClique.currentTime = 0;

    // Animação de scan antes de navegar
    const scan = document.createElement("div");
    scan.classList.add("scan-overlay");
    document.body.appendChild(scan);
    requestAnimationFrame(() => scan.classList.add("ativo"));

    // Vai para a próxima página
    setTimeout(() => {
      window.location.href = "pagina5.html";
    }, 1000);
  }, 4000);
});
