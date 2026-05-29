/* =========================
   RELÓGIO — HUD
========================= */

function atualizarHora() {
  const agora = new Date();
  const h = String(agora.getHours()).padStart(2, '0');
  const m = String(agora.getMinutes()).padStart(2, '0');
  document.getElementById('hudHora').textContent = h + ':' + m;
}

atualizarHora();
setInterval(atualizarHora, 1000);

/* =========================
   ID DE SESSÃO — HUD
========================= */

function gerarSessao(len) {
  const chars = 'ABCDEF0123456789';
  return Array.from({ length: len }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

const sid = gerarSessao(8);
const sidFormatado = sid.slice(0, 4) + '-' + sid.slice(4);

document.getElementById('hudSessao').textContent = sidFormatado;
document.getElementById('modalSid').textContent = 'SID :: ' + sidFormatado;

/* =========================
   BOTÃO CONTINUAR — MODAL
========================= */

document.getElementById('btnContinuar').addEventListener('click', function () {

  const overlay = document.getElementById('modalOverlay');
  const central = document.getElementById('centralWrapper');

  // Fade out do modal
  overlay.classList.add('fechando');

  // Libera a central após a transição
  setTimeout(() => {
    overlay.style.display = 'none';
    central.classList.add('liberado');
  }, 600);

});