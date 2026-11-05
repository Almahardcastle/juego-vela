document.addEventListener('DOMContentLoaded', () => {
  const screenStart = document.getElementById('screen-start');
  const screenGame = document.getElementById('screen-game');
  const screenWin = document.getElementById('screen-win');

  const btnStart = document.getElementById('btn-start');
  const btnRestart = document.getElementById('btn-restart');
  const flameWrapper = document.getElementById('flame-wrapper');

  const startScale = 1.0;     // Tamaño con el que inicia la llama
  const maxScale = 1.8;       // Meta a la que el usuario debe llegar inflando
  const minScale = 0.05;      // Tamaño mínimo donde se considera apagada
  const shrinkRate = 0.003;   // Velocidad de desinflado progresivo
  const inflateAmount = 0.08; // Incremento por toque

  let scale = startScale;
  let gameInterval = null;

  function updateFlame() {
    flameWrapper.style.transform = `translateX(-50%) scale(${scale})`;
  }

  function startGame() {
    scale = startScale;
    updateFlame();

    screenStart.classList.remove('active');
    screenWin.classList.remove('active');
    screenGame.classList.add('active');

    if (gameInterval) clearInterval(gameInterval);

    gameInterval = setInterval(() => {
      scale -= shrinkRate;

      // Si se apaga por completo, reinicia el nivel
      if (scale <= minScale) {
        scale = startScale;
      }

      updateFlame();
    }, 30);
  }

  function inflate() {
    if (!screenGame.classList.contains('active')) return;

    scale += inflateAmount;

    // Si alcanza o supera el tamaño máximo objetivo, el jugador gana
    if (scale >= maxScale) {
      scale = maxScale;
      updateFlame();
      clearInterval(gameInterval);
      setTimeout(winGame, 200);
      return;
    }

    updateFlame();
  }

  function winGame() {
    screenGame.classList.remove('active');
    screenWin.classList.add('active');
  }

  btnStart.addEventListener('click', startGame);
  btnRestart.addEventListener('click', startGame);

  // Eventos para interactuar con la llama sin generar selecciones visuales
  flameWrapper.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    inflate();
  });
});