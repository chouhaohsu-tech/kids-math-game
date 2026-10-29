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

      this.vProblem = null;
      this.vSteps = [];
      this.vCurrentStepIndex = 0;
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
          document.body.className = nextTheme.id;
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
          this.tabHorizontal.classList.add('active');
          if (this.tabVertical) this.tabVertical.classList.remove('active');
          if (this.digitSelector) this.digitSelector.classList.add('hidden');
          if (this.verticalCard) this.verticalCard.classList.add('hidden');
          if (this.equationCard) this.equationCard.classList.remove('hidden');
          if (this.visualHelpersWrapper && this.showCounters) this.visualHelpersWrapper.classList.remove('hidden');
          if (this.hintTextEl) this.hintTextEl.textContent = 'Tap the number keys, then press OK! 👇';
          this.sound.playPop();
          this.generateNewProblem();
        });
      }

      if (this.tabVertical) {
        this.tabVertical.addEventListener('click', () => {
          if (this.format === 'vertical') return;
          this.format = 'vertical';
          this.tabVertical.classList.add('active');
          if (this.tabHorizontal) this.tabHorizontal.classList.remove('active');
          if (this.digitSelector) this.digitSelector.classList.remove('hidden');
          if (this.verticalCard) this.verticalCard.classList.remove('hidden');
          if (this.equationCard) this.equationCard.classList.add('hidden');
          if (this.visualHelpersWrapper) this.visualHelpersWrapper.classList.add('hidden');
          if (this.hintTextEl) this.hintTextEl.textContent = 'Solve column by column starting from Ones! 👉';
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

      // Visual Counter Toggle
      this.visualToggleBtn.addEventListener('click', () => {
        this.showCounters = !this.showCounters;
        this.visualToggleBtn.classList.toggle('active', this.showCounters);
        if (this.visualHelpersWrapper) {
          this.visualHelpersWrapper.classList.toggle('hidden', !this.showCounters);
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
      this.vUserAnswers = {};
      this.vCarried = {};
      this.vBorrowed = {};
      this.vCurrentStepIndex = 0;
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
        let top = modTop[i];
        const bot = s2[i] || 0;
        let needsBorrow = false;
        let borrowFromCol = null;
        if (top < bot) {
          needsBorrow = true;
          let j = i + 1;
          while (j < modTop.length && modTop[j] === 0) j++;
          borrowFromCol = j;
          modTop[j] -= 1;
          for (let k = j - 1; k > i; k--) {
            modTop[k] += 9;
          }
          top += 10;
          modTop[i] = top;
        }
        steps.push({
          col: i,
          origTop: s1[i],
          currentTop: top,
          bot,
          diff: top - bot,
          needsBorrow,
          borrowFromCol
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
        this.vGrid.appendChild(cell);
      }
    }

    updateVerticalStep() {
      if (this.vCurrentStepIndex >= this.vSteps.length) {
        this.completeVerticalProblem();
        return;
      }

      const step = this.vSteps[this.vCurrentStepIndex];
      const colIdx = step.col;

      for (let c = 0; c < this.vSteps.length; c++) {
        const ansCell = document.getElementById(`vAnsCell_${c}`);
        if (ansCell) {
          ansCell.classList.toggle('active-col', c === colIdx);
        }
      }

      const colNames = ['Ones', 'Tens', 'Hundreds', 'Thousands', 'Ten Thousands'];
      const colNamesZh = ['個位', '十位', '百位', '千位', '萬位'];
      const colName = colNames[colIdx] || `Column ${colIdx}`;
      const colZh = colNamesZh[colIdx] || `${colIdx}位`;

      if (this.op === '+') {
        const carryText = step.inCarry > 0 ? ` + ${step.inCarry} (carry)` : '';
        const promptEn = `${colName} column: ${step.d1} + ${step.d2}${carryText} = ${step.sum}. Tap ${step.writeDigit}!`;
        const promptZh = `${colZh}：${step.d1} 加 ${step.d2}${step.inCarry > 0 ? ` 加進位 ${step.inCarry}` : ''} 等於 ${step.sum}，請按 ${step.writeDigit}！`;

        this.setGuideText(this.voiceLang === 'zh' ? promptZh : promptEn);
        if (this.vBorrowActionBtn) this.vBorrowActionBtn.classList.add('hidden');
      } else {
        if (step.needsBorrow && !this.vBorrowed[colIdx]) {
          const promptEn = `${colName} column: ${step.origTop} is smaller than ${step.bot}! Tap "Borrow 10" below! 🤝`;
          const promptZh = `${colZh}：${step.origTop} 小於 ${step.bot}，請點擊下方「借 10」按鈕！🤝`;
          this.setGuideText(this.voiceLang === 'zh' ? promptZh : promptEn);
          if (this.vBorrowActionBtn) {
            this.vBorrowActionBtn.classList.remove('hidden');
            this.vBorrowActionBtn.textContent = this.voiceLang === 'zh' ? '🤝 點我借 10！' : '🤝 Borrow 10!';
          }
        } else {
          const topVal = this.vBorrowed[colIdx] ? step.currentTop : step.origTop;
          const promptEn = `${colName} column: ${topVal} − ${step.bot} = ${step.diff}. Tap ${step.diff}!`;
          const promptZh = `${colZh}：${topVal} 減 ${step.bot} 等於 ${step.diff}，請按 ${step.diff}！`;
          this.setGuideText(this.voiceLang === 'zh' ? promptZh : promptEn);
          if (this.vBorrowActionBtn) this.vBorrowActionBtn.classList.add('hidden');
        }
      }
    }

    executeActiveBorrow() {
      const step = this.vSteps[this.vCurrentStepIndex];
      if (!step || !step.needsBorrow || this.vBorrowed[step.col]) return;

      this.vBorrowed[step.col] = true;
      if (this.vBorrowActionBtn) this.vBorrowActionBtn.classList.add('hidden');

      const fromCol = step.borrowFromCol;
      const fromCell = document.getElementById(`vN1Cell_${fromCol}`);
      if (fromCell) {
        fromCell.classList.add('struck-through');
        const subBadge = document.createElement('span');
        subBadge.className = 'v-sub-digit';
        const origVal = parseInt(fromCell.textContent, 10);
        subBadge.textContent = origVal - 1;
        fromCell.appendChild(subBadge);
      }

      const curCarryCell = document.getElementById(`vCarryCell_${step.col}`);
      if (curCarryCell) {
        curCarryCell.innerHTML = `<span class="v-borrow-badge">+10</span>`;
      }

      const curCell = document.getElementById(`vN1Cell_${step.col}`);
      if (curCell) {
        curCell.innerHTML = `<span style="color:#ef4444;font-size:0.9em;">${step.currentTop}</span>`;
      }

      this.sound.playSparkle();
      const colNames = ['Ones', 'Tens', 'Hundreds', 'Thousands'];
      const colZh = ['個位', '十位', '百位', '千位'];
      const msgEn = `Borrowed 1 ten! Now ${colNames[step.col]} has ${step.currentTop}!`;
      const msgZh = `成功借位！${colZh[step.col]} 現在有 ${step.currentTop}！`;
      this.setMascotMessage(this.voiceLang === 'zh' ? msgZh : msgEn);

      this.updateVerticalStep();
    }

    handleVerticalDigit(digit) {
      if (this.isDemoPlaying || this.vCurrentStepIndex >= this.vSteps.length) return;

      const step = this.vSteps[this.vCurrentStepIndex];
      const val = parseInt(digit, 10);

      if (this.op === '−' && step.needsBorrow && !this.vBorrowed[step.col]) {
        if (val === step.diff) {
          this.executeActiveBorrow();
        } else {
          this.sound.playTryAgainSound();
          if (this.vBorrowActionBtn) {
            this.vBorrowActionBtn.style.transform = 'scale(1.2)';
            setTimeout(() => { if (this.vBorrowActionBtn) this.vBorrowActionBtn.style.transform = ''; }, 300);
          }
          const msg = this.voiceLang === 'zh' ? '請先點擊「借 10」按鈕喔！🤝' : 'Tap "Borrow 10" first! 🤝';
          this.setMascotMessage(msg);
          return;
        }
      }

      const expectedDigit = this.op === '+' ? step.writeDigit : step.diff;

      if (val === expectedDigit) {
        this.sound.playKeyNote(digit);

        const ansCell = document.getElementById(`vAnsCell_${step.col}`);
        if (ansCell) {
          ansCell.textContent = val;
          ansCell.classList.add('filled');
        }
        this.vUserAnswers[step.col] = val;

        if (this.op === '+' && step.nextCarry > 0) {
          const nextCarryCell = document.getElementById(`vCarryCell_${step.col + 1}`);
          if (nextCarryCell) {
            nextCarryCell.textContent = step.nextCarry;
            nextCarryCell.classList.add('active-carry');
          }
          this.sound.playSparkle();
          const carryMsg = this.voiceLang === 'zh' ? `進位 ${step.nextCarry} 到下一位！✨` : `Carried ${step.nextCarry} to next column! ✨`;
          this.setMascotMessage(carryMsg);
        }

        this.vCurrentStepIndex++;
        this.updateVerticalStep();
      } else {
        this.sound.playTryAgainSound();
        const ansCell = document.getElementById(`vAnsCell_${step.col}`);
        if (ansCell) {
          ansCell.style.transform = 'translateX(-8px)';
          setTimeout(() => { if (ansCell) ansCell.style.transform = 'translateX(8px)'; }, 80);
          setTimeout(() => { if (ansCell) ansCell.style.transform = ''; }, 160);
        }
        const hint = this.voiceLang === 'zh' ? '再試試看這個位數！你可以的！💕' : 'Try this digit again! You got this! 💕';
        this.setMascotMessage(hint);
      }
    }

    handleVerticalBackspace() {
      if (this.isDemoPlaying || this.vCurrentStepIndex === 0) return;
      this.sound.playDelete();
      this.vCurrentStepIndex--;
      const step = this.vSteps[this.vCurrentStepIndex];
      const ansCell = document.getElementById(`vAnsCell_${step.col}`);
      if (ansCell) {
        ansCell.textContent = '?';
        ansCell.classList.remove('filled');
      }
      this.updateVerticalStep();
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
      if (this.isDemoPlaying) return;
      this.isDemoPlaying = true;
      this.vCurrentStepIndex = 0;
      this.vUserAnswers = {};
      this.vCarried = {};
      this.vBorrowed = {};

      this.renderVerticalGrid();

      const runStep = (idx) => {
        if (!this.isDemoPlaying || idx >= this.vSteps.length) {
          this.isDemoPlaying = false;
          this.completeVerticalProblem();
          return;
        }

        this.vCurrentStepIndex = idx;
        const step = this.vSteps[idx];

        if (this.op === '−' && step.needsBorrow && !this.vBorrowed[step.col]) {
          this.updateVerticalStep();
          setTimeout(() => {
            if (!this.isDemoPlaying) return;
            this.executeActiveBorrow();
            setTimeout(() => {
              if (!this.isDemoPlaying) return;
              this.handleVerticalDigit(String(step.diff));
              setTimeout(() => runStep(idx + 1), 1200);
            }, 1000);
          }, 800);
        } else {
          this.updateVerticalStep();
          setTimeout(() => {
            if (!this.isDemoPlaying) return;
            const digit = String(this.op === '+' ? step.writeDigit : step.diff);
            this.handleVerticalDigit(digit);
            setTimeout(() => runStep(idx + 1), 1200);
          }, 1000);
        }
      };

      runStep(0);
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
      if (this.op === '+') {
        this.sadHintEl.textContent = `Try counting the ${this.currentFruit.icon} ${this.currentFruit.name} together! You can do it! 💕`;
      } else {
        this.sadHintEl.textContent = `Start with ${this.num1} ${this.currentFruit.name} and count how many are left! 💕`;
      }

      this.sadModal.classList.add('active');

      if (this.sound.enabled && 'speechSynthesis' in window) {
        setTimeout(() => {
          if (this.voiceLang === 'zh') {
            this.speakText('差一點點！我們一起數水果再試一次！', 'zh');
          } else {
            this.speakText(`Almost! Let's count the fruit and try again!`, 'en');
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

  // Initialize once DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    window.game = new MathGame();
  });
})();
