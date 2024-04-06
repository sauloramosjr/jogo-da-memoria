// configuração de quais figuras serão utilizadas: (obs: não pode repetir)
const figuras = ['❤️', '😘', '😁', '😊', '👌', '🙌', '😎', '💩'];

//pega o elemento no DOM que tenha o elemento com id="Grid-Jogo" e salva na variavel GridJogo
const GridJogo = document.getElementById('Grid-Jogo');

//pega o elemento no DOM que tenha o elemento com id="Score" e salva na variavel Score
const Score = document.getElementById('Score');

//pega o elemento no DOM que tenha o elemento com id="Score e salva na variavel Tentativas
const Tentativas = document.getElementById('Tentativas');

// tentativasCount variavel iniciada em 0 que será atualizada conforme o decorrer do jogo, guarando o número de tentativas
let tentativasCount = 0;
// flippedCards variavel iniciada com array vazio, ele será alterado no decorrer do jogo, nele será colocado os pares clicados para conferir se acertou ou não
let flippedCards = [];

// Função para criar o tabuleiro do jogo
function criarTabuleiro(figuras) {
  // duplica as figuras para criar pares
  const tabuleiro = figuras.concat(figuras);

  // embaralhar
  for (let i = tabuleiro.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = tabuleiro[i];
    tabuleiro[i] = tabuleiro[randomIndex];
    tabuleiro[randomIndex] = temp;
  }

  // adiciona ao Grid-Jogo elementos que possuem como valor o icone de carta virada 🎴, e o que está escondido em baixo da carta está no seu data-value
  tabuleiro.forEach((figura, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.value = figura;

    // Define o texto da carta como a figura (inicialmente visível)
    card.textContent = figura;

    // Adiciona a classe 'flipped' para mostrar a carta inicialmente
    card.classList.add('flipped');
    card.classList.add('inicial');

    // Após meio segundo, remove a classe 'flipped' e esconde a figura
    setTimeout(() => {
      card.classList.remove('inicial');
      card.classList.remove('flipped');
      card.textContent = '🎴';
    }, 500);

    // Adiciona a carta ao tabuleiro
    GridJogo.appendChild(card);
  });
}

// Função para atualizar o placar do jogo
function atualizarPlacar() {
  //busca todos os elementos do dom que contenham a classe "matched" - matched é adicionado apenas a elementos que já formaram par
  const matchedCards = document.querySelectorAll('.matched');

  // Verifica se os elementos de Score e Tentativas existem no DOM
  if (Score && Tentativas) {
    // Calcula a pontuação e as tentativas e atualiza os elementos correspondentes no DOM
    Score.textContent = matchedCards.length / 2;
    Tentativas.textContent = tentativasCount;
  }
}

// Adiciona um evento de clique para virar as cartas
GridJogo.addEventListener('click', function (event) {
  // pega o elemento que foi clicado
  const clickedCard = event.target;

  // Verifica se o elemento clicado é uma carta e se pode ser virada
  if (
    clickedCard.className === 'card' &&
    !clickedCard.classList.contains('matched') &&
    flippedCards.length < 2
  ) {
    // Vira a carta clicada
    clickedCard.classList.add('flipped');
    setTimeout(() => {
      clickedCard.textContent = clickedCard.dataset.value;
    }, 300);
    flippedCards.push(clickedCard);

    // Verifica se dois cartões estão virados
    if (flippedCards.length === 2) {
      // Incrementa o contador de tentativas
      tentativasCount++;

      // Obtém os dois cartões virados
      const [firstCard, secondCard] = flippedCards;

      // Verifica se os valores dos cartões são iguais
      if (firstCard.dataset.value === secondCard.dataset.value) {
        // Se os valores forem iguais, marca os cartões como combinados
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        flippedCards = [];
      } else {
        // Se os valores forem diferentes, aguarda meio segundo e, em seguida, vira os cartões novamente
        setTimeout(() => {
          firstCard.textContent = '🎴';
          secondCard.textContent = '🎴';
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }

      // Atualiza o placar do jogo
      atualizarPlacar();
    }
  }
});

function reiniciarJogo() {
  // Limpa o tabuleiro do jogo
  GridJogo.innerHTML = '';
  // Reinicia as variáveis ​​e o placar
  tentativasCount = 0;
  flippedCards = [];
  Score.textContent = '0';
  Tentativas.textContent = '0';

  // Cria um novo tabuleiro
  criarTabuleiro(figuras);
}

const btnReiniciar = document.getElementById('btn-reiniciar');

btnReiniciar.addEventListener('click', reiniciarJogo);

// Adiciona um evento de carregamento do DOM para iniciar o jogo
document.addEventListener('DOMContentLoaded', function () {
  criarTabuleiro(figuras);
});
