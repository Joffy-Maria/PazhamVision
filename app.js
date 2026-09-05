/**
 * PazhamVision — ambient audio and landing-page interactions.
 */

function initAudio() {
  const audio = document.getElementById('bg-audio');
  if (!audio) return;

  audio.volume = 0.85;
  const playAudio = () => audio.play().catch(() => {});

  // Browsers may allow this in a few contexts. If they do not, the first
  // click/tap starts the exact same HTML audio source—no duplicate playback.
  playAudio();
  document.addEventListener('pointerdown', playAudio, { once: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initHonkTitle();
  initSparkleCanvas();
  initExperienceFlow();
});

/* ==========================================================================
   1. SCREEN FLOW & CALCULATOR
   ========================================================================== */
function initExperienceFlow() {
  const landingView = document.getElementById('landing-view');
  const calculatorView = document.getElementById('calculator-view');
  const gamesView = document.getElementById('games-view');
  const display = document.getElementById('calc-display');
  const history = document.getElementById('calc-history');
  const savedCalculation = document.getElementById('saved-calculation');
  let expression = '';

  const showView = (view) => {
    [landingView, calculatorView, gamesView].forEach((item) => item.classList.toggle('active', item === view));
  };

  landingView.addEventListener('click', () => showView(calculatorView));

  document.querySelectorAll('.calc-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const { action, val } = button.dataset;

      if (action === 'clear') expression = '';
      else if (action === 'delete') expression = expression.slice(0, -1);
      else if (action === 'banana') {
        const rect = button.getBoundingClientRect();
        window.spawnBurst?.(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
      }
      else if (action === 'operator') {
        if (expression && !/[+\-×÷%]$/.test(expression)) expression += val;
      } else if (action === 'calculate') {
        if (!expression || /[+\-×÷%]$/.test(expression)) return;
        savedCalculation.textContent = 'Your calculation is locked. Complete both quests to reveal the result.';
        window.setTimeout(() => showView(gamesView), 350);
        return;
      } else if (val) expression += val;

      display.textContent = expression || '0';
      history.innerHTML = '&nbsp;';
    });
  });

  document.getElementById('back-home-btn').addEventListener('click', () => showView(landingView));
  document.getElementById('games-back-btn').addEventListener('click', () => {
    expression = '';
    display.textContent = '0';
    history.innerHTML = '&nbsp;';
    showView(calculatorView);
  });
}

/* ==========================================================================
   1. HONK 3D LETTER SPLITTER & KINETIC BOUNCE
   ========================================================================= */
function initHonkTitle() {
  const words = document.querySelectorAll('.honk-title .word');
  let charIdx = 0;

  words.forEach(word => {
    const text = word.textContent.trim();
    word.innerHTML = '';

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.className = 'honk-char';
      span.textContent = text[i];
      span.style.animationDelay = `${charIdx * 0.08}s`;

      span.addEventListener('mouseenter', () => {
        const randomTilt = (Math.random() - 0.5) * 20;
        span.style.transform = `translateY(-35px) scale(1.4) rotate(${randomTilt}deg)`;
        
        const rect = span.getBoundingClientRect();
        if (window.spawnBurst) {
          window.spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
        }
      });

      span.addEventListener('mouseleave', () => {
        setTimeout(() => {
          span.style.transform = '';
        }, 250);
      });

      word.appendChild(span);
      charIdx++;
    }
  });
}

/* ==========================================================================
   2. AMBIENT FLOATING & BURSTING PIXEL STARS CANVAS
   ========================================================================== */
function initSparkleCanvas() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const palette = ['#FFE600', '#FFFF00', '#FFC000', '#FFFFFF'];

  class StarParticle {
    constructor(x, y, isBurst = false) {
      this.isBurst = isBurst;
      this.reset(x, y);
    }

    reset(x, y) {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : Math.random() * height;
      this.size = this.isBurst ? (Math.random() * 5 + 3) : (Math.random() * 3 + 1.5);
      this.color = palette[Math.floor(Math.random() * palette.length)];

      if (this.isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.04 + 0.02;
      } else {
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = -Math.random() * 0.8 - 0.3;
        this.alpha = Math.random() * 0.7 + 0.3;
        this.alphaSpeed = (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1);
      }
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.isBurst) {
        this.alpha -= this.decay;
        this.size *= 0.96;
        return this.alpha > 0;
      } else {
        this.alpha += this.alphaSpeed;
        if (this.alpha > 0.95 || this.alpha < 0.2) {
          this.alphaSpeed = -this.alphaSpeed;
        }
        if (this.y < -15 || this.x < -15 || this.x > width + 15) {
          this.reset(Math.random() * width, height + 15);
        }
        return true;
      }
    }

    draw() {
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 4;

      ctx.beginPath();
      ctx.moveTo(this.x, this.y - this.size);
      ctx.lineTo(this.x + this.size, this.y);
      ctx.lineTo(this.x, this.y + this.size);
      ctx.lineTo(this.x - this.size, this.y);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < 35; i++) {
    particles.push(new StarParticle());
  }

  window.spawnBurst = (x, y, count = 10) => {
    for (let i = 0; i < count; i++) {
      particles.push(new StarParticle(x, y, true));
    }
  };

  window.addEventListener('pointerdown', (e) => {
    window.spawnBurst(e.clientX, e.clientY, 15);
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (p.update()) {
        p.draw();
      } else {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}
