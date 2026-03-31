/**
 * Canvas-based particle system — glowing dots floating on all pages.
 */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const PARTICLE_COUNT = 60;
  const COLORS = [
    'rgba(233, 69, 96, 0.6)',
    'rgba(255, 200, 0, 0.6)',
    'rgba(0, 210, 255, 0.6)',
    'rgba(123, 47, 247, 0.6)',
    'rgba(255, 255, 255, 0.3)',
  ];

  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.3 - 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.5 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.pulse += p.pulseSpeed;
      const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.2;
      const currentSize = p.size + Math.sin(p.pulse) * 0.5;

      ctx.beginPath();
      ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace(/[\d.]+\)$/, currentOpacity.toFixed(2) + ')');
      ctx.fill();

      // Glow effect
      ctx.beginPath();
      ctx.arc(p.x, p.y, currentSize * 3, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 3);
      gradient.addColorStop(0, p.color.replace(/[\d.]+\)$/, (currentOpacity * 0.3).toFixed(2) + ')'));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;
    }

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
}

document.addEventListener('DOMContentLoaded', initParticles);
