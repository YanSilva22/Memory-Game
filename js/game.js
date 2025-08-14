// nome do player
const playerName = localStorage.getItem('username');
document.getElementById('player-name').textContent = playerName;

// --- VARIÁVEIS DO CRONÔMETRO ---
let timerInterval;
let segundosTotais = 0;

// função para formatar em mm:ss
function formatarTempo(segundos) {
    const min = String(Math.floor(segundos / 60)).padStart(2, '0');
    const seg = String(segundos % 60).padStart(2, '0');
    return `${min}:${seg}`;
}

// iniciar cronômetro
function iniciarTimer() {
    timerInterval = setInterval(() => {
        segundosTotais++;
        document.getElementById('timer').textContent = formatarTempo(segundosTotais);
    }, 1000);
}

// parar cronômetro
function pararTimer() {
    clearInterval(timerInterval);
}

// inicia o timer quando carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio-jogo');
    const somAtivado = localStorage.getItem('somAtivado');

    iniciarTimer(); // <-- inicia cronômetro

    if (somAtivado === 'true') {
        audio.volume = 1;
        audio.currentTime = 0;
        audio.play().catch(err => {
            console.log("Erro ao tentar tocar o som:", err);
        });
    }
});

// Lista com todas as imagens personagens
const img = [
    "../imagens/Bills.png",
    "../imagens/Frieza.png",
    "../imagens/Gohan.png",
    "../imagens/Goku.png",
    "../imagens/Jiren.png",
    "../imagens/Krillin.png",
    "../imagens/Majin Buu.png",
    "../imagens/Piccolo.png",
    "../imagens/Vegeta.png",
    "../imagens/Whis.png",
];

// Duplicando as imagens
const cards = [...img, ...img];

// Embaralhando as imagens
cards.sort(() => Math.random() - 0.5);

// Pegando no html a referencia onde as cartas serão inseridas
const gameBoard = document.querySelector('.game-board');

// controle do jogo
let primeiraCarta = null;
let segundaCarta = null;
let pararjogada = false;
let paresEncontrados = 0; // contar pares corretos
const totalPares = img.length; // total de pares do jogo

// Criando cartas no tabuleiro
cards.forEach(src => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
    <div class="card-inner">
        <div class="card-front"><img src="${src}" /></div>
        <div class="card-back"></div> 
    </div>
    `;

    gameBoard.appendChild(card);
    
    card.addEventListener('click', () => {
        if (pararjogada) return;
        if (card.classList.contains('flipped')) return;

        card.classList.add('flipped');

        if (!primeiraCarta) {
            primeiraCarta = card;
        } else {
            segundaCarta = card;
            pararjogada = true;

            const img1 = primeiraCarta.querySelector('img').src;
            const img2 = segundaCarta.querySelector('img').src;

            if (img1 === img2) {
                paresEncontrados++;

                primeiraCarta = null;
                segundaCarta = null;
                pararjogada = false;

                // Verifica se ganhou
                if (paresEncontrados === totalPares) {
                    pararTimer();
                    tocarMusicaVitoria();
                    mostrarPopupVitoria();
                }

            } else {
                setTimeout(() => {
                    primeiraCarta.classList.remove('flipped');
                    segundaCarta.classList.remove('flipped');
                    primeiraCarta = null;
                    segundaCarta = null;
                    pararjogada = false;
                }, 1000);
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio-jogo');
  const somAtivado = localStorage.getItem('somAtivado');

  if (somAtivado === 'true') {
    audio.volume = 1;
    audio.currentTime = 0;
    audio.play().catch(err => {
      console.log("Erro ao tentar tocar o som:", err);
    });
  }
});

function tocarMusicaVitoria() {
    // para o som do jogo
    const audioFundo = document.getElementById('audio-jogo');
    audioFundo.pause();

    // cria novo áudio para vitória
    const audioVitoria = new Audio("../songs/song completo.mp3");

    // trecho específico
    const inicio = (1 * 60) + 24; // 1:24
    const fim = (1 * 60) + 32;    // 1:32

    audioVitoria.currentTime = inicio;
    audioVitoria.play();

    // corta quando chegar no fim
    const intervalo = setInterval(() => {
        if (audioVitoria.currentTime >= fim) {
            audioVitoria.pause();
            clearInterval(intervalo);
        }
    }, 100);
}
function mostrarPopupVitoria() {
    const popup = document.getElementById('popup-vitoria');
    const player = localStorage.getItem('username') || 'Player';

    document.getElementById('popup-player').textContent = player;
    document.getElementById('popup-timer').textContent = formatarTempo(segundosTotais);

    popup.style.display = 'flex';

    const btnReiniciar = document.getElementById('btn-reiniciar');
    const btnSair = document.getElementById('btn-sair');

    // Bloqueia os botões
    btnReiniciar.disabled = true;
    btnSair.disabled = true;
    btnReiniciar.style.opacity = 0.5;
    btnSair.style.opacity = 0.5;

    // Função que libera os botões quando a música termina
    const audioVitoria = new Audio("../songs/song completo.mp3");
    const inicio = (1 * 60) + 24; // 1:24
    const fim = (1 * 60) + 32;    // 1:32
    audioVitoria.currentTime = inicio;
    audioVitoria.play();

    const intervalo = setInterval(() => {
        if (audioVitoria.currentTime >= fim) {
            audioVitoria.pause();
            clearInterval(intervalo);

            // Libera os botões
            btnReiniciar.disabled = false;
            btnSair.disabled = false;
            btnReiniciar.style.opacity = 1;
            btnSair.style.opacity = 1;
        }
    }, 100);

    // Adiciona eventos apenas após a música terminar
    btnReiniciar.onclick = () => {
        if (!btnReiniciar.disabled) window.location.reload();
    };
    btnSair.onclick = () => {
        if (!btnSair.disabled) window.location.href = '../index.html';
    };
}