/**
 * PazhamVision — ambient audio and landing-page interactions.
 */

function initAudio() {
  const audio = document.getElementById('bg-audio');
  if (!audio) return;

  audio.volume = 0.85;
  const playAudio = () => {
    if (audio.dataset.gameComplete === 'true') return;
    audio.play().catch(() => {});
  };

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
  initPazhamNinja();
});

/* ==========================================================================
   1. SCREEN FLOW & CALCULATOR
   ========================================================================== */
function initExperienceFlow() {
  const landingView = document.getElementById('landing-view');
  const calculatorView = document.getElementById('calculator-view');
  const gamesView = document.getElementById('games-view');
  const nextGameView = document.getElementById('next-game-view');
  const display = document.getElementById('calc-display');
  const history = document.getElementById('calc-history');
  let expression = '';

  const showView = (view) => {
    [landingView, calculatorView, gamesView, nextGameView].forEach((item) => item.classList.toggle('active', item === view));
    if (view !== gamesView) window.stopPazhamNinja?.();
  };
  window.advancePazhamGame = () => showView(nextGameView);

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
        window.resetPazhamNinja?.();
        window.setTimeout(() => showView(gamesView), 350);
        return;
      } else if (val) expression += val;

      display.textContent = expression || '0';
      history.innerHTML = '&nbsp;';
    });
  });

  document.getElementById('back-home-btn').addEventListener('click', () => showView(landingView));
  document.getElementById('next-game-back-btn').addEventListener('click', () => {
    expression = '';
    display.textContent = '0';
    history.innerHTML = '&nbsp;';
    showView(calculatorView);
  });
}

/* ==========================================================================
   2. PAZHAM NINJA
   ========================================================================== */
function initPazhamNinja() {
  const canvas = document.getElementById('ninja-canvas');
  const scoreElement = document.getElementById('ninja-score');
  const heartsElement = document.getElementById('ninja-hearts');
  const overlay = document.getElementById('ninja-overlay');
  const overlayTitle = document.getElementById('ninja-overlay-title');
  const overlayCopy = document.getElementById('ninja-overlay-copy');
  const startButton = document.getElementById('ninja-start-btn');
  const status = document.getElementById('ninja-status');
  const ctx = canvas.getContext('2d');
  const spriteSheet = new Image();
  spriteSheet.src = 'banana-ninja-sprites-transparent.png';
  const ninjaBackground = new Image();
  ninjaBackground.src = 'pazham-ninja-background.png';
  const frames = {
    idle: [28, 64, 92, 145], run: [466, 62, 102, 145], jump: [928, 54, 91, 159],
    attack: [27, 280, 110, 140], hurt: [1366, 65, 105, 145], dash: [1070, 290, 120, 115],
    banana: [27, 688, 88, 96], golden: [390, 680, 98, 105], enemy: [605, 660, 125, 130]
  };
  const player = { x: 105, y: 0, vx: 0, vy: 0, width: 58, height: 82, state: 'idle', attack: 0, dash: 0, hurt: 0, invincible: 0, grounded: true };
  let items = [];
  let enemies = [];
  let hazards = [];
  let particles = [];
  let score = 0;
  let health = 3;
  let running = false;
  let completed = false;
  let lastFrame = 0;
  let spawnTimer = 0;
  let animationFrame;
  let trail = [];
  let keys = {};
  let lastAttack = 0;
  let scroll = 0;

  function sizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.imageSmoothingEnabled = false;
  }

  function addItem() {
    const width = canvas.clientWidth;
    const golden = Math.random() < .16;
    items.push({ x: width + 50, y: 120 + Math.random() * 105, type: golden ? 'golden' : 'banana', points: golden ? 3 : 1, bob: Math.random() * 6 });
  }

  function addEnemy() {
    enemies.push({ x: canvas.clientWidth + 80, y: 0, width: 64, height: 72, speed: 55 + Math.random() * 35, hit: 0 });
  }

  function addHazard() {
    hazards.push({ x: canvas.clientWidth + 90, width: 38, hit: 0 });
  }

  function addPoints(points, x, y) {
    score = Math.min(20, score + points);
    scoreElement.textContent = String(score).padStart(3, '0');
    particles.push({ x, y, text: `+${points}`, life: .7, color: points === 3 ? '#ffe600' : '#ffffff' });
    if (score >= 20) unlockNextGame();
  }

  function attack() {
    if (!running || player.attack > 0 || player.hurt > 0 || performance.now() - lastAttack < 310) return;
    lastAttack = performance.now();
    player.attack = .24;
    player.state = 'attack';
    trail.push({ x: player.x + 32, y: player.y + 38, life: .22 });
    enemies = enemies.filter((enemy) => {
      const inRange = Math.abs(enemy.x - player.x) < 100 && Math.abs(enemy.y - player.y) < 72;
      if (inRange) { addPoints(2, enemy.x, enemy.y); particles.push({ x: enemy.x, y: enemy.y, text: '✦', life: .45, color: '#ff9d00' }); return false; }
      return true;
    });
  }

  function unlockNextGame() {
    if (!running || completed) return;
    completed = true;
    running = false;
    stopBackgroundAudio();
    overlayTitle.textContent = 'LEVEL COMPLETE!';
    overlayCopy.textContent = 'Banana Ninja Mastered 🍌⚔️ Loading the next game...';
    startButton.style.display = 'none';
    overlay.classList.remove('hidden');
    window.setTimeout(() => {
      window.advancePazhamGame?.();
    }, 1500);
  }

  function damage() {
    if (player.invincible > 0 || !running) return;
    health -= 1; player.hurt = .45; player.invincible = 1; player.state = 'hurt';
    heartsElement.textContent = '❤️ '.repeat(health) + '🖤 '.repeat(3 - health);
    particles.push({ x: player.x + 22, y: player.y + 15, text: '✹', life: .5, color: '#ff5d5d' });
    if (health <= 0) {
      running = false; overlayTitle.textContent = 'BANANA DOWN!'; overlayCopy.textContent = 'The grove got the better of you. Try again!'; startButton.textContent = 'Play again'; overlay.classList.remove('hidden');
    }
  }

  function drawSprite(name, x, y, width, height, flip = false) {
    const frame = frames[name];
    if (!spriteSheet.complete || !frame) return;
    ctx.save();
    if (flip) { ctx.translate(x + width, 0); ctx.scale(-1, 1); x = 0; }
    ctx.drawImage(spriteSheet, ...frame, x, y, width, height);
    ctx.restore();
  }

  function draw(now) {
    if (!lastFrame) lastFrame = now;
    const elapsed = Math.min((now - lastFrame) / 1000, .05);
    lastFrame = now;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
    if (ninjaBackground.complete && ninjaBackground.naturalWidth) ctx.drawImage(ninjaBackground, 0, 0, width, height);
    const ground = height - 70;

    if (running) {
      spawnTimer += elapsed;
      if (spawnTimer > .75) { addItem(); spawnTimer = 0; }
      if (Math.random() < elapsed * .28) addEnemy();
      if (Math.random() < elapsed * .13) addHazard();
      const moving = (keys.left ? -1 : 0) + (keys.right ? 1 : 0);
      const speed = player.dash > 0 ? 250 : 145;
      player.vx = moving * speed;
      player.x = Math.max(28, Math.min(width - 88, player.x + player.vx * elapsed));
      scroll += Math.max(0, player.vx) * elapsed;
      if (keys.jump && player.grounded) { player.vy = -375; player.grounded = false; keys.jump = false; particles.push({ x: player.x, y: ground, text: '• •', life: .35, color: '#ffffff' }); }
      if (keys.dash && player.dash <= 0) { player.dash = .18; keys.dash = false; }
      player.vy += 920 * elapsed; player.y += player.vy * elapsed;
      if (player.y >= ground - player.height) { player.y = ground - player.height; player.vy = 0; player.grounded = true; }
      player.attack = Math.max(0, player.attack - elapsed); player.dash = Math.max(0, player.dash - elapsed); player.hurt = Math.max(0, player.hurt - elapsed); player.invincible = Math.max(0, player.invincible - elapsed);
      if (!player.attack && !player.hurt) player.state = !player.grounded ? (player.vy < 0 ? 'jump' : 'jump') : (moving ? 'run' : 'idle');
      items.forEach((item) => { item.x -= 95 * elapsed; item.bob += elapsed * 5; if (Math.hypot(item.x - player.x - 28, item.y - (player.y + 35)) < 52) { item.collected = true; addPoints(item.points, item.x, item.y); } });
      items = items.filter((item) => item.x > -70 && !item.collected);
      enemies.forEach((enemy) => { enemy.x -= (enemy.speed + Math.max(0, player.vx)) * elapsed; enemy.y = ground - enemy.height; if (Math.abs(enemy.x - player.x) < 45) damage(); });
      enemies = enemies.filter((enemy) => enemy.x > -90);
      hazards.forEach((hazard) => { hazard.x -= (80 + Math.max(0, player.vx)) * elapsed; if (Math.abs(hazard.x - player.x - 25) < 23 && player.y + player.height > ground - 25) damage(); });
      hazards = hazards.filter((hazard) => hazard.x > -60);
    }

    trail = trail.filter((slash) => (slash.life -= elapsed) > 0);
    trail.forEach((slash) => {
      ctx.save();
      ctx.globalAlpha = slash.life * 4;
      ctx.shadowColor = '#73e9ff';
      ctx.shadowBlur = 12;
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 7; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.arc(slash.x, slash.y, 55, -.85, .95); ctx.stroke();
      ctx.strokeStyle = '#9defff'; ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    });
    items.forEach((item) => drawSprite(item.type, item.x - 26, item.y + Math.sin(item.bob) * 5 - 28, 52, 58));
    enemies.forEach((enemy) => drawSprite('enemy', enemy.x, enemy.y, enemy.width, enemy.height, true));
    hazards.forEach((hazard) => { ctx.fillStyle = '#dae6eb'; ctx.strokeStyle = '#17212c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(hazard.x, ground); ctx.lineTo(hazard.x + hazard.width / 2, ground - 28); ctx.lineTo(hazard.x + hazard.width, ground); ctx.closePath(); ctx.fill(); ctx.stroke(); });
    const playerFrame = player.hurt ? 'hurt' : player.attack ? 'attack' : player.dash ? 'dash' : player.state;
    if (!(player.invincible > 0 && Math.floor(now / 80) % 2)) drawSprite(playerFrame, player.x, player.y, player.attack ? 92 : 68, player.height, player.vx < 0);
    particles = particles.filter((particle) => (particle.life -= elapsed) > 0);
    particles.forEach((particle) => { ctx.save(); ctx.globalAlpha = particle.life * 1.7; ctx.fillStyle = particle.color; ctx.font = 'bold 18px Silkscreen'; ctx.fillText(particle.text, particle.x, particle.y - (1 - particle.life) * 32); ctx.restore(); });
    animationFrame = requestAnimationFrame(draw);
  }

  function resetGame() {
    running = false; completed = false; items = []; enemies = []; hazards = []; particles = []; trail = []; score = 0; health = 3; spawnTimer = 0; lastFrame = 0; scroll = 0;
    Object.assign(player, { x: 105, y: 0, vx: 0, vy: 0, state: 'idle', attack: 0, dash: 0, hurt: 0, invincible: 0, grounded: true });
    scoreElement.textContent = '000'; heartsElement.textContent = '❤️ ❤️ ❤️';
    overlayTitle.textContent = 'Reach 20 points!';
    overlayCopy.textContent = 'Move, jump, dash and slash your way through the banana grove.';
    startButton.textContent = 'Start slicing'; startButton.style.display = '';
    overlay.classList.remove('hidden');
    status.textContent = 'Arrow keys / WASD move · Space jumps · J or click slashes · Shift dashes';
    sizeCanvas();
  }

  function startGame() {
    sizeCanvas();
    running = true;
    overlay.classList.add('hidden');
    status.textContent = 'Reach 20 points to unlock the next game.';
    player.y = canvas.clientHeight - 70 - player.height;
  }

  const keyMap = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', Space: 'jump', ShiftLeft: 'dash', ShiftRight: 'dash' };
  document.addEventListener('keydown', (event) => { if (!running) return; if (event.code === 'KeyJ') attack(); const key = keyMap[event.code]; if (key) { keys[key] = true; event.preventDefault(); } });
  document.addEventListener('keyup', (event) => { const key = keyMap[event.code]; if (key) keys[key] = false; });
  canvas.addEventListener('pointerdown', (event) => { if (running) attack(); });
  document.querySelectorAll('[data-ninja-control]').forEach((button) => {
    const control = button.dataset.ninjaControl;
    const down = (event) => { event.preventDefault(); if (control === 'attack') attack(); else keys[control] = true; };
    const up = () => { if (control !== 'attack') keys[control] = false; };
    button.addEventListener('pointerdown', down); button.addEventListener('pointerup', up); button.addEventListener('pointercancel', up); button.addEventListener('pointerleave', up);
  });
  startButton.addEventListener('click', () => {
    if (health <= 0) resetGame();
    startGame();
  });
  window.addEventListener('resize', sizeCanvas);
  window.resetPazhamNinja = resetGame;
  window.stopPazhamNinja = () => { running = false; keys = {}; };
  resetGame();
  animationFrame = requestAnimationFrame(draw);
}

function stopBackgroundAudio() {
  const audio = document.getElementById('bg-audio');
  if (!audio) return;

  audio.dataset.gameComplete = 'true';
  audio.pause();
  audio.currentTime = 0;
  audio.muted = true;
  audio.removeAttribute('src');
  audio.load();
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
