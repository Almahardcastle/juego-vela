document.addEventListener('DOMContentLoaded', () => {
  const screenStart = document.getElementById('screen-start');
  const screenGame = document.getElementById('screen-game');
  const screenWin = document.getElementById('screen-win');

  const btnStart = document.getElementById('btn-start');
  const btnRestart = document.getElementById('btn-restart');
  const flameWrapper = document.getElementById('flame-wrapper');

  let scale = 2.2;         // Tamaño inicial (MUY grande)
  const minScale = 0.05;   // Escala donde se apaga (pierde)
  const targetScale = 1.0; // Escala meta para ganar
  const shrinkRate = 0.004; // Velocidad con la que se desinfla
  const inflateAmount = 0.12; // Cuánto aumenta por cada click
  let gameInterval = null;

  function updateFlame() {
    flameWrapper.style.transform = `translateX(-50%) scale(${scale})`;
  }

  function startGame() {
    scale = 2.2;
    updateFlame();

    screenStart.classList.remove('active');
    screenWin.classList.remove('active');
    screenGame.classList.add('active');

    if (gameInterval) clearInterval(gameInterval);

    gameInterval = setInterval(() => {
      scale -= shrinkRate;

      // Si la escala llega cerca del tamaño normal (meta sostenida)
      if (scale <= targetScale && scale > minScale) {
        clearInterval(gameInterval);
        scale = targetScale;
        updateFlame();
        setTimeout(winGame, 300);
        return;
      }

      // Si la llama se apaga del todo, reinicia la dinámica en la misma pantalla
      if (scale <= minScale) {
        scale = 2.2;
      }

      updateFlame();
    }, 30);
  }

  function inflate() {
    if (screenGame.classList.contains('active')) {
      scale += inflateAmount;
      if (scale > 2.5) scale = 2.5; // Límite máximo para no romper layout
      updateFlame();
    }
  }

  function winGame() {
    screenGame.classList.remove('active');
    screenWin.classList.add('active');
  }

  btnStart.addEventListener('click', startGame);
  btnRestart.addEventListener('click', startGame);

  // Soporte para touch y click en la llama
  flameWrapper.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    inflate();
  });
});