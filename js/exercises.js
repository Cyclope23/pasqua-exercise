/**
 * Loads exercises from JSON, renders eggs in pseudo-random positions,
 * handles crack animation and exercise card display.
 */

const EGG_COLORS = [
  { bg: 'linear-gradient(135deg, #e94560, #ff6b8a)', color: '#e94560', glow: 'rgba(233,69,96,0.5)', glowSoft: 'rgba(233,69,96,0.2)' },
  { bg: 'linear-gradient(135deg, #ffc800, #ffe066)', color: '#ffc800', glow: 'rgba(255,200,0,0.5)', glowSoft: 'rgba(255,200,0,0.2)' },
  { bg: 'linear-gradient(135deg, #00d2ff, #66e0ff)', color: '#00d2ff', glow: 'rgba(0,210,255,0.5)', glowSoft: 'rgba(0,210,255,0.2)' },
  { bg: 'linear-gradient(135deg, #7b2ff7, #a855f7)', color: '#7b2ff7', glow: 'rgba(123,47,247,0.5)', glowSoft: 'rgba(123,47,247,0.2)' },
  { bg: 'linear-gradient(135deg, #ff6b9d, #ffa3c4)', color: '#ff6b9d', glow: 'rgba(255,107,157,0.5)', glowSoft: 'rgba(255,107,157,0.2)' },
];

const EGG_POSITIONS = [
  { top: '8%', left: '12%' },
  { top: '15%', left: '65%' },
  { top: '45%', left: '35%' },
  { top: '30%', left: '80%' },
  { top: '60%', left: '15%' },
];

const BUNNY_POSITIONS = [
  { top: '75%', left: '85%', size: '2.5rem', delay: '0s' },
  { top: '5%', left: '45%', size: '2rem', delay: '0.7s' },
  { top: '70%', left: '50%', size: '1.8rem', delay: '1.3s' },
];

let currentOpenCard = null;

function getClasseFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('classe');
}

function getClassConfig(classe) {
  const configs = {
    terza: { label: 'TERZA', color: '#e94560' },
    quarta: { label: 'QUARTA', color: '#ffc800' },
    quinta: { label: 'QUINTA', color: '#00d2ff' },
  };
  return configs[classe] || configs.terza;
}

function createSparkles(x, y, color) {
  const count = 12;
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    const angle = (Math.PI * 2 * i) / count;
    const distance = 30 + Math.random() * 40;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    sparkle.style.cssText = `
      left: ${x}px; top: ${y}px;
      background: ${color};
      box-shadow: 0 0 6px ${color};
      --dx: ${dx}px;
      --dy: ${dy}px;
    `;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  }
}

function closeCurrentCard() {
  if (!currentOpenCard) return;
  const { card, overlay, eggContainer } = currentOpenCard;
  card.classList.remove('visible');
  overlay.classList.remove('visible');
  eggContainer.classList.remove('cracking');
  currentOpenCard = null;
}

function openExercise(eggContainer, exercise, colorConfig, index) {
  if (currentOpenCard) {
    closeCurrentCard();
    return;
  }

  // Sparkle effect
  const rect = eggContainer.getBoundingClientRect();
  createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, colorConfig.color);

  // Play crack sound
  if (typeof playCrackSound === 'function') {
    playCrackSound();
  }

  // Add cracking class for animation
  eggContainer.classList.add('cracking');

  // Show exercise card after crack animation
  setTimeout(() => {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('visible');

    const card = document.getElementById('exercise-card');
    card.style.setProperty('--egg-color', colorConfig.color);
    card.style.setProperty('--egg-glow', colorConfig.glow);

    card.querySelector('.card-egg-icon').style.background = colorConfig.bg;
    card.querySelector('.card-egg-icon').textContent = index + 1;
    card.querySelector('.card-title').textContent = exercise.titolo;
    card.querySelector('.card-title').style.color = colorConfig.color;
    card.querySelector('.card-traccia').innerHTML = exercise.traccia;
    card.querySelector('.card-output-content').innerHTML = exercise.outputAtteso;

    card.classList.add('visible');
    currentOpenCard = { card, overlay, eggContainer };
  }, 500);
}

function renderDecorations(area, classColor) {
  BUNNY_POSITIONS.forEach((pos) => {
    const bunny = document.createElement('div');
    bunny.className = 'bunny-decoration';
    bunny.textContent = '🐰';
    bunny.style.cssText = `
      top: ${pos.top}; left: ${pos.left};
      font-size: ${pos.size};
      animation-delay: ${pos.delay};
      --class-color: ${classColor};
    `;
    area.appendChild(bunny);
  });

  const grass = document.createElement('div');
  grass.className = 'grass-decoration';
  area.appendChild(grass);
}

async function initExercisePage() {
  const classe = getClasseFromURL();
  if (!classe) {
    window.location.href = 'index.html';
    return;
  }

  const config = getClassConfig(classe);
  document.documentElement.style.setProperty('--class-color', config.color);
  document.getElementById('class-title').textContent = `Classe ${config.label}`;
  document.getElementById('class-title').style.color = config.color;
  document.getElementById('class-subtitle').textContent = 'Clicca sulle uova per scoprire gli esercizi!';

  try {
    const res = await fetch('data/exercises.json');
    const data = await res.json();
    const exercises = data[classe] || [];

    const area = document.getElementById('egg-hunt-area');
    renderDecorations(area, config.color);

    exercises.forEach((exercise, i) => {
      const colorConfig = EGG_COLORS[i % EGG_COLORS.length];
      const pos = EGG_POSITIONS[i % EGG_POSITIONS.length];

      const container = document.createElement('div');
      container.className = 'egg-container';
      container.style.top = pos.top;
      container.style.left = pos.left;
      container.style.setProperty('--egg-color', colorConfig.color);
      container.style.setProperty('--egg-glow', colorConfig.glow);
      container.style.setProperty('--egg-glow-soft', colorConfig.glowSoft);
      container.style.animationDelay = `${i * 0.3}s`;

      container.innerHTML = `
        <div class="egg" style="background: ${colorConfig.bg}; --egg-glow: ${colorConfig.glow}; --egg-glow-soft: ${colorConfig.glowSoft};">
          <div class="egg-pattern"></div>
          <div class="crack-line crack-line-1"></div>
          <div class="crack-line crack-line-2"></div>
          <span class="egg-number">${i + 1}</span>
        </div>
        <div class="egg-title">${exercise.titolo}</div>
      `;

      container.addEventListener('click', () => openExercise(container, exercise, colorConfig, i));
      area.appendChild(container);
    });

    document.getElementById('overlay').addEventListener('click', closeCurrentCard);
    document.querySelector('.card-close').addEventListener('click', (e) => {
      e.stopPropagation();
      closeCurrentCard();
    });
  } catch (err) {
    console.error('Errore caricamento esercizi:', err);
  }
}

document.addEventListener('DOMContentLoaded', initExercisePage);
