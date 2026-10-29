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
      this.maxRange = 5; // 5, 10, 18
      this.num1 = 0;
      this.num2 = 0;
      this.op = '+';
      this.answer = 0;
      this.score = 0;
      this.streak = 0;
      this.trophies = 0;
      this.unlockedStickers = 0;
      this.showCounters = true;

      // Available fruits for counters
      this.fruitList = ['🍎', '🍓', '🍊', '🍌', '🍇', '🍒', '🍉', '🍍', '⭐', '🎈'];
      this.currentFruit = '🍎';

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
      this.choicesGridEl = document.getElementById('choicesGrid');
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
        this.visualHelpersEl.classList.toggle('hidden', !this.showCounters);
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

      // Range pills
      const rangePills = document.querySelectorAll('.range-pill');
      rangePills.forEach(pill => {
        pill.addEventListener('click', () => {
          rangePills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.maxRange = parseInt(pill.dataset.range, 10);
          this.sound.playPop();
          this.generateNewProblem();
        });
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
     * Generates an age-appropriate problem for 5-6 year olds:
     * - Single digit numbers
     * - In subtraction: ANSWER IS ALWAYS A POSITIVE NUMBER (a > b >= 0, so result >= 1)
     */
    generateNewProblem() {
      // Pick random fruit for counters
      this.currentFruit = this.fruitList[Math.floor(Math.random() * this.fruitList.length)];

      let activeOp = this.mode;
      if (activeOp === 'mix') {
        activeOp = Math.random() < 0.5 ? 'add' : 'sub';
      }

      if (activeOp === 'add') {
        this.op = '+';
        if (this.maxRange === 5) {
          // Sum up to 5, positive single digits
          this.answer = Math.floor(Math.random() * 4) + 2; // 2, 3, 4, 5
          this.num1 = Math.floor(Math.random() * (this.answer - 1)) + 1;
          this.num2 = this.answer - this.num1;
        } else if (this.maxRange === 10) {
          // Sum up to 10
          this.answer = Math.floor(Math.random() * 8) + 2; // 2 to 10
          this.num1 = Math.floor(Math.random() * (this.answer - 1)) + 1;
          this.num2 = this.answer - this.num1;
        } else {
          // Single digits up to 9 + 9 = 18
          this.num1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
          this.num2 = Math.floor(Math.random() * 9) + 1; // 1 to 9
          this.answer = this.num1 + this.num2;
        }
      } else {
        // Subtraction: STRICTLY POSITIVE RESULT (answer >= 1)
        this.op = '−';
        if (this.maxRange === 5) {
          // Num1 between 2 and 5
          this.num1 = Math.floor(Math.random() * 4) + 2; // 2, 3, 4, 5
          // Num2 is strictly less than Num1 so answer > 0
          this.num2 = Math.floor(Math.random() * (this.num1 - 1)) + 1; // 1 to num1-1
          this.answer = this.num1 - this.num2; // always >= 1
        } else if (this.maxRange === 10) {
          // Num1 between 3 and 9 (single digit)
          this.num1 = Math.floor(Math.random() * 7) + 3; // 3 to 9
          this.num2 = Math.floor(Math.random() * (this.num1 - 1)) + 1;
          this.answer = this.num1 - this.num2; // always >= 1
        } else {
          // Single digit subtraction (1 to 9)
          this.num1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
          this.num2 = Math.floor(Math.random() * (this.num1 - 1)) + 1;
          this.answer = this.num1 - this.num2; // always >= 1
        }
      }

      // Render problem to UI
      this.renderProblem();
      this.renderVisualCounters();
      this.renderChoices();
    }

    renderProblem() {
      this.num1El.textContent = this.num1;
      this.num2El.textContent = this.num2;
      this.opSymbolEl.textContent = this.op;
      this.mysteryBoxEl.textContent = '?';
      this.mysteryBoxEl.style.color = '#ffffff';

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
          item.textContent = this.currentFruit;
          item.title = `Count ${i + 1}`;
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
          item.textContent = this.currentFruit;
          item.title = `Count ${this.num1 + i + 1}`;
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
          item.textContent = this.currentFruit;

          if (i >= remaining) {
            // Crossed out
            item.classList.add('crossed-out');
            item.title = 'Taken away';
          } else {
            item.title = `Count remaining ${i + 1}`;
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

    renderChoices() {
      this.choicesGridEl.innerHTML = '';

      // Generate 4 distinct positive choices including correct answer
      const choices = new Set([this.answer]);
      const maxPossible = this.op === '+' ? 18 : Math.max(this.num1, 10);

      // Nearby plausible options (answer +- 1, +- 2, +- 3)
      const offsets = [-3, -2, -1, 1, 2, 3, -4, 4].sort(() => Math.random() - 0.5);
      for (const offset of offsets) {
        const cand = this.answer + offset;
        if (cand >= 1 && cand <= maxPossible) {
          choices.add(cand);
          if (choices.size === 4) break;
        }
      }

      // Safe fallback to guarantee 4 choices
      while (choices.size < 4) {
        const randomPick = Math.floor(Math.random() * maxPossible) + 1;
        choices.add(randomPick);
      }

      // Shuffle choices array
      const shuffled = Array.from(choices).sort(() => Math.random() - 0.5);

      shuffled.forEach(val => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = val;
        btn.addEventListener('click', () => this.handleChoice(val, btn));
        this.choicesGridEl.appendChild(btn);
      });
    }

    handleChoice(selectedVal, btn) {
      if (selectedVal === this.answer) {
        // CORRECT!
        this.sound.playCorrectFanfare();
        this.sound.playSparkle();
        this.mysteryBoxEl.textContent = this.answer;
        this.mysteryBoxEl.style.color = '#ffffff';

        this.score += 10;
        this.streak += 1;
        this.scoreValEl.textContent = this.score;

        this.updateStreakStars();
        this.showCelebrationModal();
      } else {
        // WRONG!
        this.sound.playTryAgainSound();
        btn.style.transform = 'translateX(-8px)';
        setTimeout(() => btn.style.transform = 'translateX(8px)', 80);
        setTimeout(() => btn.style.transform = 'translateX(-4px)', 160);
        setTimeout(() => btn.style.transform = '', 240);

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
        this.sadHintEl.textContent = `Try counting the ${this.currentFruit} fruits together! You can do it!`;
      } else {
        this.sadHintEl.textContent = `Start with ${this.num1} fruits and count how many are left! 💕`;
      }

      this.sadModal.classList.add('active');

      if (this.sound.enabled && 'speechSynthesis' in window) {
        setTimeout(() => {
          this.speakText(`Almost! Let's try again! You can do it!`);
        }, 200);
      }
    }

    closeSadModal() {
      this.sadModal.classList.remove('active');
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
