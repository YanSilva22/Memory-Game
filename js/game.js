// nome do player
const playerName = localStorage.getItem('username');
document.getElementById('player-name').textContent = playerName;

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
]

// Duplicando as imagens
const cards = [...img, ...img];

// Embaralhando as imagens
cards.sort(() => Math.random() - 0.5);

// Pegando no html a referencia onde as cartas serão inseridas
const gameBoard = document.querySelector('.game-board');

// controle do jogo
let primeiraCarta = null; //primeia carta virada
let segundaCarta = null; //segunda carta virada
let pararjogada = false; //impede o clique quando ja ha duas cartas viradas

// Criando cartas no tabuleiro (gameBoard)
cards.forEach(src => {
    // cria div onde ira ficar as cartas class = card
    const card = document.createElement('div');
    card.classList.add('card');

    // adicionando a carta
    card.innerHTML = `
    <div class="card-inner">
        <div class="card-front"><img src="${src}" /></div>
        <div class="card-back"></div> 
    </div>
    `;

    //adicionando a carta criada dentro do html
    gameBoard.appendChild(card);
    
    // adicionando evento de clique na carta
    card.addEventListener('click', () => {
        // se ja tiver duas cartas viradas, nao faz nada
        if (pararjogada) return;

        // se a carta ja estiver virada, nao faz nada
        if (card.classList.contains('flipped')) return;

        // vira a carta
        card.classList.add('flipped');

        // verifica se eh a primeira ou segunda carta virada
        if (!primeiraCarta) {
            primeiraCarta = card;
        } else {
            segundaCarta = card;
            pararjogada = true; // impede novas jogadas

            const img1 = primeiraCarta.querySelector('img').src;
            const img2 = segundaCarta.querySelector('img').src;
            // verifica se as cartas sao iguais
            if (img1 === img2) {
                primeiraCarta = null;
                segundaCarta = null;
                pararjogada = false; // permite novas jogadas
            } else {
                setTimeout(() => {
                    primeiraCarta.classList.remove('flipped');
                    segundaCarta.classList.remove('flipped');
                    primeiraCarta = null;
                    segundaCarta = null;
                    pararjogada = false; // permite novas jogadas
                }, 1000);
            }
        }
    });
})