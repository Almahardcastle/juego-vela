document.addEventListener('DOMContentLoaded', () => {
  const screenStart = document.getElementById('screen-start');
  const screenGame = document.getElementById('screen-game');
  const screenWin = document.getElementById('screen-win');

  const btnStart = document.getElementById('btn-start');
  const btnRestart = document.getElementById('btn-restart');
  const flameWrapper = document.getElementById('flame-wrapper');

  const maxScale = 1.8;       // Tamaño inicial Y meta para ganar
  const minScale = 0.05;      // Tamaño donde se apaga
  const shrinkRate = 0.003;   // Velocidad a la que se desinfla
  const inflateAmount = 0.08; // Incremento por toque

  let scale = maxScale;
  let gameInterval = null;

  function updateFlame() {
    flameWrapper.style.transform = `translateX(-50%) scale(${scale})`;
  }

  function startGame() {
    scale = maxScale; // Inicia en su tamaño máximo
    updateFlame();

    screenStart.classList.remove('active');
    screenWin.classList.remove('active');
    screenGame.classList.add('active');

    if (gameInterval) clearInterval(gameInterval);

    gameInterval = setInterval(() => {
      scale -= shrinkRate;

      // Si se apaga del todo, vuelve a arrancar desde el tamaño máximo inicial
      if (scale <= minScale) {
        scale = maxScale;
      }

      updateFlame();
    }, 30);
  }

  function inflate() {
    if (!screenGame.classList.contains('active')) return;

    scale += inflateAmount;

    // Si alcanza nuevamente el tamaño máximo inicial, se gana el juego
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

  flameWrapper.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    inflate();
  });
});