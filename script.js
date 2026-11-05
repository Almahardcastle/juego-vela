// Elementos del DOM
const screenStart = document.getElementById('screen-start');
const screenGame = document.getElementById('screen-game');
const screenEnd = document.getElementById('screen-end');

const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');
const flame = document.getElementById('flame');

// Parámetros de la mecánica
let currentScale = 1.3;     // Escala inicial (grande como globo)
const minScale = 0.05;      // Punto en el que se apaga casi por completo
const maxScale = 1.6;       // Tamaño máximo al inflar
const targetWinScale = 1.45; // Escala necesaria para ganar
const shrinkRate = 0.0035;   // Velocidad a la que se encoge (ajustado para dar tiempo de reaccionar)
const inflateAmount = 0.09; // Cuánto crece por cada click

let gameInterval = null;
let isPlaying = false;

// Funciones de navegación
function showScreen(screenToShow) {
  screenStart.classList.remove('active');
  screenGame.classList.remove('active');
  screenEnd.classList.remove('active');
  screenToShow.classList.add('active');
}

function startGame() {
  currentScale = 1.3;
  isPlaying = true;
  updateFlameScale();
  showScreen(screenGame);

  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 16); // ~60fps
}

function gameLoop() {
  if (!isPlaying) return;

  // Se encoge progresivamente
  currentScale -= shrinkRate;

  // Si se achica demasiado, vuelve a subir un mínimo para no perder inmediatamente
  if (currentScale <= minScale) {
    currentScale = minScale;
  }

  updateFlameScale();
}

function updateFlameScale() {
  flame.style.transform = `scale(${currentScale})`;
}

function handleFlameClick(e) {
  e.preventDefault();
  if (!isPlaying) return;

  currentScale += inflateAmount;
  updateFlameScale();

  // Condición de victoria
  if (currentScale >= targetWinScale) {
    isPlaying = false;
    clearInterval(gameInterval);
    setTimeout(() => {
      showScreen(screenEnd);
    }, 300);
  }
}

// Event Listeners
btnStart.addEventListener('click', startGame);
btnRestart.addEventListener('click', startGame);

// Soporte para click y toque táctil rápido
flame.addEventListener('pointerdown', handleFlameClick);