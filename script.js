const form = document.getElementById('vagaForm');
const modalOverlay = document.getElementById('modalResultado');
const modalBox = modalOverlay.querySelector('.modal-box');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// --- EFEITO DE RASTRO DE BRILHO (PARTÍCULAS) ---
let ultimoTempo = 0;

window.addEventListener('mousemove', function(e) {
    const tempoAtual = Date.now();
    // Controla a frequência de geração para manter a performance fluida
    if (tempoAtual - ultimoTempo > 30) {
        ultimoTempo = tempoAtual;
        
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        
        // Posiciona a partícula exatamente onde o mouse está
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        
        // Define direções aleatórias para a dispersão da fagulha de luz
        const randX = (Math.random() - 0.5) * 50;
        const randY = (Math.random() - 0.5) * 50;
        particle.style.setProperty('--rand-x', `${randX}px`);
        particle.style.setProperty('--rand-y', `${randY}px`);
        
        document.body.appendChild(particle);
        
        // Remove o elemento do DOM após o término da animação para otimizar a memória
        setTimeout(() => {
            particle.remove();
        }, 600);
    }
});

// --- VALIDAÇÃO DO FORMULÁRIO E MODAL ---
form.addEventListener('submit', function(event) {
    // Impede o recarregamento padrão da página
    event.preventDefault();

    // Captura e formata os dados inseridos
    const nome = document.getElementById('nome').value.trim();
    const idade = parseInt(document.getElementById('idade').value, 10);
    const altura = parseFloat(document.getElementById('altura').value);

    // Remove classes anteriores do modal
    modalBox.classList.remove('apto', 'nao-apto');

    // Validação dos critérios: Altura >= 1.70 E Idade >= 18
    if (altura >= 1.70 && idade >= 18) {
        modalBox.classList.add('apto');
        modalTitle.textContent = "Parabéns!";
        modalMessage.textContent = `${nome}, você cumpre todos os requisitos exigidos. Você pode prosseguir no processo para a vaga!`;
    } else {
        modalBox.classList.add('nao-apto');
        modalTitle.textContent = "Não Elegível";
        modalMessage.textContent = `Infelizmente você não é apto à vaga, ${nome}. Os critérios mínimos exigem idade mínima de 18 anos e altura a partir de 1.70m.`;
    }

    // Exibe o popup (modal)
    modalOverlay.classList.remove('hidden');
});

// Função para fechar o popup ao clicar no botão "Ok"
function fecharModal() {
    modalOverlay.classList.add('hidden');
}

modalCloseBtn.addEventListener('click', fecharModal);

// Permite fechar também clicando fora da caixa do modal (no fundo escuro)
modalOverlay.addEventListener('click', function(event) {
    if (event.target === modalOverlay) {
        fecharModal();
    }
});