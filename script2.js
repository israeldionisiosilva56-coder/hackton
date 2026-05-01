// Variável global que armazena o nível de risco do usuário
let risco = 0;
let totalPerguntas = 7; // Atualize conforme número total
let perguntasRespondidas = 0;

/*
Função chamada quando o usuário responde uma pergunta.
Recebe:
- botao → o botão clicado
- valor → o valor de risco associado à resposta
*/
function responder(botao, valor) {

    // Seleciona o container da pergunta atual
    const perguntaDiv = botao.parentElement;

    // Seleciona todos os botões dentro daquela pergunta
    const botoes = perguntaDiv.querySelectorAll("button");

    // Desabilita todos os botões da pergunta após resposta
    botoes.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove("selecionado");
    });

    // Aplica estilo visual ao botão escolhido
    botao.classList.add("selecionado");

    // Soma o valor ao risco total
    risco += valor;
    perguntasRespondidas++;

    // Limita o risco máximo em 100%
    if (risco > 100) {
        risco = 100;
    }

    // Atualiza o painel visual
    atualizarPainel();
}

/*
Função responsável por atualizar:
- Barra de progresso
- Texto do nível de risco
- Cor da barra
- Recomendações personalizadas
*/
function atualizarPainel() {

    const barra = document.getElementById("nivelRisco");
    const texto = document.getElementById("textoRisco");

    // Atualiza largura da barra
    barra.style.width = risco + "%";

    // Atualiza texto principal
    texto.innerText = "Risco Atual: " + risco + "%";

    // Define cor e classificação do risco
    if (risco < 30) {
        barra.style.background = "#00ff88";
        texto.innerText += " (Baixo)";
    }
    else if (risco < 70) {
        barra.style.background = "#ffaa00";
        texto.innerText += " (Médio)";
    }
    else {
        barra.style.background = "#ff3b3b";
        texto.innerText += " (Alto)";
    }

    // Atualiza recomendações baseadas no risco
    atualizarRecomendacoes();
}

/*
Função que gera recomendações personalizadas
com base no nível de risco calculado.
*/
function atualizarRecomendacoes() {

    const div = document.getElementById("recomendacoes");

    if (risco < 30) {
        div.innerHTML = `
        <p>✅ Excelente! Seu comportamento digital demonstra boas práticas.</p>
        <p>🔐 Continue utilizando senhas fortes e verificando sites seguros.</p>
        `;
    }

    else if (risco < 70) {
        div.innerHTML = `
        <p>⚠ Atenção! Você pode melhorar sua segurança digital.</p>
        <p>🔑 Evite reutilizar senhas.</p>
        <p>🌐 Sempre verifique se o site possui HTTPS.</p>
        `;
    }

    else {
        div.innerHTML = `
        <p style="color:#ff4d4d;">🚨 Alto risco detectado!</p>
        <p>🔒 Troque suas senhas imediatamente.</p>
        <p>📧 Ative autenticação em dois fatores.</p>
        <p>🛑 Evite clicar em links desconhecidos.</p>
        `;
    }
}