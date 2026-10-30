/**
 * Magic Math Adventure - Interactive Addition & Subtraction for Kids (Ages 5-6)
 */

(function () {
  'use strict';

  // --- Audio Synthesizer (Web Audio API - Zero External Dependencies) ---
  class SoundEffects {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playPop() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    }

    playCorrectFanfare() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      // Happy arpeggio: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const now = this.ctx.currentTime;

      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.12);

        gain.gain.setValueAtTime(0.35, now + index * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.12 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + index * 0.12);
        osc.stop(now + index * 0.12 + 0.35);
      });
    }

    playSparkle() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const freqs = [1200, 1500, 1800, 2200];
      const now = this.ctx.currentTime;
      freqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.08);
        gain.gain.setValueAtTime(0.2, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.2);
      });
    }

    playTryAgainSound() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      // Gentle, soft descending wobble (empathetic, not punishing)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.35);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    }

    playSwoosh() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.28);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    }

    playCarryFlightSound() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5 arpeggio
      const now = this.ctx.currentTime;
      notes.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.08);
        gain.gain.setValueAtTime(0.25, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.22);
      });
    }

    playKeyNote(digit) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      // Glockenspiel / Musical Toy xylophone frequencies for 0-9
      const noteMap = {
        '1': 261.63, // C4
        '2': 293.66, // D4
        '3': 329.63, // E4
        '4': 349.23, // F4
        '5': 392.00, // G4
        '6': 440.00, // A4
        '7': 493.88, // B4
        '8': 523.25, // C5
        '9': 587.33, // D5
        '0': 659.25  // E5
      };

      const freq = noteMap[digit] || 440;
      const now = this.ctx.currentTime;

      // Primary acoustic bell/glockenspiel tone
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      // Bright harmonic shimmer
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.75, now);

      gain1.gain.setValueAtTime(0.32, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.35);
      osc2.start(now);
      osc2.stop(now + 0.18);
    }

    playDelete() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.12);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    }

    playCuteGiggle() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const freqs = [587, 784, 880, 1046];
      const now = this.ctx.currentTime;
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + idx * 0.06);
        gain.gain.setValueAtTime(0.25, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.06 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.15);
      });
    }
  }

  // --- Visual Particles Engine (Fireworks, Flowers & Sparkles) ---
  class FXEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.flowers = [];
      this.animationId = null;
      this.flowerIcons = ['🌸', '🌺', '🌻', '🌷', '🌼', '⭐', '🎈'];
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    spawnSparkleTrail(x, y) {
      const count = 3;
      const colors = ['#FDE047', '#60A5FA', '#F472B6', '#4ADE80', '#C084FC'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 2;
        this.particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: 2 + Math.random() * 3,
          life: 1,
          decay: 0.035 + Math.random() * 0.02,
          gravity: 0.05
        });
      }
      if (!this.animationId) {
        this.loop();
      }
    }

    sparkleAt(x, y, count = 14) {
      if (!this.canvas) return;
      const colors = ['#FDE047', '#60A5FA', '#F472B6', '#4ADE80', '#C084FC', '#F59E0B'];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.4;
        const speed = 1.5 + Math.random() * 3.5;
        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: 2.5 + Math.random() * 3,
          life: 1,
          decay: 0.025 + Math.random() * 0.02,
          gravity: 0.08
        });
      }
      if (!this.animationId) {
        this.loop();
      }
    }

    launchCelebration() {
      this.particles = [];
      this.flowers = [];

      // Multiple fireworks bursts across screen
      const colors = ['#FF1744', '#FF9100', '#FFEA00', '#00E676', '#00B0FF', '#D500F9', '#FF4081'];
      const bursts = 5;

      for (let b = 0; b < bursts; b++) {
        setTimeout(() => {
          const x = this.width * (0.2 + Math.random() * 0.6);
          const y = this.height * (0.2 + Math.random() * 0.4);
          const color = colors[Math.floor(Math.random() * colors.length)];
          this.createBurst(x, y, color);
        }, b * 220);
      }

      // Launch floating flowers cascading down
      for (let i = 0; i < 35; i++) {
        this.flowers.push({
          x: Math.random() * this.width,
          y: -20 - Math.random() * 200,
          vy: 2 + Math.random() * 3,
          vx: (Math.random() - 0.5) * 2,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 4,
          icon: this.flowerIcons[Math.floor(Math.random() * this.flowerIcons.length)],
          size: 24 + Math.random() * 18,
          alpha: 1
        });
      }

      if (!this.animationId) {
        this.loop();
      }
    }

    createBurst(x, y, color) {
      const count = 45;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i + (Math.random() * 0.2);
        const speed = 3 + Math.random() * 6;
        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: color,
          radius: 3 + Math.random() * 4,
          life: 1,
          decay: 0.015 + Math.random() * 0.01,
          gravity: 0.12
        });
      }
    }

    stop() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.particles = [];
      this.flowers = [];
    }

    loop() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Render & update fireworks particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.life -= p.decay;

        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = p.life;
        this.ctx.fillStyle = p.color;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }

      // Render & update floating flowers
      for (let i = this.flowers.length - 1; i >= 0; i--) {
        const f = this.flowers[i];
        f.y += f.vy;
        f.x += f.vx;
        f.rotation += f.rotSpeed;

        if (f.y > this.height + 40) {
          this.flowers.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.font = `${f.size}px serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.translate(f.x, f.y);
        this.ctx.rotate((f.rotation * Math.PI) / 180);
        this.ctx.fillText(f.icon, 0, 0);
        this.ctx.restore();
      }

      if (this.particles.length > 0 || this.flowers.length > 0) {
        this.animationId = requestAnimationFrame(() => this.loop());
      } else {
        this.animationId = null;
      }
    }
  }

  // --- Dynamic Device & Layout Adapter (Responsive Zero-Scroll Engine) ---
  class DeviceAdapter {
    constructor(game) {
      this.game = game;
      this.device = {
        isIPad: false,
        isIPhone: false,
        isIOS: false,
        isAndroid: false,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        orientation: 'landscape',
        width: window.innerWidth,
        height: window.innerHeight
      };
      this.init();
    }

    init() {
      this.detectDevice();
      this.updateViewport();
      this.updateAdaptiveLabels();

      window.addEventListener('resize', () => {
        this.detectDevice();
        this.updateViewport();
        this.updateAdaptiveLabels();
      });

      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          this.detectDevice();
          this.updateViewport();
          this.updateAdaptiveLabels();
        }, 120);
      });

      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', () => {
          this.updateViewport();
        });
      }
    }

    detectDevice() {
      const ua = navigator.userAgent || '';
      const platform = navigator.platform || '';
      const maxTouchPoints = navigator.maxTouchPoints || 0;

      // iPadOS 13+ detection (reports Macintosh in userAgent on Safari, but has touch points)
      const isIPad = /iPad/.test(ua) || (platform === 'MacIntel' && maxTouchPoints > 1 && !/iPhone/.test(ua));
      const isIPhone = /iPhone|iPod/.test(ua);
      const isIOS = isIPad || isIPhone;
      const isAndroid = /Android/.test(ua);
      const w = window.innerWidth;
      const h = window.innerHeight;
      const orientation = w >= h ? 'landscape' : 'portrait';

      const isMobile = isIPhone || (/Android/.test(ua) && /Mobile/.test(ua)) || w < 560;
      const isTablet = isIPad || (!isMobile && (/Android/.test(ua) || (w >= 560 && w <= 1100 && maxTouchPoints > 0) || (w >= 560 && w <= 1024 && h >= 700)));
      const isDesktop = !isMobile && !isTablet;

      this.device = {
        isIPad,
        isIPhone,
        isIOS,
        isAndroid,
        isMobile,
        isTablet,
        isDesktop,
        orientation,
        width: w,
        height: h
      };

      const root = document.documentElement;
      root.classList.toggle('device-ipad', isIPad);
      root.classList.toggle('device-iphone', isIPhone);
      root.classList.toggle('device-ios', isIOS);
      root.classList.toggle('device-android', isAndroid);
      root.classList.toggle('device-mobile', isMobile);
      root.classList.toggle('device-tablet', isTablet);
      root.classList.toggle('device-desktop', isDesktop);
      root.classList.toggle('orientation-landscape', orientation === 'landscape');
      root.classList.toggle('orientation-portrait', orientation === 'portrait');

      if (document.body) {
        document.body.classList.toggle('device-mobile', isMobile);
        document.body.classList.toggle('device-tablet', isTablet);
        document.body.classList.toggle('device-desktop', isDesktop);
      }
    }

    updateViewport() {
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      document.documentElement.style.setProperty('--app-height', `${vh}px`);
      document.documentElement.style.setProperty('--app-width', `${vw}px`);
    }

    updateAdaptiveLabels() {
      const isNarrow = this.device.isMobile || window.innerWidth < 560;

      // Format Selector tabs
      const tabH = document.getElementById('tabHorizontal');
      const tabV = document.getElementById('tabVertical');
      if (tabH && tabV) {
        if (isNarrow) {
          tabH.innerHTML = '<span class="tab-icon">🎈</span> 1-Digit';
          tabV.innerHTML = '<span class="tab-icon">📐</span> Vertical';
        } else {
          tabH.innerHTML = '<span class="tab-icon">🎈</span> 1-Digit (5-6 yrs)';
          tabV.innerHTML = '<span class="tab-icon">📐</span> Vertical (Up to 4 Digits)';
        }
      }

      // Digit Range Selector pills
      const pills = document.querySelectorAll('.digit-pill');
      if (pills && pills.length === 3) {
        if (isNarrow) {
          pills[0].textContent = '2 Digits';
          pills[1].textContent = '3 Digits';
          pills[2].textContent = '4 Digits';
        } else {
          pills[0].textContent = '2 Digits (Tens)';
          pills[1].textContent = '3 Digits (Hundreds)';
          pills[2].textContent = '4 Digits (Thousands)';
        }
      }

      // Mode Selector tabs
      const modeTabs = document.querySelectorAll('.mode-tab');
      if (modeTabs && modeTabs.length === 3) {
        if (isNarrow) {
          modeTabs[0].innerHTML = '<span class="tab-icon">➕</span> Add';
          modeTabs[1].innerHTML = '<span class="tab-icon">➖</span> Sub';
          modeTabs[2].innerHTML = '<span class="tab-icon">🔀</span> Both';
        } else {
          modeTabs[0].innerHTML = '<span class="tab-icon">➕</span> Addition';
          modeTabs[1].innerHTML = '<span class="tab-icon">➖</span> Subtraction';
          modeTabs[2].innerHTML = '<span class="tab-icon">🔀</span> Both (+ & -)';
        }
      }

      // Title
      const titleEl = document.querySelector('.game-title');
      if (titleEl) {
        if (window.innerWidth < 380) {
          titleEl.textContent = 'Magic Math!';
        } else {
          titleEl.textContent = 'Magic Math Fun!';
        }
      }
    }
  }

  // --- Main Game Controller ---
  class MathGame {
    constructor() {
      this.sound = new SoundEffects();
      this.fx = new FXEngine('fxCanvas');
      this.deviceAdapter = new DeviceAdapter(this);

      // Game State
      this.mode = 'add'; // 'add', 'sub', 'mix'
      this.num1 = 0;
      this.num2 = 0;
      this.op = '+';
      this.answer = 0;
      this.currentInput = '';
      this.score = 0;
      this.streak = 0;
      this.trophies = 0;
      this.unlockedStickers = 0;
      this.showCounters = true;

      // Available items for visual counting (icon + name)
      this.fruitList = [
        { icon: '🍎', name: 'apples' },
        { icon: '🍊', name: 'oranges' },
        { icon: '🍌', name: 'bananas' },
        { icon: '🍓', name: 'strawberries' },
        { icon: '🍇', name: 'grapes' },
        { icon: '⭐', name: 'stars' },
        { icon: '🎈', name: 'balloons' }
      ];
      this.currentFruit = this.fruitList[0];

      this.praisePhrases = [
        'YOU ARE A SUPERSTAR! 🌟',
        'AMAZING JOB! 🎉',
        'WOW, SO SMART! 🎈',
        'YOU DID IT! 🥳',
        'GENIUS MATH HERO! 👑',
        'HOORAY! YOU GOT IT! ✨'
      ];

      // DOM Elements
      this.num1El = document.getElementById('num1');
      this.num2El = document.getElementById('num2');
      this.opSymbolEl = document.getElementById('opSymbol');
      this.mysteryBoxEl = document.getElementById('mysteryBox');
      this.keypadEl = document.getElementById('keypad');
      this.keyClear = document.getElementById('keyClear');
      this.keySubmit = document.getElementById('keySubmit');
      this.hintTextEl = document.getElementById('hintText');

      // Mascot & Theme Elements
      this.mascotAvatar = document.getElementById('mascotAvatar');
      this.mascotBubble = document.getElementById('mascotBubble');
      this.themeBtn = document.getElementById('themeBtn');
      this.themeIcon = document.getElementById('themeIcon');
      this.themeLabel = document.getElementById('themeLabel');
      this.comboBadge = document.getElementById('comboBadge');
      this.comboText = document.getElementById('comboText');

      // Voice Language ('en' for pure English, 'zh' for pure Traditional Chinese)
      this.voiceLang = 'en';
      this.langBtn = document.getElementById('langBtn');
      this.langLabel = document.getElementById('langLabel');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
          // Pre-warm browser voices list
        };
      }

      // Format (Horizontal 1-digit vs Vertical multi-digit)
      this.format = 'horizontal'; // 'horizontal' or 'vertical'
      this.vDigits = 2; // 2, 3, or 4 digits
      this.tabHorizontal = document.getElementById('tabHorizontal');
      this.tabVertical = document.getElementById('tabVertical');
      this.digitSelector = document.getElementById('digitSelector');
      this.digitPills = document.querySelectorAll('.digit-pill');
      this.equationCard = document.querySelector('.equation-card');
      this.verticalCard = document.getElementById('verticalCard');
      this.vGrid = document.getElementById('vGrid');
      this.vDemoBtn = document.getElementById('vDemoBtn');
      this.vBorrowActionBtn = document.getElementById('vBorrowActionBtn');
      this.vStepGuide = document.getElementById('vStepGuide');
      this.vGuideText = document.getElementById('vGuideText');
      this.vGuideIcon = document.getElementById('vGuideIcon');
      this.vGuideDetail = document.getElementById('vGuideDetail');

      this.vProblem = null;
      this.vSteps = [];
      this.vCurrentStepIndex = 0;
      this.vCurrentColInput = '';
      this.vUserAnswers = {};
      this.vCarried = {};
      this.vBorrowed = {};
      this.isDemoPlaying = false;

      this.themes = [
        { id: 'theme-sky', name: 'Sky', icon: '🎨' },
        { id: 'theme-space', name: 'Space', icon: '🚀' },
        { id: 'theme-candy', name: 'Candy', icon: '🍭' }
      ];
      this.currentThemeIndex = 0;

      this.mascotPhrases = [
        'You got this, Math Hero! 🌟',
        'Pip believes in you! 🐰✨',
        'Tap the keys to make music! 🎵',
        'Ready for the next challenge? 🚀',
        'You are doing super awesome! 💖'
      ];

      this.visualHelpersWrapper = document.getElementById('visualHelpersWrapper');
      this.helpersBadgeEl = document.getElementById('helpersBadge');
      this.visualHelpersEl = document.getElementById('visualHelpers');
      this.helperLeftEl = document.getElementById('helperLeft');
      this.helperRightEl = document.getElementById('helperRight');
      this.helperOpEl = document.getElementById('helperOp');
      this.countLeftEl = document.getElementById('countLeft');
      this.countRightEl = document.getElementById('countRight');
      this.counterRightCard = document.getElementById('counterRightCard');
      this.scoreValEl = document.getElementById('scoreVal');
      this.starsTrayEl = document.getElementById('starsTray');
      this.trophyCountEl = document.getElementById('trophyCount');
      this.stickerCountEl = document.getElementById('stickerCount');
      this.stickersRowEl = document.getElementById('stickersRow');
      this.soundBtn = document.getElementById('soundBtn');
      this.soundIcon = document.getElementById('soundIcon');
      this.speechBtn = document.getElementById('speechBtn');
      this.visualToggleBtn = document.getElementById('visualToggleBtn');

      // Modals
      this.celebrationModal = document.getElementById('celebrationModal');
      this.praiseMessageEl = document.getElementById('praiseMessage');
      this.praiseEquationEl = document.getElementById('praiseEquation');
      this.nextQuestionBtn = document.getElementById('nextQuestionBtn');

      this.sadModal = document.getElementById('sadModal');
      this.sadHintEl = document.getElementById('sadHint');
      this.tryAgainBtn = document.getElementById('tryAgainBtn');

      this.animalElements = [
        document.getElementById('animalLion'),
        document.getElementById('animalBunny'),
        document.getElementById('animalPuppy')
      ];

      this.bindEvents();
      this.generateNewProblem();
    }

    bindEvents() {
      // Theme Switcher Button
      if (this.themeBtn) {
        this.themeBtn.addEventListener('click', () => {
          this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
          const nextTheme = this.themes[this.currentThemeIndex];
          this.themes.forEach(t => document.body.classList.remove(t.id));
          document.body.classList.add(nextTheme.id);
          document.body.classList.toggle('mode-vertical', this.format === 'vertical');
          document.body.classList.toggle('mode-horizontal', this.format === 'horizontal');
          if (this.themeIcon) this.themeIcon.textContent = nextTheme.icon;
          if (this.themeLabel) this.themeLabel.textContent = nextTheme.name;
          this.sound.playSparkle();
          this.setMascotMessage(`Switched to ${nextTheme.name} theme! ✨`);
        });
      }

      // Voice Language Switcher Button (EN / 中文)
      if (this.langBtn) {
        this.langBtn.addEventListener('click', () => {
          this.voiceLang = this.voiceLang === 'en' ? 'zh' : 'en';
          if (this.langLabel) {
            this.langLabel.textContent = this.voiceLang === 'en' ? 'EN' : '中文';
          }
          this.sound.playSparkle();
          if (this.voiceLang === 'zh') {
            this.setMascotMessage('切換為中文純發音！🌟');
            this.speakText('切換為中文語音', 'zh');
          } else {
            this.setMascotMessage('Switched to English voice! 🌟');
            this.speakText('Switched to English voice', 'en');
          }
        });
      }

      // Format Switcher Tabs (Horizontal vs Vertical Multi-Digit)
      if (this.tabHorizontal) {
        this.tabHorizontal.addEventListener('click', () => {
          if (this.format === 'horizontal') return;
          this.format = 'horizontal';
          document.body.classList.add('mode-horizontal');
          document.body.classList.remove('mode-vertical');
          this.tabHorizontal.classList.add('active');
          if (this.tabVertical) this.tabVertical.classList.remove('active');
          if (this.visualToggleBtn) {
            this.visualToggleBtn.classList.remove('hidden');
            this.visualToggleBtn.style.removeProperty('display');
          }
          if (this.digitSelector) this.digitSelector.classList.add('hidden');
          if (this.verticalCard) this.verticalCard.classList.add('hidden');
          if (this.equationCard) this.equationCard.classList.remove('hidden');
          if (this.visualHelpersWrapper) {
            this.visualHelpersWrapper.classList.toggle('hidden', !this.showCounters);
            if (this.showCounters) {
              this.visualHelpersWrapper.style.removeProperty('display');
            } else {
              this.visualHelpersWrapper.style.setProperty('display', 'none', 'important');
            }
          }
          if (this.hintTextEl) this.hintTextEl.textContent = 'Tap the number keys, then press OK! 👇';
          this.sound.playPop();
          this.generateNewProblem();
        });
      }

      if (this.tabVertical) {
        this.tabVertical.addEventListener('click', () => {
          if (this.format === 'vertical') return;
          this.format = 'vertical';
          document.body.classList.add('mode-vertical');
          document.body.classList.remove('mode-horizontal');
          this.tabVertical.classList.add('active');
          if (this.tabHorizontal) this.tabHorizontal.classList.remove('active');
          if (this.visualToggleBtn) {
            this.visualToggleBtn.classList.add('hidden');
            this.visualToggleBtn.style.setProperty('display', 'none', 'important');
          }
          if (this.digitSelector) this.digitSelector.classList.remove('hidden');
          if (this.verticalCard) this.verticalCard.classList.remove('hidden');
          if (this.equationCard) this.equationCard.classList.add('hidden');
          if (this.visualHelpersWrapper) {
            this.visualHelpersWrapper.classList.add('hidden');
            this.visualHelpersWrapper.style.setProperty('display', 'none', 'important');
          }
          if (this.hintTextEl) this.hintTextEl.textContent = 'Solve column by column, then press OK! 👉';
          this.sound.playPop();
          this.generateNewProblem();
        });
      }

      // Digit Range Pills (2, 3, 4 Digits)
      if (this.digitPills) {
        this.digitPills.forEach(pill => {
          pill.addEventListener('click', () => {
            this.digitPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            this.vDigits = parseInt(pill.dataset.digits, 10);
            this.sound.playPop();
            this.generateNewProblem();
          });
        });
      }

      // Vertical Demo button
      if (this.vDemoBtn) {
        this.vDemoBtn.addEventListener('click', () => {
          this.playVerticalDemo();
        });
      }

      // Check URL hash for direct mode selection (e.g. #vertical or #horizontal)
      if (window.location.hash === '#vertical' && this.tabVertical) {
        setTimeout(() => this.tabVertical.click(), 10);
      } else if (window.location.hash === '#horizontal' && this.tabHorizontal) {
        setTimeout(() => this.tabHorizontal.click(), 10);
      }

      // Vertical Borrow action button
      if (this.vBorrowActionBtn) {
        this.vBorrowActionBtn.addEventListener('click', () => {
          this.executeActiveBorrow();
        });
      }

      // Interactive Mascot Pip Tap
      if (this.mascotAvatar) {
        this.mascotAvatar.addEventListener('click', () => {
          this.sound.playCuteGiggle();
          this.mascotAvatar.style.transform = 'scale(1.25) rotate(12deg)';
          setTimeout(() => {
            if (this.mascotAvatar) this.mascotAvatar.style.transform = '';
          }, 250);
          const cheerfulPip = [
            'Pip loves you! Keep shining! 🐰💖',
            'You are a true math superstar! 🌟',
            'Pip is dancing for your success! 💃',
            'Let\'s make more math magic! ✨'
          ];
          this.setMascotMessage(cheerfulPip[Math.floor(Math.random() * cheerfulPip.length)]);
        });
      }

      // Interactive Touch & Mouse Magic Sparkle Trail
      let lastTrailTime = 0;
      const handlePointer = (e) => {
        const now = Date.now();
        if (now - lastTrailTime < 32) return;
        lastTrailTime = now;
        let x = e.clientX;
        let y = e.clientY;
        if (e.touches && e.touches[0]) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        }
        if (typeof x === 'number' && typeof y === 'number') {
          this.fx.spawnSparkleTrail(x, y);
        }
      };
      window.addEventListener('pointermove', handlePointer, { passive: true });
      window.addEventListener('touchmove', handlePointer, { passive: true });

      // Sound toggle
      this.soundBtn.addEventListener('click', () => {
        this.sound.enabled = !this.sound.enabled;
        this.soundIcon.textContent = this.sound.enabled ? '🔊' : '🔇';
        this.soundBtn.classList.toggle('active', this.sound.enabled);
        if (this.sound.enabled) {
          this.sound.playPop();
        }
      });

      // Speech Read Aloud
      this.speechBtn.addEventListener('click', () => {
        this.speakProblem();
      });

      // Visual Counter Toggle (Only active in 1-digit horizontal mode)
      this.visualToggleBtn.addEventListener('click', () => {
        if (this.format !== 'horizontal') {
          if (this.visualToggleBtn) {
            this.visualToggleBtn.classList.add('hidden');
            this.visualToggleBtn.style.setProperty('display', 'none', 'important');
          }
          if (this.visualHelpersWrapper) {
            this.visualHelpersWrapper.classList.add('hidden');
            this.visualHelpersWrapper.style.setProperty('display', 'none', 'important');
          }
          return;
        }
        this.showCounters = !this.showCounters;
        this.visualToggleBtn.classList.toggle('active', this.showCounters);
        if (this.visualHelpersWrapper) {
          this.visualHelpersWrapper.classList.toggle('hidden', !this.showCounters);
          if (this.showCounters) {
            this.visualHelpersWrapper.style.removeProperty('display');
          } else {
            this.visualHelpersWrapper.style.setProperty('display', 'none', 'important');
          }
        } else {
          this.visualHelpersEl.classList.toggle('hidden', !this.showCounters);
        }
        this.sound.playPop();
      });

      // Mode tabs
      const modeTabs = document.querySelectorAll('.mode-tab');
      modeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          modeTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          this.mode = tab.dataset.mode;
          this.sound.playPop();
          this.generateNewProblem();
        });
      });

      // Number Keypad (0-9)
      const numKeys = document.querySelectorAll('.key-num');
      numKeys.forEach(btn => {
        btn.addEventListener('click', () => {
          this.handleDigit(btn.dataset.val);
        });
      });

      // Keypad Clear
      this.keyClear.addEventListener('click', () => {
        this.handleBackspace();
      });

      // Keypad Check/OK
      this.keySubmit.addEventListener('click', () => {
        this.checkAnswer();
      });

      // Physical Keyboard input
      window.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
          this.handleDigit(e.key);
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          this.handleBackspace();
        } else if (e.key === 'Enter') {
          this.checkAnswer();
        }
      });

      // Celebration Next Button
      this.nextQuestionBtn.addEventListener('click', () => {
        this.sound.playPop();
        this.closeCelebration();
        this.generateNewProblem();
      });

      // Sad Modal Try Again Button
      this.tryAgainBtn.addEventListener('click', () => {
        this.sound.playPop();
        this.closeSadModal();
      });

      // Close modal on outside click
      this.celebrationModal.addEventListener('click', (e) => {
        if (e.target === this.celebrationModal) {
          this.closeCelebration();
          this.generateNewProblem();
        }
      });

      this.sadModal.addEventListener('click', (e) => {
        if (e.target === this.sadModal) {
          this.closeSadModal();
        }
      });
    }

    /**
     * Generates additions & subtractions for either horizontal 1-digit or vertical multi-digit
     */
    generateNewProblem() {
      if (this.format === 'vertical') {
        this.generateVerticalProblem();
        return;
      }

      this.currentInput = '';
      this.currentFruit = this.fruitList[Math.floor(Math.random() * this.fruitList.length)];
      if (this.helpersBadgeEl) {
        this.helpersBadgeEl.textContent = `${this.currentFruit.icon} Tap to Count`;
      }

      let activeOp = this.mode;
      if (activeOp === 'mix') {
        activeOp = Math.random() < 0.5 ? 'add' : 'sub';
      }

      if (activeOp === 'add') {
        this.op = '+';
        // 2 numbers of single digits (1 to 9), sums up to 18 (e.g. 9 + 8)
        this.num1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
        this.num2 = Math.floor(Math.random() * 9) + 1; // 1 to 9
        this.answer = this.num1 + this.num2;
      } else {
        // Subtraction: STRICTLY POSITIVE RESULT (answer >= 1)
        this.op = '−';
        this.num1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
        this.num2 = Math.floor(Math.random() * (this.num1 - 1)) + 1; // 1 to num1-1
        this.answer = this.num1 - this.num2; // always >= 1
      }

      // Render problem to UI
      this.renderProblem();
      this.renderVisualCounters();

      // Pip gives an encouraging tip for this problem
      if (this.op === '+') {
        this.setMascotMessage(`Can you add ${this.num1} and ${this.num2} together? 🌟`);
      } else {
        this.setMascotMessage(`Start with ${this.num1} and take away ${this.num2}! 🎈`);
      }
    }

    renderProblem() {
      this.num1El.textContent = this.num1;
      this.num2El.textContent = this.num2;
      this.opSymbolEl.textContent = this.op;
      this.mysteryBoxEl.textContent = '?';
      this.mysteryBoxEl.classList.remove('has-val');
      this.keySubmit.classList.remove('ready');

      // Subtle pulse on update
      this.num1El.style.transform = 'scale(1.15)';
      this.num2El.style.transform = 'scale(1.15)';
      setTimeout(() => {
        this.num1El.style.transform = '';
        this.num2El.style.transform = '';
      }, 250);
    }

    renderVisualCounters() {
      if (!this.helperLeftEl || !this.helperRightEl) {
        this.helperLeftEl = document.getElementById('helperLeft');
        this.helperRightEl = document.getElementById('helperRight');
        this.helperOpEl = document.getElementById('helperOp');
        this.countLeftEl = document.getElementById('countLeft');
        this.countRightEl = document.getElementById('countRight');
        this.counterRightCard = document.getElementById('counterRightCard');
      }
      if (!this.helperLeftEl || !this.helperRightEl) return;

      this.helperLeftEl.innerHTML = '';
      this.helperRightEl.innerHTML = '';

      const icon = (this.currentFruit && this.currentFruit.icon) ? this.currentFruit.icon : '🍎';
      const name = (this.currentFruit && this.currentFruit.name) ? this.currentFruit.name : 'items';

      if (this.op === '+') {
        this.helperOpEl.textContent = '+';
        this.helperOpEl.style.display = 'block';
        if (this.counterRightCard) this.counterRightCard.style.display = 'flex';

        // Left items (num1)
        for (let i = 0; i < this.num1; i++) {
          const item = document.createElement('span');
          item.className = 'helper-item';
          item.textContent = icon;
          item.title = `${name} ${i + 1}`;
          item.addEventListener('click', () => {
            this.sound.playPop();
            item.style.transform = 'scale(1.5) rotate(15deg)';
            setTimeout(() => item.style.transform = '', 200);
          });
          this.helperLeftEl.appendChild(item);
        }
        if (this.countLeftEl) {
          this.countLeftEl.textContent = `${this.num1} ${icon}`;
        }

        // Right items (num2)
        for (let i = 0; i < this.num2; i++) {
          const item = document.createElement('span');
          item.className = 'helper-item';
          item.textContent = icon;
          item.title = `${name} ${this.num1 + i + 1}`;
          item.addEventListener('click', () => {
            this.sound.playPop();
            item.style.transform = 'scale(1.5) rotate(15deg)';
            setTimeout(() => item.style.transform = '', 200);
          });
          this.helperRightEl.appendChild(item);
        }
        if (this.countRightEl) {
          this.countRightEl.textContent = `${this.num2} ${icon}`;
        }
      } else {
        // Subtraction: Show num1 total items, with num2 items crossed out
        this.helperOpEl.style.display = 'none';
        if (this.counterRightCard) this.counterRightCard.style.display = 'none';

        const remaining = this.num1 - this.num2;
        for (let i = 0; i < this.num1; i++) {
          const item = document.createElement('span');
          item.className = 'helper-item';
          item.textContent = icon;

          if (i >= remaining) {
            item.classList.add('crossed-out');
            item.title = 'Taken away';
          } else {
            item.title = `${name} ${i + 1}`;
          }

          item.addEventListener('click', () => {
            this.sound.playPop();
            item.style.transform = 'scale(1.4)';
            setTimeout(() => item.style.transform = '', 200);
          });
          this.helperLeftEl.appendChild(item);
        }
        if (this.countLeftEl) {
          this.countLeftEl.textContent = `${remaining} left (of ${this.num1})`;
        }
      }
    }

    handleDigit(digit) {
      if (this.celebrationModal.classList.contains('active') || this.sadModal.classList.contains('active')) {
        return;
      }

      if (this.format === 'vertical') {
        this.handleVerticalDigit(digit);
        return;
      }

      // Maximum answer for 2 single-digit numbers is 9 + 9 = 18 (2 digits)
      if (this.currentInput.length >= 2) return;

      this.currentInput += digit;
      this.mysteryBoxEl.textContent = this.currentInput;
      this.mysteryBoxEl.classList.add('has-val');
      this.keySubmit.classList.add('ready');

      // Musical toy glockenspiel note
      this.sound.playKeyNote(digit);

      // Pip reacts curiously
      if (this.mascotAvatar) {
        this.mascotAvatar.style.transform = 'scale(1.12) rotate(-5deg)';
        setTimeout(() => {
          if (this.mascotAvatar) this.mascotAvatar.style.transform = '';
        }, 180);
      }
    }

    handleBackspace() {
      if (this.celebrationModal.classList.contains('active') || this.sadModal.classList.contains('active')) {
        return;
      }

      if (this.format === 'vertical') {
        this.handleVerticalBackspace();
        return;
      }
      if (this.currentInput.length > 0) {
        this.currentInput = this.currentInput.slice(0, -1);
        if (this.currentInput.length === 0) {
          this.mysteryBoxEl.textContent = '?';
          this.mysteryBoxEl.classList.remove('has-val');
          this.keySubmit.classList.remove('ready');
        } else {
          this.mysteryBoxEl.textContent = this.currentInput;
        }
        this.sound.playDelete();
      }
    }

    // --- Vertical Multi-Digit Math Engine (Up to 4 Digits) ---

    generateVerticalProblem() {
      this.isDemoPlaying = false;
      this.currentInput = '';
      this.vCurrentColInput = '';
      this.vUserAnswers = {};
      this.vCarried = {};
      this.vBorrowed = {};
      this.vCurrentStepIndex = 0;
      document.body.classList.add('mode-vertical');
      document.body.classList.remove('mode-horizontal');
      if (this.visualToggleBtn) {
        this.visualToggleBtn.classList.add('hidden');
        this.visualToggleBtn.style.setProperty('display', 'none', 'important');
      }
      if (this.visualHelpersWrapper) {
        this.visualHelpersWrapper.classList.add('hidden');
        this.visualHelpersWrapper.style.setProperty('display', 'none', 'important');
      }
      if (this.keySubmit) {
        this.keySubmit.classList.remove('ready');
        this.keySubmit.classList.remove('guide-pulse');
      }
      if (this.vBorrowActionBtn) this.vBorrowActionBtn.classList.add('hidden');

      let activeOp = this.mode;
      if (activeOp === 'mix') {
        activeOp = Math.random() < 0.5 ? 'add' : 'sub';
      }
      this.op = activeOp === 'add' ? '+' : '−';

      const minVal = Math.pow(10, this.vDigits - 1);
      const maxVal = Math.pow(10, this.vDigits) - 1;

      if (this.op === '+') {
        let attempts = 0;
        do {
          this.num1 = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
          this.num2 = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
          attempts++;
        } while (attempts < 20 && !this.hasCarry(this.num1, this.num2));
        this.answer = this.num1 + this.num2;
        this.vSteps = this.analyzeVerticalAddition(this.num1, this.num2);
      } else {
        let attempts = 0;
        do {
          this.num1 = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
          this.num2 = Math.floor(Math.random() * (this.num1 - minVal + 1)) + minVal;
          if (this.num1 === this.num2) this.num1 += 1;
          attempts++;
        } while (attempts < 20 && !this.hasBorrow(this.num1, this.num2));
        this.answer = this.num1 - this.num2;
        this.vSteps = this.analyzeVerticalSubtraction(this.num1, this.num2);
      }

      this.renderVerticalGrid();
      this.updateVerticalStep();
    }

    hasCarry(n1, n2) {
      const s1 = String(n1).split('').reverse().map(Number);
      const s2 = String(n2).split('').reverse().map(Number);
      let carry = 0;
      for (let i = 0; i < Math.max(s1.length, s2.length); i++) {
        const sum = (s1[i] || 0) + (s2[i] || 0) + carry;
        if (sum >= 10) return true;
        carry = Math.floor(sum / 10);
      }
      return false;
    }

    hasBorrow(n1, n2) {
      const s1 = String(n1).split('').reverse().map(Number);
      const s2 = String(n2).split('').reverse().map(Number);
      for (let i = 0; i < s2.length; i++) {
        if ((s1[i] || 0) < (s2[i] || 0)) return true;
      }
      return false;
    }

    analyzeVerticalAddition(n1, n2) {
      const s1 = String(n1).split('').reverse().map(Number);
      const s2 = String(n2).split('').reverse().map(Number);
      const len = Math.max(s1.length, s2.length);
      const steps = [];
      let carry = 0;
      for (let i = 0; i < len; i++) {
        const d1 = s1[i] || 0;
        const d2 = s2[i] || 0;
        const sum = d1 + d2 + carry;
        const writeDigit = sum % 10;
        const nextCarry = Math.floor(sum / 10);
        steps.push({
          col: i,
          d1,
          d2,
          inCarry: carry,
          sum,
          writeDigit,
          nextCarry
        });
        carry = nextCarry;
      }
      if (carry > 0) {
        steps.push({
          col: len,
          d1: 0,
          d2: 0,
          inCarry: carry,
          sum: carry,
          writeDigit: carry,
          nextCarry: 0
        });
      }
      return steps;
    }

    analyzeVerticalSubtraction(n1, n2) {
      const s1 = String(n1).split('').reverse().map(Number);
      const s2 = String(n2).split('').reverse().map(Number);
      const len = Math.max(s1.length, s2.length);
      const modTop = [...s1];
      const steps = [];
      for (let i = 0; i < len; i++) {
        const topBeforeBorrow = modTop[i];
        const bot = s2[i] || 0;
        let needsBorrow = false;
        let borrowFromCol = null;
        let top = topBeforeBorrow;
        if (top < bot) {
          needsBorrow = true;
          let j = i + 1;
          while (j < modTop.length && modTop[j] === 0) j++;
          borrowFromCol = j;
          modTop[j] -= 1;
          for (let k = j - 1; k > i; k--) {
            modTop[k] += 9;
          }
          top = topBeforeBorrow + 10;
          modTop[i] = top;
        }
        steps.push({
          col: i,
          origTop: s1[i],
          activeTop: topBeforeBorrow,
          currentTop: top,
          bot,
          diff: top - bot,
          needsBorrow,
          borrowFromCol,
          tenMinusBot: 10 - bot,
          finalAns: (10 - bot) + topBeforeBorrow
        });
      }
      return steps;
    }

    renderVerticalGrid() {
      if (!this.vGrid) return;
      this.vGrid.innerHTML = '';

      const totalCols = this.vSteps.length;
      this.vGrid.style.gridTemplateColumns = `auto repeat(${totalCols}, 1fr)`;

      const colNamesEn = ['O', 'T', 'H', 'Th', 'TTh'];
      const colNamesZh = ['個', '十', '百', '千', '萬'];
      const colClasses = ['col-o', 'col-t', 'col-h', 'col-th', 'col-tth'];

      // Row 1: Place Value Headers
      const emptyH = document.createElement('div');
      this.vGrid.appendChild(emptyH);
      for (let c = totalCols - 1; c >= 0; c--) {
        const h = document.createElement('div');
        h.className = `v-col-header ${colClasses[c] || 'col-o'}`;
        const zh = this.voiceLang === 'zh' ? `<br><small>${colNamesZh[c] || ''}</small>` : '';
        h.innerHTML = `${colNamesEn[c] || ''}${zh}`;
        h.title = `${colNamesEn[c]} Column`;
        this.vGrid.appendChild(h);
      }

      // Row 2: Carry or Borrow indicator row
      const carryOp = document.createElement('div');
      carryOp.className = 'v-cell';
      carryOp.innerHTML = this.op === '+' 
        ? '<span style="font-size:0.75rem;font-weight:800;color:#f59e0b;">Carry</span>' 
        : '<span style="font-size:0.75rem;font-weight:800;color:#ef4444;">Borrow</span>';
      this.vGrid.appendChild(carryOp);

      for (let c = totalCols - 1; c >= 0; c--) {
        const cell = document.createElement('div');
        cell.className = 'v-carry-cell';
        cell.id = `vCarryCell_${c}`;
        cell.dataset.col = c;
        this.vGrid.appendChild(cell);
      }

      // Row 3: Number 1 row
      const n1Op = document.createElement('div');
      n1Op.className = 'v-cell';
      this.vGrid.appendChild(n1Op);

      const s1Digits = String(this.num1).split('').reverse().map(Number);
      for (let c = totalCols - 1; c >= 0; c--) {
        const cell = document.createElement('div');
        cell.className = 'v-digit-cell';
        cell.id = `vN1Cell_${c}`;
        cell.dataset.col = c;
        cell.dataset.val = s1Digits[c] !== undefined ? s1Digits[c] : '';
        cell.textContent = s1Digits[c] !== undefined ? s1Digits[c] : '';
        this.vGrid.appendChild(cell);
      }

      // Row 4: Operator & Number 2 row
      const opCell = document.createElement('div');
      opCell.className = 'v-op-cell';
      opCell.textContent = this.op;
      this.vGrid.appendChild(opCell);

      const s2Digits = String(this.num2).split('').reverse().map(Number);
      for (let c = totalCols - 1; c >= 0; c--) {
        const cell = document.createElement('div');
        cell.className = 'v-digit-cell';
        cell.id = `vN2Cell_${c}`;
        cell.dataset.col = c;
        cell.dataset.val = s2Digits[c] !== undefined ? s2Digits[c] : '';
        cell.textContent = s2Digits[c] !== undefined ? s2Digits[c] : '';
        this.vGrid.appendChild(cell);
      }

      // Row 5: Divider bar spanning all columns
      const divBar = document.createElement('div');
      divBar.className = 'v-divider-bar';
      this.vGrid.appendChild(divBar);

      // Row 6: Answer boxes
      const ansOp = document.createElement('div');
      ansOp.className = 'v-cell';
      ansOp.innerHTML = '=';
      ansOp.style.fontSize = '2rem';
      ansOp.style.fontWeight = '900';
      ansOp.style.color = '#8e24aa';
      ansOp.style.display = 'flex';
      ansOp.style.alignItems = 'center';
      ansOp.style.justifyContent = 'center';
      this.vGrid.appendChild(ansOp);

      for (let c = totalCols - 1; c >= 0; c--) {
        const cell = document.createElement('div');
        cell.className = 'v-ans-cell';
        cell.id = `vAnsCell_${c}`;
        cell.dataset.col = c;
        cell.textContent = '?';
        cell.style.cursor = 'pointer';
        cell.title = this.voiceLang === 'zh' ? '點擊編輯這個位數' : 'Click to edit this digit';
        cell.onclick = () => {
          this.vCurrentStepIndex = c;
          this.updateVerticalStep();
        };
        this.vGrid.appendChild(cell);
      }
    }

    clearKeypadHighlight() {
      document.querySelectorAll('.key-btn').forEach(b => b.classList.remove('guide-pulse'));
    }

    highlightKeypadKey(digit) {
      this.clearKeypadHighlight();
      const targetBtn = document.querySelector(`.key-num[data-val="${digit}"]`);
      if (targetBtn) {
        targetBtn.classList.add('guide-pulse');
      }
    }

    animateFlyingToken({ text, icon = '✨', fromEl, toEl, color = '#f59e0b', duration = 500, onComplete }) {
      if (!fromEl || !toEl) {
        if (onComplete) onComplete();
        return;
      }
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const startX = fromRect.left + fromRect.width / 2;
      const startY = fromRect.top + fromRect.height / 2;
      const endX = toRect.left + toRect.width / 2;
      const endY = toRect.top + toRect.height / 2;

      const token = document.createElement('div');
      token.className = 'flying-math-token';
      token.style.background = color;
      token.innerHTML = `<span>${icon}</span> <span>${text}</span>`;
      token.style.left = `${startX}px`;
      token.style.top = `${startY}px`;
      document.body.appendChild(token);
      this.activeFlyingToken = token;

      const midX = (startX + endX) / 2;
      const midY = Math.min(startY, endY) - 55;

      const keyframes = [
        { left: `${startX}px`, top: `${startY}px`, transform: 'translate(-50%, -50%) scale(0.6) rotate(0deg)', opacity: 0.2 },
        { left: `${startX}px`, top: `${startY}px`, transform: 'translate(-50%, -50%) scale(1.15) rotate(-6deg)', opacity: 1, offset: 0.2 },
        { left: `${midX}px`, top: `${midY}px`, transform: 'translate(-50%, -50%) scale(1.3) rotate(8deg)', opacity: 1, offset: 0.6 },
        { left: `${endX}px`, top: `${endY}px`, transform: 'translate(-50%, -50%) scale(0.9) rotate(0deg)', opacity: 1 }
      ];

      const anim = token.animate(keyframes, {
        duration,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        fill: 'forwards'
      });

      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        this.activeFlyingToken = null;
        token.remove();
        if (onComplete) onComplete();
      };

      anim.onfinish = done;
      setTimeout(done, duration + 50);
    }

    updateVerticalStep() {
      this.clearKeypadHighlight();
      if (this.pendingCarryResolver) {
        const resolveFn = this.pendingCarryResolver;
        this.pendingCarryResolver = null;
        resolveFn();
        return;
      }
      if (this.vGuideDetail && (!this.vSteps[this.vCurrentStepIndex] || !this.vSteps[this.vCurrentStepIndex].needsBorrow || !this.vBorrowed[this.vSteps[this.vCurrentStepIndex].col])) {
        this.vGuideDetail.innerHTML = '';
      }
      if (this.activeCarryBalloon) {
        this.activeCarryBalloon.remove();
        this.activeCarryBalloon = null;
      }
      if (this.pendingCarryTimer) {
        clearTimeout(this.pendingCarryTimer);
        this.pendingCarryTimer = null;
      }

      // Clear any remaining borrow wobble on all cells
      document.querySelectorAll('.v-digit-cell').forEach(c => {
        c.classList.remove('can-borrow-wobble');
        c.onclick = null;
      });

      this.vCurrentColInput = '';

      // Check if all steps have already been filled
      const allFilled = this.vSteps.every(s => this.vUserAnswers[s.col] !== undefined);
      if (allFilled) {
        document.querySelectorAll('.v-ans-cell').forEach(c => c.classList.remove('active-col'));
        if (this.keySubmit) {
          this.keySubmit.classList.add('ready');
          this.keySubmit.classList.add('guide-pulse');
        }
        const donePrompt = this.voiceLang === 'zh' ? '太棒了！請按 OK 送出答案！✅' : 'All digits entered! Press OK to check! ✅';
        this.setGuideText(donePrompt);
        this.setMascotMessage(donePrompt);
        this.clearKeypadHighlight();
        return;
      }

      if (this.keySubmit) {
        this.keySubmit.classList.remove('ready');
        this.keySubmit.classList.remove('guide-pulse');
      }

      if (this.vCurrentStepIndex >= this.vSteps.length) {
        this.vCurrentStepIndex = this.vSteps.length - 1;
      }

      const step = this.vSteps[this.vCurrentStepIndex];
      const colIdx = step.col;

      for (let c = 0; c < this.vSteps.length; c++) {
        const ansCell = document.getElementById(`vAnsCell_${c}`);
        if (ansCell) {
          ansCell.classList.toggle('active-col', c === colIdx);
          if (c === colIdx && !ansCell.classList.contains('filled')) {
            ansCell.classList.remove('has-val');
            ansCell.textContent = '?';
          }
        }
      }

      const colNames = ['Ones', 'Tens', 'Hundreds', 'Thousands', 'Ten Thousands'];
      const colNamesZh = ['個位', '十位', '百位', '千位', '萬位'];
      const colName = colNames[colIdx] || `Column ${colIdx}`;
      const colZh = colNamesZh[colIdx] || `${colIdx}位`;

      const isLastStep = (this.vSteps.filter(s => this.vUserAnswers[s.col] === undefined).length <= 1);
      const okSuffixZh = isLastStep ? '，再按 OK 送出答案！✅' : '！👉';
      const okSuffixEn = isLastStep ? ', then press OK to check! ✅' : '! 👉';

      if (this.op === '+') {
        let promptEn = '';
        let promptZh = '';
        if (step.d1 === 0 && step.d2 === 0 && step.inCarry > 0) {
          promptEn = `💡 ${colName} column: Bring down carry ${step.inCarry}! Tap ${step.writeDigit}${okSuffixEn}`;
          promptZh = `💡 ${colZh}：把進位的 ${step.inCarry} 寫下來！請按 ${step.writeDigit}${okSuffixZh}`;
        } else {
          const carryText = step.inCarry > 0 ? ` + ${step.inCarry} (carry)` : '';
          promptEn = `${colName} column: ${step.d1} + ${step.d2}${carryText} = ${step.sum}. Tap ${step.writeDigit}${okSuffixEn}`;
          promptZh = `${colZh}：${step.d1} 加 ${step.d2}${step.inCarry > 0 ? ` 加進位 ${step.inCarry}` : ''} 等於 ${step.sum}，請按 ${step.writeDigit}${okSuffixZh}`;
        }

        this.setGuideText(this.voiceLang === 'zh' ? promptZh : promptEn);
        if (this.vBorrowActionBtn) this.vBorrowActionBtn.classList.add('hidden');

        if (this.isGuideMode) {
          this.highlightKeypadKey(step.writeDigit);
        }
      } else {
        // Subtraction: Ning's Method
        if (step.needsBorrow && !this.vBorrowed[colIdx]) {
          const fromCol = step.borrowFromCol;
          const fromCell = document.getElementById(`vN1Cell_${fromCol}`);
          if (fromCell) {
            fromCell.classList.add('can-borrow-wobble');
            fromCell.title = this.voiceLang === 'zh' ? '點我借 10！' : 'Tap to borrow 10!';
            fromCell.onclick = () => {
              this.executeActiveBorrow();
            };
          }

          if (this.vBorrowActionBtn) {
            this.vBorrowActionBtn.classList.remove('hidden');
            this.vBorrowActionBtn.textContent = this.voiceLang === 'zh' ? '🤝 點我借 10！' : '🤝 Borrow 10!';
          }

          const promptEn = `💡 ${colName} column: ${step.origTop} is smaller than ${step.bot}! Tap the ${fromCell ? fromCell.textContent : 'number'} to borrow 10! 🤝`;
          const promptZh = `💡 ${colZh}：${step.origTop} 減不夠 ${step.bot}！請點擊十位的 ${fromCell ? fromCell.textContent : ''} 來借 10！🤝`;
          this.setGuideText(this.voiceLang === 'zh' ? promptZh : promptEn);

          const speakEn = `Let's borrow 10 from the next digit! Tap the number!`;
          const speakZh = `不夠減！請點一下十位的數字來借 10！`;
          if (this.isGuideMode) {
            this.speakText(this.voiceLang === 'zh' ? speakZh : speakEn);
          }
        } else if (step.needsBorrow && this.vBorrowed[colIdx]) {
          // Ning's 2-Step formula: 10 - bot = diff1, then diff1 + top = finalDiff
          this.renderNingBorrowBreakdown(step);
          if (this.vBorrowActionBtn) this.vBorrowActionBtn.classList.add('hidden');

          if (this.isGuideMode) {
            this.highlightKeypadKey(step.diff);
          }
        } else {
          // Direct subtraction without borrowing
          let promptEn = '';
          let promptZh = '';
          if (step.origTop !== step.activeTop) {
            promptEn = `${colName} column: ${step.origTop} − 1 (borrowed) = ${step.activeTop}, then ${step.activeTop} − ${step.bot} = ${step.diff}. Tap ${step.diff}${okSuffixEn}`;
            promptZh = `${colZh}：${step.origTop} 減去借走的 1 變成 ${step.activeTop}，${step.activeTop} 減 ${step.bot} 等於 ${step.diff}，請按 ${step.diff}${okSuffixZh}`;
          } else {
            promptEn = `${colName} column: ${step.activeTop} − ${step.bot} = ${step.diff}. Tap ${step.diff}${okSuffixEn}`;
            promptZh = `${colZh}：${step.activeTop} 減 ${step.bot} 等於 ${step.diff}，請按 ${step.diff}${okSuffixZh}`;
          }
          this.setGuideText(this.voiceLang === 'zh' ? promptZh : promptEn);
          if (this.vBorrowActionBtn) this.vBorrowActionBtn.classList.add('hidden');

          if (this.isGuideMode) {
            this.highlightKeypadKey(step.diff);
          }
        }
      }
    }

    renderNingBorrowBreakdown(step) {
      const tenMinusBot = step.tenMinusBot;
      const topNum = step.activeTop;
      const finalDiff = step.diff;

      const titleEn = "🌟 Ning's Trick: Borrow 10, Subtract Down First, Then Add Up!";
      const titleZh = "🌟 寧寧的絕招（借 10 先減下、再加頂）！";

      const html = `
        <div class="ning-borrow-card">
          <div class="ning-card-title">${this.voiceLang === 'zh' ? titleZh : titleEn}</div>
          <div class="ning-card-formula">
            <div class="ning-formula-step step-sub">
              <span class="formula-label">${this.voiceLang === 'zh' ? '① 先減下:' : '① Sub Down:'}</span>
              <span class="badge-ten">10</span> − <span class="badge-bot">${step.bot}</span> = <strong class="badge-res">${tenMinusBot}</strong>
            </div>
            <span class="ning-arrow">➡️</span>
            <div class="ning-formula-step step-add">
              <span class="formula-label">${this.voiceLang === 'zh' ? '② 再加頂:' : '② Add Top:'}</span>
              <strong class="badge-res">${tenMinusBot}</strong> + <span class="badge-top">${topNum}</span> = <strong class="badge-final">${finalDiff}</strong>
            </div>
          </div>
        </div>
      `;

      if (this.vGuideDetail) {
        this.vGuideDetail.innerHTML = html;
        if (this.vStepGuide) {
          this.vStepGuide.style.transform = 'scale(1.02)';
          setTimeout(() => { if (this.vStepGuide) this.vStepGuide.style.transform = ''; }, 200);
        }
      }

      const isLastStep = (this.vSteps.filter(s => this.vUserAnswers[s.col] === undefined).length <= 1);
      const okSuffixZh = isLastStep ? '，再按 OK 送出答案！✅' : '！👉';
      const okSuffixEn = isLastStep ? ', then press OK to check! ✅' : '! 👉';

      const guideMsg = this.voiceLang === 'zh'
        ? `🌟 寧寧的絕招（借 10 先減下、再加頂）：先算 10 − ${step.bot} = ${tenMinusBot}，再算 ${tenMinusBot} + ${topNum} = ${finalDiff}！請按 ${finalDiff}${okSuffixZh}`
        : `🌟 Ning's Rule: 10 − ${step.bot} = ${tenMinusBot}, then ${tenMinusBot} + ${topNum} = ${finalDiff}! Tap ${finalDiff}${okSuffixEn}`;
      this.setGuideText(guideMsg);

      const speakEn = isLastStep
        ? `Ning's method! 10 minus bottom ${step.bot} equals ${tenMinusBot}, then ${tenMinusBot} plus top ${topNum} equals ${finalDiff}! Tap ${finalDiff}, then press OK!`
        : `Ning's method! 10 minus bottom ${step.bot} equals ${tenMinusBot}, then ${tenMinusBot} plus top ${topNum} equals ${finalDiff}! Tap ${finalDiff}!`;
      const speakZh = isLastStep
        ? `寧寧的絕招！10 先減底下的 ${step.bot} 等於 ${tenMinusBot}，再加上面的 ${topNum} 等於 ${finalDiff}！請按 ${finalDiff}，再按 OK！`
        : `寧寧的絕招！10 先減底下的 ${step.bot} 等於 ${tenMinusBot}，再加上面的 ${topNum} 等於 ${finalDiff}！請按 ${finalDiff}！`;
      this.setMascotMessage(this.voiceLang === 'zh'
        ? `10 − ${step.bot} = ${tenMinusBot}，${tenMinusBot} + ${topNum} = ${finalDiff}！按 ${finalDiff}${okSuffixZh}`
        : `10 − ${step.bot} = ${tenMinusBot}, ${tenMinusBot} + ${topNum} = ${finalDiff}! Tap ${finalDiff}${okSuffixEn}`);

      if (this.isGuideMode) {
        this.speakText(this.voiceLang === 'zh' ? speakZh : speakEn);
      }
    }

    executeActiveBorrow() {
      const step = this.vSteps[this.vCurrentStepIndex];
      if (!step || !step.needsBorrow || this.vBorrowed[step.col]) return;

      this.vBorrowed[step.col] = true;
      if (this.vBorrowActionBtn) this.vBorrowActionBtn.classList.add('hidden');

      const fromCol = step.borrowFromCol;
      const fromCell = document.getElementById(`vN1Cell_${fromCol}`);
      const fromCarryCell = document.getElementById(`vCarryCell_${fromCol}`);
      const curCell = document.getElementById(`vN1Cell_${step.col}`);
      const curCarryCell = document.getElementById(`vCarryCell_${step.col}`);

      if (fromCell) {
        fromCell.classList.remove('can-borrow-wobble');
        fromCell.onclick = null;
        this.sound.playSwoosh();
      }

      // Put -1 on top of the next digit (in the Borrow row directly above it)
      if (fromCarryCell) {
        fromCarryCell.innerHTML = `<span class="v-borrow-badge borrow-minus">-1</span>`;
        fromCarryCell.style.border = 'none';
        fromCarryCell.classList.add('has-borrow-minus');
      }

      // If borrowing over zeros (e.g. 503 - 278), intermediate zeros become 9
      if (fromCol > step.col + 1) {
        for (let k = fromCol - 1; k > step.col; k--) {
          const midCarry = document.getElementById(`vCarryCell_${k}`);
          if (midCarry) {
            midCarry.innerHTML = `<span class="v-borrow-badge borrow-nine">9</span>`;
            midCarry.style.border = 'none';
            midCarry.classList.add('has-borrow-nine');
          }
        }
      }

      // Immediately update carry indicator (10 on current column) and Ning's breakdown card
      if (curCarryCell) {
        curCarryCell.innerHTML = `<span class="v-borrow-badge">10</span>`;
        curCarryCell.style.border = 'none';
        curCarryCell.classList.add('has-borrow-10');
      }
      this.renderNingBorrowBreakdown(step);
      if (this.isGuideMode) {
        this.highlightKeypadKey(step.diff);
      }

      // Live flying 10 coin animation from fromCell to curCell
      if (fromCell && curCell) {
        this.animateFlyingToken({
          text: '10',
          icon: '🪙',
          fromEl: fromCell,
          toEl: curCell,
          color: 'linear-gradient(135deg, #f59e0b, #ea580c)',
          onComplete: () => {
            this.sound.playSparkle();
            // Sparkle particles burst at target
            const rect = curCell.getBoundingClientRect();
            this.fx.sparkleAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
        });
      }
    }

    handleVerticalDigit(digit) {
      if (this.pendingCarryResolver) {
        const resolveFn = this.pendingCarryResolver;
        this.pendingCarryResolver = null;
        resolveFn();
      }
      if (this.vCurrentStepIndex >= this.vSteps.length) return;

      const step = this.vSteps[this.vCurrentStepIndex];

      // In subtraction, if borrow is needed but not yet done
      if (this.op === '−' && step.needsBorrow && !this.vBorrowed[step.col]) {
        this.sound.playTryAgainSound();
        const fromCol = step.borrowFromCol;
        const fromCell = document.getElementById(`vN1Cell_${fromCol}`);
        if (fromCell) {
          fromCell.style.transform = 'scale(1.25) rotate(6deg)';
          setTimeout(() => { if (fromCell) fromCell.style.transform = ''; }, 300);
        }
        const msg = this.voiceLang === 'zh' ? '請先點一下數字借 10 喔！🤝' : 'Tap the number to borrow 10 first! 🤝';
        this.setMascotMessage(msg);
        return;
      }

      this.sound.playKeyNote(digit);
      this.vUserAnswers[step.col] = Number(digit);

      const ansCell = document.getElementById(`vAnsCell_${step.col}`);
      if (ansCell) {
        ansCell.textContent = digit;
        ansCell.classList.add('filled');
        ansCell.classList.remove('has-val');
      }

      // Check if all columns are filled
      const allFilled = this.vSteps.every(s => this.vUserAnswers[s.col] !== undefined);

      if (allFilled) {
        // All digits entered! Light up OK button and wait for kid to press OK
        if (this.keySubmit) {
          this.keySubmit.classList.add('ready');
          this.keySubmit.classList.add('guide-pulse');
        }
        const checkMsg = this.voiceLang === 'zh' ? '太棒了！請按 OK 送出答案！✅' : 'All digits entered! Press OK to check! ✅';
        if (this.hintTextEl) this.hintTextEl.textContent = checkMsg;
        this.setMascotMessage(checkMsg);
        this.clearKeypadHighlight();
        if (this.mascotAvatar) {
          this.mascotAvatar.style.transform = 'scale(1.12) rotate(-5deg)';
          setTimeout(() => {
            if (this.mascotAvatar) this.mascotAvatar.style.transform = '';
          }, 180);
        }
        return;
      }

      // Interactive Addition Carrying with Flying Balloon
      if (this.op === '+' && step.nextCarry > 0) {
        const nextCarryCell = document.getElementById(`vCarryCell_${step.col + 1}`);
        const colNames = ['Ones', 'Tens', 'Hundreds', 'Thousands', 'Ten Thousands'];
        const colNamesZh = ['個位', '十位', '百位', '千位', '萬位'];
        const targetColName = colNames[step.col + 1] || 'next column';
        const targetColZh = colNamesZh[step.col + 1] || '下一位';

        if (this.activeCarryBalloon) {
          this.activeCarryBalloon.remove();
          this.activeCarryBalloon = null;
        }
        if (this.pendingCarryTimer) {
          clearTimeout(this.pendingCarryTimer);
          this.pendingCarryTimer = null;
        }

        if (nextCarryCell && ansCell) {
          nextCarryCell.classList.add('carry-target-pulse');

          const balloon = document.createElement('div');
          balloon.className = 'interactive-carry-balloon';
          balloon.innerHTML = `
            <span>🎈</span>
            <span>+${step.nextCarry}</span>
            <span class="carry-balloon-tip">${this.voiceLang === 'zh' ? '點我進位！' : 'Tap to Carry!'}</span>
          `;
          ansCell.style.position = 'relative';
          ansCell.appendChild(balloon);
          this.activeCarryBalloon = balloon;

          let carryFinished = false;
          const finishCarry = () => {
            if (carryFinished) return;
            carryFinished = true;
            this.pendingCarryResolver = null;
            if (this.pendingCarryTimer) {
              clearTimeout(this.pendingCarryTimer);
              this.pendingCarryTimer = null;
            }
            if (this.activeCarryBalloon) {
              this.activeCarryBalloon.remove();
              this.activeCarryBalloon = null;
            }
            if (this.activeFlyingToken) {
              this.activeFlyingToken.remove();
              this.activeFlyingToken = null;
            }

            nextCarryCell.classList.remove('carry-target-pulse');
            nextCarryCell.innerHTML = `<span class="v-carry-badge active">${step.nextCarry}</span>`;
            const r = nextCarryCell.getBoundingClientRect();
            this.fx.sparkleAt(r.left + r.width / 2, r.top + r.height / 2);

            this.advanceToNextUnfilledStep();
          };

          this.pendingCarryResolver = finishCarry;

          const flyBalloon = () => {
            if (carryFinished) return;
            if (this.pendingCarryTimer) {
              clearTimeout(this.pendingCarryTimer);
              this.pendingCarryTimer = null;
            }
            if (this.activeCarryBalloon) {
              this.activeCarryBalloon.remove();
              this.activeCarryBalloon = null;
            }

            this.sound.playCarryFlightSound();
            this.animateFlyingToken({
              text: `+${step.nextCarry}`,
              icon: '🎈',
              fromEl: ansCell,
              toEl: nextCarryCell,
              color: 'linear-gradient(135deg, #ec4899, #d946ef)',
              duration: 380,
              onComplete: () => {
                finishCarry();
              }
            });
          };

          balloon.onclick = (e) => {
            e.stopPropagation();
            flyBalloon();
          };
          nextCarryCell.onclick = (e) => {
            e.stopPropagation();
            flyBalloon();
          };

          const carryMsgEn = `💡 ${step.sum} is 10 or more! Carrying ${step.nextCarry} to the ${targetColName}! 🎈`;
          const carryMsgZh = `💡 ${step.sum} 超過 10 了！進位 ${step.nextCarry} 到${targetColZh}！🎈`;
          this.setGuideText(this.voiceLang === 'zh' ? carryMsgZh : carryMsgEn);

          this.pendingCarryTimer = setTimeout(() => {
            flyBalloon();
          }, 350);

          return;
        }
      }

      // No carry or subtraction: advance to next unfilled column
      this.advanceToNextUnfilledStep();
    }

    advanceToNextUnfilledStep() {
      // Find next unfilled step
      let nextIdx = -1;
      for (let i = this.vCurrentStepIndex + 1; i < this.vSteps.length; i++) {
        if (this.vUserAnswers[this.vSteps[i].col] === undefined) {
          nextIdx = i;
          break;
        }
      }
      if (nextIdx === -1) {
        for (let i = 0; i < this.vSteps.length; i++) {
          if (this.vUserAnswers[this.vSteps[i].col] === undefined) {
            nextIdx = i;
            break;
          }
        }
      }

      if (nextIdx !== -1) {
        this.vCurrentStepIndex = nextIdx;
        this.updateVerticalStep();
      } else {
        // All filled!
        if (this.keySubmit) {
          this.keySubmit.classList.add('ready');
          this.keySubmit.classList.add('guide-pulse');
        }
        const donePrompt = this.voiceLang === 'zh' ? '太棒了！請按 OK 送出答案！✅' : 'All digits entered! Press OK to check! ✅';
        if (this.hintTextEl) this.hintTextEl.textContent = donePrompt;
        this.setMascotMessage(donePrompt);
        this.clearKeypadHighlight();
      }
    }

    handleVerticalBackspace() {
      const step = this.vSteps[this.vCurrentStepIndex];
      if (!step) return;

      this.sound.playDelete();

      // If current cell has a filled digit, clear it
      if (this.vUserAnswers[step.col] !== undefined) {
        delete this.vUserAnswers[step.col];
        const ansCell = document.getElementById(`vAnsCell_${step.col}`);
        if (ansCell) {
          ansCell.textContent = '?';
          ansCell.classList.remove('filled');
        }
        if (this.keySubmit) {
          this.keySubmit.classList.remove('ready');
          this.keySubmit.classList.remove('guide-pulse');
        }
        this.updateVerticalStep();
        return;
      }

      // If current cell is already empty, step back to the previous column and clear it
      if (this.vCurrentStepIndex > 0) {
        this.vCurrentStepIndex--;
        const prevStep = this.vSteps[this.vCurrentStepIndex];
        delete this.vUserAnswers[prevStep.col];
        const prevAnsCell = document.getElementById(`vAnsCell_${prevStep.col}`);
        if (prevAnsCell) {
          prevAnsCell.textContent = '?';
          prevAnsCell.classList.remove('filled');
        }
        if (this.keySubmit) {
          this.keySubmit.classList.remove('ready');
          this.keySubmit.classList.remove('guide-pulse');
        }
        this.updateVerticalStep();
      }
    }

    checkVerticalAnswer() {
      if (this.celebrationModal.classList.contains('active') || this.sadModal.classList.contains('active')) {
        return;
      }

      // Check if all columns are filled
      const allFilled = this.vSteps.every(s => this.vUserAnswers[s.col] !== undefined);
      if (!allFilled) {
        const promptMsg = this.voiceLang === 'zh' ? '請先填完所有位數，再按 OK 喔！👆' : 'Please finish all digits, then press OK! 👆';
        if (this.hintTextEl) this.hintTextEl.textContent = promptMsg;
        this.setMascotMessage(promptMsg);
        this.sound.playPop();

        const firstUnfilled = this.vSteps.find(s => this.vUserAnswers[s.col] === undefined);
        if (firstUnfilled) {
          const emptyCell = document.getElementById(`vAnsCell_${firstUnfilled.col}`);
          if (emptyCell) {
            emptyCell.style.transform = 'scale(1.2)';
            setTimeout(() => { if (emptyCell) emptyCell.style.transform = ''; }, 300);
          }
        }
        return;
      }

      // Validate all columns
      let allCorrect = true;
      let firstWrongIdx = -1;

      for (let i = 0; i < this.vSteps.length; i++) {
        const s = this.vSteps[i];
        const expected = this.op === '+' ? s.writeDigit : s.diff;
        const userVal = this.vUserAnswers[s.col];

        if (userVal !== expected) {
          allCorrect = false;
          if (firstWrongIdx === -1) {
            firstWrongIdx = i;
          }
          const cell = document.getElementById(`vAnsCell_${s.col}`);
          if (cell) {
            cell.classList.add('wrong-shake');
            setTimeout(() => {
              if (cell) cell.classList.remove('wrong-shake');
            }, 600);
          }
        }
      }

      if (allCorrect) {
        // ALL DIGITS CORRECT! Celebrate once!
        if (this.keySubmit) {
          this.keySubmit.classList.remove('ready');
          this.keySubmit.classList.remove('guide-pulse');
        }
        this.completeVerticalProblem();
      } else {
        // One or more digits incorrect!
        this.sound.playTryAgainSound();
        const wrongStep = this.vSteps[firstWrongIdx];
        const colNamesZh = ['個位', '十位', '百位', '千位', '萬位'];
        const colNamesEn = ['Ones', 'Tens', 'Hundreds', 'Thousands', 'Ten Thousands'];
        const colZh = colNamesZh[wrongStep.col] || `${wrongStep.col}位`;
        const colEn = colNamesEn[wrongStep.col] || `Column ${wrongStep.col}`;

        const retryMsgZh = `檢查一下${colZh}喔！換個數字再試試看！💕`;
        const retryMsgEn = `Check the ${colEn} column! Try another number! 💕`;
        this.setMascotMessage(this.voiceLang === 'zh' ? retryMsgZh : retryMsgEn);
        if (this.hintTextEl) this.hintTextEl.textContent = this.voiceLang === 'zh' ? retryMsgZh : retryMsgEn;

        // Move active focus to the first wrong step and clear its value
        this.vCurrentStepIndex = firstWrongIdx;
        delete this.vUserAnswers[wrongStep.col];
        const wrongCell = document.getElementById(`vAnsCell_${wrongStep.col}`);
        if (wrongCell) {
          wrongCell.textContent = '?';
          wrongCell.classList.remove('filled');
        }
        if (this.keySubmit) {
          this.keySubmit.classList.remove('ready');
          this.keySubmit.classList.remove('guide-pulse');
        }
        this.updateVerticalStep();
      }
    }

    completeVerticalProblem() {
      this.sound.playCorrectFanfare();
      this.sound.playSparkle();

      this.score += 20;
      this.streak += 1;
      this.scoreValEl.textContent = this.score;

      this.updateStreakStars();
      this.updateComboBadge();
      this.spawnFloatingScore('+20 ⭐');

      const praise = this.voiceLang === 'zh' ? '太厲害了！直式運算全部答對！🎉👑' : 'Magnificent! You solved the vertical math! 🎉👑';
      this.setMascotMessage(praise);

      this.showCelebrationModal();
    }

    playVerticalDemo() {
      if (this.pendingCarryResolver) {
        const resolveFn = this.pendingCarryResolver;
        this.pendingCarryResolver = null;
        resolveFn();
      }
      // Toggle Interactive Guide Mode
      this.isGuideMode = !this.isGuideMode;
      if (this.vDemoBtn) {
        this.vDemoBtn.classList.toggle('active-guiding', this.isGuideMode);
        if (this.isGuideMode) {
          this.vDemoBtn.innerHTML = `<span>🪄</span> ${this.voiceLang === 'zh' ? '正在引導中... ✨' : 'Guide Mode ON! ✨'}`;
          this.sound.playSparkle();
          const welcome = this.voiceLang === 'zh' ? '皮普來手把手教你！看著提示點擊喔！🐰🌟' : "Pip is here to guide you step-by-step! Follow the glow! 🐰🌟";
          this.setMascotMessage(welcome);
          this.speakText(this.voiceLang === 'zh' ? '我是皮普，我們一起一步一步解開這題！' : "I am Pip, let's solve this together step-by-step!");
        } else {
          this.vDemoBtn.innerHTML = `<span>🪄</span> ${this.voiceLang === 'zh' ? '手把手引導我！' : 'Guide Me Step-by-Step!'}`;
          this.clearKeypadHighlight();
        }
      }
      this.updateVerticalStep();
    }

    setGuideText(msg) {
      if (this.vGuideText) {
        this.vGuideText.textContent = msg;
        if (this.vStepGuide) {
          this.vStepGuide.style.transform = 'scale(1.02)';
          setTimeout(() => { if (this.vStepGuide) this.vStepGuide.style.transform = ''; }, 200);
        }
      }
    }

    checkAnswer() {
      if (this.celebrationModal.classList.contains('active') || this.sadModal.classList.contains('active')) {
        return;
      }
      if (this.format === 'vertical') {
        this.checkVerticalAnswer();
        return;
      }
      if (!this.currentInput) {
        this.mysteryBoxEl.style.transform = 'scale(1.2)';
        this.hintTextEl.textContent = 'Please tap a number first! 👆';
        setTimeout(() => {
          this.mysteryBoxEl.style.transform = '';
          this.hintTextEl.textContent = 'Tap the number keys, then press OK! 👇';
        }, 600);
        this.sound.playPop();
        return;
      }

      const typedVal = parseInt(this.currentInput, 10);
      if (typedVal === this.answer) {
        // CORRECT!
        this.sound.playCorrectFanfare();
        this.sound.playSparkle();
        this.mysteryBoxEl.textContent = this.answer;

        this.score += 10;
        this.streak += 1;
        this.scoreValEl.textContent = this.score;

        this.updateStreakStars();
        this.updateComboBadge();
        this.spawnFloatingScore('+10 ⭐');
        this.setMascotMessage('Wooohoo! Incredible math hero! 🎉⭐');
        this.showCelebrationModal();
      } else {
        // WRONG!
        this.sound.playTryAgainSound();
        this.streak = 0;
        this.updateComboBadge();
        this.setMascotMessage('Don\'t worry! Pip believes in you! 💕');

        this.mysteryBoxEl.style.transform = 'translateX(-10px)';
        setTimeout(() => this.mysteryBoxEl.style.transform = 'translateX(10px)', 80);
        setTimeout(() => this.mysteryBoxEl.style.transform = 'translateX(-5px)', 160);
        setTimeout(() => this.mysteryBoxEl.style.transform = '', 240);

        this.showSadModal();
      }
    }

    setMascotMessage(msg) {
      if (!this.mascotBubble) return;
      this.mascotBubble.textContent = msg;
      this.mascotBubble.style.transform = 'scale(1.06)';
      setTimeout(() => {
        if (this.mascotBubble) this.mascotBubble.style.transform = '';
      }, 200);
    }

    updateComboBadge() {
      if (!this.comboBadge || !this.comboText) return;
      if (this.streak >= 2) {
        this.comboBadge.classList.remove('hidden');
        if (this.streak === 2) {
          this.comboText.textContent = '🔥 COMBO x2!';
        } else if (this.streak === 3) {
          this.comboText.textContent = '⚡ SUPER x3!';
        } else if (this.streak === 4) {
          this.comboText.textContent = '🚀 MEGA x4!';
        } else {
          this.comboText.textContent = `👑 GODLIKE x${this.streak}!`;
        }
        this.comboBadge.style.transform = 'scale(1.22)';
        setTimeout(() => {
          if (this.comboBadge) this.comboBadge.style.transform = '';
        }, 220);
      } else {
        this.comboBadge.classList.add('hidden');
      }
    }

    spawnFloatingScore(text) {
      const el = document.createElement('div');
      el.className = 'floating-score';
      el.textContent = text;
      const rect = this.scoreValEl ? this.scoreValEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: 80 };
      el.style.left = `${Math.max(16, rect.left - 10)}px`;
      el.style.top = `${rect.top}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }

    updateStreakStars() {
      const starSlots = this.starsTrayEl.querySelectorAll('.star-slot');
      const starIndex = (this.streak - 1) % 5;

      starSlots.forEach((slot, idx) => {
        if (idx <= starIndex) {
          slot.className = 'star-slot filled';
        } else {
          slot.className = 'star-slot empty';
        }
      });

      // Completed a streak of 5! Award trophy and unlock sticker!
      if (this.streak % 5 === 0) {
        this.trophies += 1;
        this.trophyCountEl.textContent = this.trophies;

        // Unlock next sticker
        if (this.unlockedStickers < 6) {
          this.unlockedStickers += 1;
          this.stickerCountEl.textContent = this.unlockedStickers;
          const lockedSticker = this.stickersRowEl.querySelector('.sticker-item.locked');
          if (lockedSticker) {
            lockedSticker.classList.remove('locked');
            lockedSticker.classList.add('unlocked');
          }
        }

        // Reset star slots with a glow
        setTimeout(() => {
          starSlots.forEach(slot => slot.className = 'star-slot empty');
        }, 1200);
      }
    }

    toEnglishWord(num) {
      const words = [
        'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen'
      ];
      return words[num] !== undefined ? words[num] : String(num);
    }

    toChineseWord(num) {
      const words = [
        '零', '一', '二', '三', '四', '五', '六', '七', '八', '九',
        '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八'
      ];
      return words[num] !== undefined ? words[num] : String(num);
    }

    getBestVoice(lang) {
      if (!('speechSynthesis' in window)) return null;
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return null;

      if (lang === 'zh') {
        const zhVoices = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith('zh'));
        const preferredZh = zhVoices.find(v => 
          v.lang === 'zh-TW' || 
          v.name.includes('Mei-Jia') || 
          v.name.includes('Ting-Ting') || 
          v.name.includes('HsiaoChen') || 
          v.name.includes('Hanhan') || 
          v.name.includes('Google 國語')
        );
        return preferredZh || zhVoices[0] || null;
      } else {
        const enVoices = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith('en'));
        const preferredEn = enVoices.find(v => 
          v.name.includes('Samantha') || 
          v.name.includes('Google US English') || 
          v.name.includes('Natural') || 
          v.name.includes('Zira') || 
          v.name.includes('Ava') || 
          v.name.includes('Victoria') || 
          v.name.includes('Alex') || 
          v.lang === 'en-US'
        );
        return preferredEn || enVoices[0] || null;
      }
    }

    showCelebrationModal() {
      // Pick random cheering animal
      const chosenAnimalIdx = Math.floor(Math.random() * this.animalElements.length);
      this.animalElements.forEach((el, idx) => {
        el.classList.toggle('active', idx === chosenAnimalIdx);
      });

      // Random praise text
      const praise = this.praisePhrases[Math.floor(Math.random() * this.praisePhrases.length)];
      this.praiseMessageEl.textContent = praise;
      this.praiseEquationEl.textContent = `${this.num1} ${this.op} ${this.num2} = ${this.answer}`;

      // Launch fireworks & flowers
      this.fx.launchCelebration();

      // Show modal
      this.celebrationModal.classList.add('active');

      // Speech praise if enabled (100% pure English or pure Chinese, never mixed!)
      if (this.sound.enabled && 'speechSynthesis' in window) {
        setTimeout(() => {
          if (this.voiceLang === 'zh') {
            const n1 = this.toChineseWord(this.num1);
            const n2 = this.toChineseWord(this.num2);
            const ans = this.toChineseWord(this.answer);
            const opWord = this.op === '+' ? '加' : '減';
            this.speakText(`太棒了！${n1} ${opWord} ${n2} 等於 ${ans}！`, 'zh');
          } else {
            const n1 = this.toEnglishWord(this.num1);
            const n2 = this.toEnglishWord(this.num2);
            const ans = this.toEnglishWord(this.answer);
            const opWord = this.op === '+' ? 'plus' : 'minus';
            this.speakText(`Super job! ${n1} ${opWord} ${n2} equals ${ans}!`, 'en');
          }
        }, 300);
      }
    }

    closeCelebration() {
      this.celebrationModal.classList.remove('active');
      this.fx.stop();
    }

    showSadModal() {
      if (this.format === 'horizontal') {
        if (this.op === '+') {
          this.sadHintEl.textContent = `Try counting the ${this.currentFruit.icon} ${this.currentFruit.name} together! You can do it! 💕`;
        } else {
          this.sadHintEl.textContent = `Start with ${this.num1} ${this.currentFruit.name} and count how many are left! 💕`;
        }
      } else {
        this.sadHintEl.textContent = this.voiceLang === 'zh'
          ? '一步一步看著提示算，你可以的！🌟'
          : 'Take it step-by-step column by column! You got this! 🌟';
      }

      this.sadModal.classList.add('active');

      if (this.sound.enabled && 'speechSynthesis' in window) {
        setTimeout(() => {
          if (this.format === 'horizontal') {
            if (this.voiceLang === 'zh') {
              this.speakText('差一點點！我們一起數水果再試一次！', 'zh');
            } else {
              this.speakText(`Almost! Let's count the fruit and try again!`, 'en');
            }
          } else {
            if (this.voiceLang === 'zh') {
              this.speakText('差一點點！看著提示再試一次！', 'zh');
            } else {
              this.speakText('Almost! Take it step-by-step and try again!', 'en');
            }
          }
        }, 200);
      }
    }

    closeSadModal() {
      this.sadModal.classList.remove('active');
      this.currentInput = '';
      this.mysteryBoxEl.textContent = '?';
      this.mysteryBoxEl.classList.remove('has-val');
      this.keySubmit.classList.remove('ready');
    }

    speakProblem() {
      if (this.voiceLang === 'zh') {
        const n1 = this.toChineseWord(this.num1);
        const n2 = this.toChineseWord(this.num2);
        const opWord = this.op === '+' ? '加' : '減';
        this.speakText(`請問 ${n1} ${opWord} ${n2} 等於多少？`, 'zh');
      } else {
        const n1 = this.toEnglishWord(this.num1);
        const n2 = this.toEnglishWord(this.num2);
        const opWord = this.op === '+' ? 'plus' : 'minus';
        this.speakText(`What is ${n1} ${opWord} ${n2}?`, 'en');
      }
    }

    speakText(text, customLang) {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92; // Friendly gentle pace for kids
      utterance.pitch = 1.12; // Cheerful higher pitch for children

      const lang = customLang || this.voiceLang || 'en';
      if (lang === 'zh') {
        utterance.lang = 'zh-TW';
      } else {
        utterance.lang = 'en-US';
      }

      const voice = this.getBestVoice(lang);
      if (voice) {
        utterance.voice = voice;
      }

      window.speechSynthesis.speak(utterance);
    }
  }

  function initGame() {
    if (!window.game) {
      window.game = new MathGame();
      console.log('🌟 Magic Math Adventure v4.3.1 ready!');
    }
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initGame);
  } else {
    initGame();
  }
})();
