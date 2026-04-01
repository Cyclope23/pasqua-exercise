function initSnakeGame() {
  const canvas = document.getElementById('snake-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const CELL = 20;
  const COLS = 15;
  const ROWS = 15;
  canvas.width = COLS * CELL;
  canvas.height = ROWS * CELL;

  let snake, dir, food, score, gameOver, interval;

  function reset() {
    snake = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }];
    dir = { x: 1, y: 0 };
    score = 0;
    gameOver = false;
    placeFood();
    updateScore();
    document.getElementById('snake-restart').style.display = 'none';
  }

  function placeFood() {
    do {
      food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snake.some(s => s.x === food.x && s.y === food.y));
  }

  function updateScore() {
    document.getElementById('snake-score').textContent = 'Uova: ' + score;
  }

  function draw() {
    // Background
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    for (let i = 0; i <= COLS; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= ROWS; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELL);
      ctx.lineTo(canvas.width, i * CELL);
      ctx.stroke();
    }

    // Food
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🥚', food.x * CELL + CELL / 2, food.y * CELL + CELL / 2);

    // Snake body
    for (let i = 1; i < snake.length; i++) {
      const s = snake[i];
      ctx.beginPath();
      ctx.arc(s.x * CELL + CELL / 2, s.y * CELL + CELL / 2, CELL / 2 - 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 210, 100, ${0.8 - i * 0.05})`;
      ctx.shadowColor = '#00d264';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Snake head
    ctx.font = '18px serif';
    ctx.fillText('🐰', snake[0].x * CELL + CELL / 2, snake[0].y * CELL + CELL / 2);

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#e94560';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 10);
      ctx.fillStyle = '#ffd700';
      ctx.font = '14px sans-serif';
      ctx.fillText('Punteggio: ' + score, canvas.width / 2, canvas.height / 2 + 15);
    }
  }

  function update() {
    if (gameOver) return;

    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    // Wrap around walls
    if (head.x < 0) head.x = COLS - 1;
    if (head.x >= COLS) head.x = 0;
    if (head.y < 0) head.y = ROWS - 1;
    if (head.y >= ROWS) head.y = 0;

    // Self collision
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      gameOver = true;
      clearInterval(interval);
      document.getElementById('snake-restart').style.display = 'inline-block';
      draw();
      return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      updateScore();
      placeFood();
    } else {
      snake.pop();
    }

    draw();
  }

  function startGame() {
    if (interval) clearInterval(interval);
    reset();
    draw();
    interval = setInterval(update, 150);
  }

  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('snake-modal');
    if (!modal || !modal.classList.contains('visible')) return;

    switch (e.key) {
      case 'ArrowUp': case 'w': case 'W':
        if (dir.y !== 1) dir = { x: 0, y: -1 };
        e.preventDefault();
        break;
      case 'ArrowDown': case 's': case 'S':
        if (dir.y !== -1) dir = { x: 0, y: 1 };
        e.preventDefault();
        break;
      case 'ArrowLeft': case 'a': case 'A':
        if (dir.x !== 1) dir = { x: -1, y: 0 };
        e.preventDefault();
        break;
      case 'ArrowRight': case 'd': case 'D':
        if (dir.x !== -1) dir = { x: 1, y: 0 };
        e.preventDefault();
        break;
    }
  });

  document.getElementById('snake-restart').addEventListener('click', startGame);

  // Start on modal open
  window.startSnakeGame = startGame;
  window.stopSnakeGame = () => { if (interval) clearInterval(interval); };
}

document.addEventListener('DOMContentLoaded', initSnakeGame);
