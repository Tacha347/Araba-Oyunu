// Oyun değişkenleri
let score = 0;
let gameRunning = false;
const playerCar = document.getElementById('player-car');
const enemyCar = document.getElementById('enemy-car');
const scoreDisplay = document.getElementById('score');

// Kontroller
document.addEventListener('keydown', (e) => {
  if (!gameRunning) return;
  
  const playerLeft = parseInt(window.getComputedStyle(playerCar).getPropertyValue('left'));
  
  if (e.key === 'ArrowLeft' && playerLeft > 100) {
    playerCar.style.left = (playerLeft - 20) + 'px';
  }
  
  if (e.key === 'ArrowRight' && playerLeft < 400) {
    playerCar.style.left = (playerLeft + 20) + 'px';
  }
});

// Düşman araba hareketi
function moveEnemy() {
  if (!gameRunning) return;
  
  const enemyTop = parseInt(window.getComputedStyle(enemyCar).getPropertyValue('top'));
  const playerLeft = parseInt(window.getComputedStyle(playerCar).getPropertyValue('left'));
  const enemyLeft = parseInt(window.getComputedStyle(enemyCar).getPropertyValue('left'));
  
  // Çarpışma kontrolü
  if (enemyTop > 500 && enemyTop < 650 && enemyLeft === playerLeft) {
    alert('ÇARPIŞMA! Skor: ' + score);
    resetGame();
    return;
  }
  
  if (enemyTop >= 700) {
    score++;
    scoreDisplay.textContent = 'SKOR: ' + score;
    enemyCar.style.top = '-100px';
    enemyCar.style.left = (Math.random() * 300 + 100) + 'px';
  } else {
    enemyCar.style.top = (enemyTop + 5) + 'px';
  }
  
  requestAnimationFrame(moveEnemy);
}

// Oyunu başlat
document.getElementById('start-btn').addEventListener('click', () => {
  gameRunning = true;
  score = 0;
  scoreDisplay.textContent = 'SKOR: 0';
  enemyCar.style.top = '-100px';
  moveEnemy();
});

function resetGame() {
  gameRunning = false;
  enemyCar.style.top = '-100px';
}
