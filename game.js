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
  }

  // --- Visual Particles Engine (Fireworks & Flowers) ---
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

  // --- Main Game Controller ---
  class MathGame {
    constructor() {
      this.sound = new SoundEffects();
      this.fx = new FXEngine('fxCanvas');

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

      this.visualHelpersWrapper = document.getElementById('visualHelpersWrapper');
      this.helpersBadgeEl = document.getElementById('helpersBadge');
      this.visualHelpersEl = document.getElementById('visualHelpers');
      this.helperLeftEl = document.getElementById('helperLeft');
      this.helperRightEl = document.getElementById('helperRight');
      this.helperOpEl = document.getElementById('helperOp');
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
     * Generates additions of 2 single digit numbers (e.g. 9 + 8 = 17, 7 + 6 = 13)
     * In subtraction: ANSWER IS ALWAYS STRICTLY POSITIVE (a > b >= 1, result >= 1)
     */
    generateNewProblem() {
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
      this.helperLeftEl.innerHTML = '';
      this.helperRightEl.innerHTML = '';

      if (this.op === '+') {
        this.helperOpEl.textContent = '+';
        this.helperOpEl.style.display = 'block';

        // Left items
        for (let i = 0; i < this.num1; i++) {
          const item = document.createElement('span');
          item.className = 'helper-item';
          item.textContent = this.currentFruit.icon;
          item.title = `${this.currentFruit.name} ${i + 1}`;
          item.addEventListener('click', () => {
            this.sound.playPop();
            item.style.transform = 'scale(1.5) rotate(15deg)';
            setTimeout(() => item.style.transform = '', 200);
          });
          this.helperLeftEl.appendChild(item);
        }

        // Right items
        for (let i = 0; i < this.num2; i++) {
          const item = document.createElement('span');
          item.className = 'helper-item';
          item.textContent = this.currentFruit.icon;
          item.title = `${this.currentFruit.name} ${this.num1 + i + 1}`;
          item.addEventListener('click', () => {
            this.sound.playPop();
            item.style.transform = 'scale(1.5) rotate(15deg)';
            setTimeout(() => item.style.transform = '', 200);
          });
          this.helperRightEl.appendChild(item);
        }
      } else {
        // Subtraction: Show total num1 items, with num2 items crossed out
        this.helperOpEl.style.display = 'none';

        const remaining = this.num1 - this.num2;
        for (let i = 0; i < this.num1; i++) {
          const item = document.createElement('span');
          item.className = 'helper-item';
          item.textContent = this.currentFruit.icon;

          if (i >= remaining) {
            item.classList.add('crossed-out');
            item.title = 'Taken away';
          } else {
            item.title = `${this.currentFruit.name} ${i + 1}`;
          }

          item.addEventListener('click', () => {
            this.sound.playPop();
            item.style.transform = 'scale(1.4)';
            setTimeout(() => item.style.transform = '', 200);
          });
          this.helperLeftEl.appendChild(item);
        }
      }
    }

    handleDigit(digit) {
      if (this.celebrationModal.classList.contains('active') || this.sadModal.classList.contains('active')) {
        return;
      }
      // Maximum answer for 2 single-digit numbers is 9 + 9 = 18 (2 digits)
      if (this.currentInput.length >= 2) return;

      this.currentInput += digit;
      this.mysteryBoxEl.textContent = this.currentInput;
      this.mysteryBoxEl.classList.add('has-val');
      this.keySubmit.classList.add('ready');
      this.sound.playPop();
    }

    handleBackspace() {
      if (this.celebrationModal.classList.contains('active') || this.sadModal.classList.contains('active')) {
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
        this.sound.playPop();
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
        this.showCelebrationModal();
      } else {
        // WRONG!
        this.sound.playTryAgainSound();
        this.mysteryBoxEl.style.transform = 'translateX(-10px)';
        setTimeout(() => this.mysteryBoxEl.style.transform = 'translateX(10px)', 80);
        setTimeout(() => this.mysteryBoxEl.style.transform = 'translateX(-5px)', 160);
        setTimeout(() => this.mysteryBoxEl.style.transform = '', 240);

        this.showSadModal();
      }
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

      // Speech praise if enabled
      if (this.sound.enabled && 'speechSynthesis' in window) {
        setTimeout(() => {
          this.speakText(`Super job! ${this.num1} ${this.op === '+' ? 'plus' : 'minus'} ${this.num2} equals ${this.answer}!`);
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
          this.speakText(`Almost! Let's count the ${this.currentFruit.name} and try again!`);
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
      const opWord = this.op === '+' ? 'plus' : 'minus';
      const prompt = `What is ${this.num1} ${opWord} ${this.num2}?`;
      this.speakText(prompt);
    }

    speakText(text) {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Friendly gentle pace for kids
      utterance.pitch = 1.15; // Cheerful higher pitch for children
      window.speechSynthesis.speak(utterance);
    }
  }

  // Initialize once DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    window.game = new MathGame();
  });
})();
