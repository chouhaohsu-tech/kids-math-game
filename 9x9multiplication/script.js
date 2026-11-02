/**
 * ============================================================================
 * Ning's 9x9 Non-Repeating Multiplication Adventure (動物回家九九乘法表)
 * Built for Ning • Supports Story Mode & Test Mode • Bilingual (English / 繁體中文)
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
   * 1. ANIMAL FRIENDS & RAINBOW BAND DATA (1..9 matching the PDF)
   * -------------------------------------------------------------------------- */
  const ANIMALS = [
    null, // 1-indexed (1..9)
    {
      id: 1,
      emoji: '🐼',
      homeEmoji: '🎋',
      color: '#db7093',
      cellColor: '#e582a1',
      name: { en: 'Panda', zh: '小貓熊' },
      homeName: { en: 'Bamboo House', zh: '竹林小屋' },
      cheer: { en: 'Bamboo-tiful, Ning!', zh: '太棒了，Ning！' }
    },
    {
      id: 2,
      emoji: '🐰',
      homeEmoji: '🥕',
      color: '#c95f63',
      cellColor: '#d67175',
      name: { en: 'Bunny', zh: '小兔兔' },
      homeName: { en: 'Carrot Burrow', zh: '紅蘿蔔屋' },
      cheer: { en: 'Hop-hop hooray, Ning!', zh: '蹦蹦跳好棒喔！' }
    },
    {
      id: 3,
      emoji: '🐶',
      homeEmoji: '🦴',
      color: '#d8833b',
      cellColor: '#e4944e',
      name: { en: 'Puppy', zh: '小狗狗' },
      homeName: { en: 'Cozy Kennel', zh: '骨頭狗屋' },
      cheer: { en: 'Woof-woof! Awesome, Ning!', zh: '汪汪！Ning 真聰明！' }
    },
    {
      id: 4,
      emoji: '🐸',
      homeEmoji: '🪷',
      color: '#eab731',
      cellColor: '#f2c447',
      name: { en: 'Froggy', zh: '小青蛙' },
      homeName: { en: 'Lily Pad Pond', zh: '荷葉池塘' },
      cheer: { en: 'Ribbit! Great leap, Ning!', zh: '呱呱！跳得好遠！' }
    },
    {
      id: 5,
      emoji: '🐵',
      homeEmoji: '🍌',
      color: '#87aa48',
      cellColor: '#98b95b',
      name: { en: 'Monkey', zh: '小猴子' },
      homeName: { en: 'Banana Treehouse', zh: '香蕉樹屋' },
      cheer: { en: 'Ooh-ooh! Super smart, Ning!', zh: '吱吱！超級厲害！' }
    },
    {
      id: 6,
      emoji: '🐱',
      homeEmoji: '🧶',
      color: '#5d9b7e',
      cellColor: '#6ead8f',
      name: { en: 'Kitty', zh: '小花貓' },
      homeName: { en: 'Cozy Basket', zh: '毛線球屋' },
      cheer: { en: 'Purr-fect answer, Ning!', zh: '喵嗚！完全正確！' }
    },
    {
      id: 7,
      emoji: '🐧',
      homeEmoji: '🧊',
      color: '#4e9da6',
      cellColor: '#60b0b9',
      name: { en: 'Penguin', zh: '小企鵝' },
      homeName: { en: 'Snowy Igloo', zh: '冰雪小屋' },
      cheer: { en: 'Coolest math star, Ning!', zh: '太酷了，數學小達人！' }
    },
    {
      id: 8,
      emoji: '🐥',
      homeEmoji: '🪺',
      color: '#6a7aa6',
      cellColor: '#7c8cb8',
      name: { en: 'Chick', zh: '小黃雞' },
      homeName: { en: 'Warm Nest', zh: '溫暖鳥巢' },
      cheer: { en: 'Chirp-chirp! Brilliant, Ning!', zh: '啾啾！算得真快！' }
    },
    {
      id: 9,
      emoji: '🐷',
      homeEmoji: '🏡',
      color: '#ac517f',
      cellColor: '#bd6390',
      name: { en: 'Piggy', zh: '小粉豬' },
      homeName: { en: 'Berry Cottage', zh: '花園小木屋' },
      cheer: { en: 'Oink-oink! Incredible, Ning!', zh: '哼哼！Ning 太神啦！' }
    }
  ];

  /* --------------------------------------------------------------------------
   * 2. BILINGUAL UI DICTIONARY (English & Traditional Chinese)
   * -------------------------------------------------------------------------- */
  const I18N = {
    en: {
      appTitle: 'NON-REPEATING MULTIPLICATION TABLE',
      appSubtitle: "Ning's Animal Home Adventure • Take Every Animal Home!",
      modeStory: 'Story Mode',
      modeTest: 'Test Mode',
      langBtnLabel: '中文 / EN',
      selectorPrompt: '🐾 Animal Path:',
      allAnimalsPill: '🌈 All Paths',
      legendTitle: 'Square Numbers (Diagonal)',
      legendSubtitle: 'The Most Special Corner Stones!',
      hintBtn: 'Hint',
      rackTitle: '🏡 Animal Homes Reached',
      nextAnimalBtn: 'Next Animal Friend ➡️',
      playAgainBtn: 'Play Again 🔄',
      catWelcomeStory: (animalName, n) =>
        `Hi Ning! Let's take ${animalName} (#${n}) home! Start at the top of Column ${n}, go down to ${n}×${n}=${n * n}, then turn right along Row ${n}!`,
      catWelcomeTest:
        'Test Mode Challenge! Tap any box or follow the random prompt to complete all 36 multiplication boxes as fast as you can!',
      catCorrect: (cheer, r, c, ans) =>
        `${cheer} ${r} × ${c} = ${ans}!`,
      catWrong: (r, c) =>
        `Almost there, Ning! Try counting ${r} groups of ${c}, or tap Hint 💡!`,
      catSquareClick: (n) =>
        `${n} × ${n} = ${n * n} is a special Square Number Corner! The animal turns right here toward its home!`,
      journeyTitle: (animalName, n) => `${animalName}'s L-Path Home (#${n})`,
      journeyDesc: (n) =>
        `Top of Col ${n} ⬇️ Corner (${n}×${n}=${n * n}) ➡️ End of Row ${n} Home!`,
      activeStepLabel: (animalEmoji, animalName) => `${animalEmoji} ${animalName}'s Step`,
      testChallengeLabel: '⚡ Speed Challenge',
      hintFormula: (r, c, sumStr) => `${r} groups of ${c} = ${sumStr}`,
      hintFromPrev: (prevVal, addVal, r, c) =>
        `Previous box is ${prevVal} → ${prevVal} + ${addVal} = ?  (${r} groups of ${c})`,
      celebSingleTitle: (animalName) => `Yay Ning! ${animalName} is Home!`,
      celebSingleSub: (n) => `You completed the entire #${n} multiplication path!`,
      celebAllTitle: '🏆 AMAZING NING! ALL 9 ANIMALS ARE HOME! 🏆',
      celebAllSub: (timeStr, mistakes) =>
        `You mastered the entire 9×9 Non-Repeating Multiplication Table! Time: ${timeStr} • Mistakes: ${mistakes}`
    },
    zh: {
      appTitle: '不重複九九乘法大冒險',
      appSubtitle: 'Ning 的動物回家之旅 • 帶領每隻小動物平安回家！',
      modeStory: '故事模式',
      modeTest: '測驗挑戰',
      langBtnLabel: 'EN / 中文',
      selectorPrompt: '🐾 選擇小動物路線：',
      allAnimalsPill: '🌈 全部顯示',
      legendTitle: '平方數（對角線轉角）',
      legendSubtitle: '最特別的轉彎魔法石！',
      hintBtn: '小提示',
      rackTitle: '🏡 已平安回家的小動物',
      nextAnimalBtn: '幫助下一隻小動物 ➡️',
      playAgainBtn: '再玩一次 🔄',
      catWelcomeStory: (animalName, n) =>
        `嗨 Ning！我們帶${animalName}（數字 ${n}）回家吧！從第 ${n} 直行最上方出發，往下走到轉角 ${n}×${n}=${n * n}，再往右走完第 ${n} 橫列就到家囉！`,
      catWelcomeTest:
        '測驗挑戰模式開始！請算出每一格的乘法答案，看看 Ning 能不能把 36 個空格全部填滿，帶所有動物回家！',
      catCorrect: (cheer, r, c, ans) =>
        `${cheer} ${r} × ${c} = ${ans}！`,
      catWrong: (r, c) =>
        `差一點點喔 Ning！想想看 ${r} 個 ${c} 相加是多少，或點一下「小提示 💡」！`,
      catSquareClick: (n) =>
        `${n} × ${n} = ${n * n} 是對角線上的「平方數轉角石」！小動物走到這裡會向右轉彎回家喔！`,
      journeyTitle: (animalName, n) => `${animalName}的 L 型回家路線（數字 ${n}）`,
      journeyDesc: (n) =>
        `第 ${n} 行頂端出發 ⬇️ 平方數轉角 (${n}×${n}=${n * n}) ➡️ 第 ${n} 列最右邊的家！`,
      activeStepLabel: (animalEmoji, animalName) => `${animalEmoji} ${animalName}的步伐`,
      testChallengeLabel: '⚡ 隨機跳題挑戰',
      hintFormula: (r, c, sumStr) => `${r} 個 ${c} 相加 = ${sumStr}`,
      hintFromPrev: (prevVal, addVal, r, c) =>
        `上一格是 ${prevVal} → ${prevVal} + ${addVal} = ? （${r} 個 ${c} 相加）`,
      celebSingleTitle: (animalName) => `太棒了 Ning！${animalName}平安到家囉！`,
      celebSingleSub: (n) => `妳完成了數字 ${n} 的整條 L 型乘法路線！`,
      celebAllTitle: '🏆 太神啦 Ning！9 隻小動物全部平安回家！ 🏆',
      celebAllSub: (timeStr, mistakes) =>
        `妳已經完全學會不重複九九乘法表囉！完成時間：${timeStr} • 錯誤次數：${mistakes}`
    }
  };

  /* Traditional Chinese Multiplication Chant (九九乘法口訣) */
  const ZH_DIGITS = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  function getChineseFormulaChant(r, c, ans) {
    const a = Math.min(r, c);
    const b = Math.max(r, c);
    if (ans < 10) {
      return `${ZH_DIGITS[a]}${ZH_DIGITS[b]}得${ZH_DIGITS[ans]}`;
    }
    const tens = Math.floor(ans / 10);
    const ones = ans % 10;
    const ansWords =
      (tens === 1 ? '十' : `${ZH_DIGITS[tens]}十`) +
      (ones > 0 ? ZH_DIGITS[ones] : '');
    return `${ZH_DIGITS[a]}${ZH_DIGITS[b]}${ansWords}`;
  }

  /* --------------------------------------------------------------------------
   * 3. GAME STATE
   * -------------------------------------------------------------------------- */
  const state = {
    lang: 'en',              // 'en' | 'zh'
    mode: 'story',           // 'story' | 'test'
    soundEnabled: true,
    activeAnimal: 1,         // 1..9 or 0 for 'all'
    selectedCell: null,      // { r, c }
    typedValue: '',          // current digits entered for selectedCell
    showHintDots: false,
    score: 0,
    mistakes: 0,
    solvedMap: {},           // key "r-c" -> boolean (true if solved; r===c always true)
    celebratedAnimals: {},   // animalId (1..9) -> boolean
    timerSeconds: 0,
    timerInterval: null,
    testQueue: []            // randomized cell queue for Test Mode
  };

  /* --------------------------------------------------------------------------
   * 4. WEB AUDIO SYNTHESIZER & VOICE ENGINE (Zero External Audio Dependencies)
   * -------------------------------------------------------------------------- */
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Glockenspiel scale notes for keypad keys 0..9
  const KEY_FREQS = {
    '1': 523.25, // C5
    '2': 587.33, // D5
    '3': 659.25, // E5
    '4': 698.46, // F5
    '5': 783.99, // G5
    '6': 880.00, // A5
    '7': 987.77, // B5
    '8': 1046.50, // C6
    '9': 1174.66, // D6
    '0': 493.88  // B4
  };

  function playTone(freq, type = 'sine', duration = 0.18, startTimeOffset = 0, gainVal = 0.18) {
    if (!state.soundEnabled) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime + startTimeOffset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  function playKeyNote(keyStr) {
    const freq = KEY_FREQS[keyStr] || 600;
    playTone(freq, 'triangle', 0.16, 0, 0.16);
  }

  function playCorrectChime() {
    // Cheerful ascending major arpeggio + animal chirp
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, idx) => {
      playTone(f, 'triangle', 0.22, idx * 0.065, 0.2);
    });
  }

  function playAnimalHomeFanfare() {
    // Grand triumphant fanfare when an animal reaches its home!
    const melody = [
      { f: 523.25, t: 0.0, d: 0.14 },
      { f: 659.25, t: 0.11, d: 0.14 },
      { f: 783.99, t: 0.22, d: 0.14 },
      { f: 1046.5, t: 0.34, d: 0.35 },
      { f: 880.0,  t: 0.52, d: 0.15 },
      { f: 1046.5, t: 0.66, d: 0.45 }
    ];
    melody.forEach((n) => playTone(n.f, 'triangle', n.d, n.t, 0.24));
  }

  function playWrongBoing() {
    if (!state.soundEnabled) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(135, now + 0.26);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  function speakText(text) {
    if (!state.soundEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = state.lang === 'zh' ? 'zh-TW' : 'en-US';
      utter.rate = 1.0;
      utter.pitch = 1.12;
      window.speechSynthesis.speak(utter);
    } catch (_) {
      // Ignore speech synthesis errors on restricted browsers
    }
  }

  /* --------------------------------------------------------------------------
   * 5. L-PATH GEOMETRY & ANIMAL JOURNEY LOGIC
   * --------------------------------------------------------------------------
   * For Animal N (1..9):
   * - Starts at Top of Column N: [1, N], [2, N], ..., [N, N] (going DOWN Column N)
   * - Turns 90° right at the Square Number Corner [N, N]
   * - Continues across Row N: [N, N+1], [N, N+2], ..., [N, 9] (going RIGHT along Row N)
   * - Reaches Animal N's Home at the right end of Row N!
   */
  function getAnimalLPath(n) {
    const steps = [];
    // Part 1: Down Column n from row 1 to row n
    for (let r = 1; r <= n; r++) {
      steps.push({ r, c: n, isCorner: r === n, dir: r === n ? 'corner' : 'down' });
    }
    // Part 2: Right along Row n from col n+1 to col 9
    for (let c = n + 1; c <= 9; c++) {
      steps.push({ r: n, c, isCorner: false, dir: 'right' });
    }
    return steps;
  }

  function isCellSolved(r, c) {
    if (r === c) return true; // Diagonal square numbers are pre-filled at start!
    return !!state.solvedMap[`${r}-${c}`];
  }

  function isAnimalPathComplete(n) {
    const path = getAnimalLPath(n);
    return path.every((step) => isCellSolved(step.r, step.c));
  }

  /**
   * Returns how far along its L-path Animal `n` can walk contiguously from the top!
   * If all steps are solved, returns 'HOME'.
   * Otherwise returns the last contiguous solved step before the first unsolved cell,
   * or 'TOP' if the very first cell [1, n] is not solved yet.
   */
  function getAnimalCurrentStop(n) {
    const path = getAnimalLPath(n);
    let lastSolvedStep = null;
    for (let i = 0; i < path.length; i++) {
      const step = path[i];
      if (isCellSolved(step.r, step.c)) {
        lastSolvedStep = step;
      } else {
        break;
      }
    }
    if (isAnimalPathComplete(n)) {
      return { type: 'HOME', n };
    }
    if (!lastSolvedStep) {
      return { type: 'TOP', n };
    }
    return { type: 'CELL', r: lastSolvedStep.r, c: lastSolvedStep.c, n };
  }

  /**
   * Finds the first unsolved cell along Animal `n`'s L-path.
   */
  function getNextUnsolvedInAnimalPath(n) {
    const path = getAnimalLPath(n);
    for (const step of path) {
      if (!isCellSolved(step.r, step.c)) {
        return { r: step.r, c: step.c };
      }
    }
    return null;
  }

  /**
   * Determines which band color (1..9) a cell [r, c] belongs to in the PDF poster:
   * Notice in the PDF:
   * - Column c has color c from row 1 down to the diagonal (r <= c).
   * Specifically, each column c in the upper triangle is colored with `--band-c`!
   */
  function getCellBandIndex(r, c) {
    return c;
  }

  /* --------------------------------------------------------------------------
   * 6. DOM REFERENCES & INITIALIZATION
   * -------------------------------------------------------------------------- */
  const dom = {
    appTitle: document.getElementById('appTitle'),
    appSubtitle: document.getElementById('appSubtitle'),
    btnModeStory: document.getElementById('btnModeStory'),
    btnModeTest: document.getElementById('btnModeTest'),
    labelModeStory: document.getElementById('labelModeStory'),
    labelModeTest: document.getElementById('labelModeTest'),
    homesCountText: document.getElementById('homesCountText'),
    scoreText: document.getElementById('scoreText'),
    timerPill: document.getElementById('timerPill'),
    timerText: document.getElementById('timerText'),
    btnLang: document.getElementById('btnLang'),
    langLabel: document.getElementById('langLabel'),
    btnVoice: document.getElementById('btnVoice'),
    btnSound: document.getElementById('btnSound'),
    soundIcon: document.getElementById('soundIcon'),
    btnReset: document.getElementById('btnReset'),
    animalSelectorBar: document.getElementById('animalSelectorBar'),
    selectorPrompt: document.getElementById('selectorPrompt'),
    animalPillsContainer: document.getElementById('animalPillsContainer'),
    boardFrame: document.getElementById('boardFrame'),
    triangleGrid: document.getElementById('triangleGrid'),
    walkerLayer: document.getElementById('walkerLayer'),
    journeyGuideCard: document.getElementById('journeyGuideCard'),
    journeyAnimalAvatar: document.getElementById('journeyAnimalAvatar'),
    journeyTitle: document.getElementById('journeyTitle'),
    journeyDesc: document.getElementById('journeyDesc'),
    journeyStepsTrack: document.getElementById('journeyStepsTrack'),
    catSpeechText: document.getElementById('catSpeechText'),
    teacherCatBtn: document.getElementById('teacherCatBtn'),
    legendTitle: document.getElementById('legendTitle'),
    legendSubtitle: document.getElementById('legendSubtitle'),
    activeAnimalBadge: document.getElementById('activeAnimalBadge'),
    btnHint: document.getElementById('btnHint'),
    labelHint: document.getElementById('labelHint'),
    eqFactorA: document.getElementById('eqFactorA'),
    eqFactorB: document.getElementById('eqFactorB'),
    eqAnswerBox: document.getElementById('eqAnswerBox'),
    visualHintBox: document.getElementById('visualHintBox'),
    hintFormulaText: document.getElementById('hintFormulaText'),
    visualDotsGrid: document.getElementById('visualDotsGrid'),
    keypadGrid: document.getElementById('keypadGrid'),
    rackTitle: document.getElementById('rackTitle'),
    rackProgressPct: document.getElementById('rackProgressPct'),
    homesMiniRack: document.getElementById('homesMiniRack'),
    celebrationOverlay: document.getElementById('celebrationOverlay'),
    celebAnimalEmoji: document.getElementById('celebAnimalEmoji'),
    celebTitle: document.getElementById('celebTitle'),
    celebSubtitle: document.getElementById('celebSubtitle'),
    celebPathBadges: document.getElementById('celebPathBadges'),
    btnCelebContinue: document.getElementById('btnCelebContinue'),
    fxCanvas: document.getElementById('fxCanvas')
  };

  /* --------------------------------------------------------------------------
   * 7. BUILD THE 9x9 TRIANGLE GRID & ANIMAL DOCKS
   * -------------------------------------------------------------------------- */
  function buildBoardDOM() {
    dom.triangleGrid.innerHTML = '';

    // --- ROW 0: Top Animal Starting Docks (Columns 1..9) ---
    for (let c = 1; c <= 9; c++) {
      const animal = ANIMALS[c];
      const dock = document.createElement('div');
      dock.className = 'top-animal-dock';
      dock.id = `topDock-${c}`;
      dock.style.gridRow = '1';
      dock.style.gridColumn = String(c + 1);
      dock.title = `${animal.name[state.lang]} (#${c})`;
      dock.innerHTML = `
        <div class="top-animal-avatar" style="border-color: ${animal.color}">${animal.emoji}</div>
        <span class="top-start-arrow">▼</span>
      `;
      dock.addEventListener('click', () => selectAnimalPath(c));
      dom.triangleGrid.appendChild(dock);
    }

    // --- ROW 1: Top Column Number Header Circles (Columns 1..9) ---
    for (let c = 1; c <= 9; c++) {
      const wrap = document.createElement('div');
      wrap.className = 'header-circle-wrap';
      wrap.style.gridRow = '2';
      wrap.style.gridColumn = String(c + 1);
      wrap.innerHTML = `<div id="colHeader-${c}" class="num-circle band-${c}">${c}</div>`;
      wrap.addEventListener('click', () => selectAnimalPath(c));
      dom.triangleGrid.appendChild(wrap);
    }

    // --- ROWS 1..9 (Grid Rows 3..11): Left Row Number + Upper Triangle Cells + Right Animal Home ---
    for (let r = 1; r <= 9; r++) {
      const gridRowIdx = r + 2;

      // Column 0 (Grid Col 1): Left Row Number Circle
      const rowWrap = document.createElement('div');
      rowWrap.className = 'header-circle-wrap';
      rowWrap.style.gridRow = String(gridRowIdx);
      rowWrap.style.gridColumn = '1';
      rowWrap.innerHTML = `<div id="rowHeader-${r}" class="num-circle band-${r}">${r}</div>`;
      rowWrap.addEventListener('click', () => selectAnimalPath(r));
      dom.triangleGrid.appendChild(rowWrap);

      // Columns r..9: The Non-Repeating Upper-Right Triangle Cells!
      for (let c = r; c <= 9; c++) {
        const cell = document.createElement('div');
        const bandIdx = getCellBandIndex(r, c);
        const isDiag = r === c;
        cell.id = `cell-${r}-${c}`;
        cell.className = [
          'tri-cell',
          `band-${bandIdx}`,
          r === 1 ? 'row-first' : '',
          c === 9 ? 'col-last' : '',
          isDiag ? 'is-diagonal solved-cell' : 'empty-cell'
        ]
          .filter(Boolean)
          .join(' ');

        cell.style.gridRow = String(gridRowIdx);
        cell.style.gridColumn = String(c + 1);
        cell.dataset.r = String(r);
        cell.dataset.c = String(c);

        if (isDiag) {
          // Pre-filled Square Number on the Diagonal (1, 4, 9, 16, 25, 36, 49, 64, 81)
          const sqVal = r * c;
          cell.innerHTML = `
            <div class="diagonal-dashed-box" title="${r} × ${c} = ${sqVal}">
              <span>${sqVal}</span>
              <span class="diagonal-crown">⭐</span>
            </div>
          `;
          cell.addEventListener('click', () => onDiagonalCellClick(r));
        } else {
          // Interactive Blank Box for Ning to fill in
          cell.innerHTML = `
            <div class="cell-input-box" id="cellBox-${r}-${c}">
              <span class="cell-mini-label">${r}×${c}</span>
            </div>
          `;
          cell.addEventListener('click', () => selectCell(r, c));
        }

        dom.triangleGrid.appendChild(cell);
      }

      // Column 10 (Grid Col 11): Right-Side Animal Home for Row r!
      const animal = ANIMALS[r];
      const homeCell = document.createElement('div');
      homeCell.className = 'right-animal-home';
      homeCell.id = `rightHome-${r}`;
      homeCell.style.gridRow = String(gridRowIdx);
      homeCell.style.gridColumn = '11';
      homeCell.title = `${animal.name[state.lang]}'s ${animal.homeName[state.lang]}`;
      homeCell.innerHTML = `
        <div class="home-badge-card">
          <span class="home-animal-icon">${animal.emoji}</span>
          <span class="home-house-icon">${animal.homeEmoji}</span>
        </div>
      `;
      homeCell.addEventListener('click', () => selectAnimalPath(r));
      dom.triangleGrid.appendChild(homeCell);
    }

    // Create the floating walking animal sprite inside walkerLayer
    dom.walkerLayer.innerHTML = `
      <div id="activeWalkerSprite" class="walking-animal-sprite">
        <span id="walkerEmoji">🐼</span>
        <div id="walkerCheerBubble" class="walker-cheer-bubble hidden">Yay!</div>
      </div>
    `;
  }

  /* --------------------------------------------------------------------------
   * 8. RENDER & UPDATE FUNCTIONS
   * -------------------------------------------------------------------------- */
  function buildAnimalSelectorPills() {
    dom.animalPillsContainer.innerHTML = '';

    for (let n = 1; n <= 9; n++) {
      const animal = ANIMALS[n];
      const done = isAnimalPathComplete(n);
      const isActive = state.mode === 'story' && state.activeAnimal === n;

      const btn = document.createElement('button');
      btn.className = [
        'animal-pill-btn',
        isActive ? 'active' : '',
        done ? 'completed' : ''
      ]
        .filter(Boolean)
        .join(' ');

      if (isActive) {
        btn.style.backgroundColor = animal.color;
        btn.style.borderColor = animal.color;
      }

      btn.innerHTML = `
        <span>${animal.emoji}</span>
        <span>#${n} ${animal.name[state.lang]}</span>
        ${done ? '<span class="pill-check">🏡✅</span>' : ''}
      `;
      btn.addEventListener('click', () => selectAnimalPath(n));
      dom.animalPillsContainer.appendChild(btn);
    }

    // "All Paths" button
    const allBtn = document.createElement('button');
    const isAllActive = state.mode === 'test' || state.activeAnimal === 0;
    allBtn.className = `animal-pill-btn ${isAllActive ? 'active' : ''}`;
    if (isAllActive) {
      allBtn.style.backgroundColor = '#5c6bc0';
      allBtn.style.borderColor = '#3949ab';
    }
    allBtn.innerHTML = `<span>${I18N[state.lang].allAnimalsPill}</span>`;
    allBtn.addEventListener('click', () => {
      state.activeAnimal = 0;
      refreshBoardVisuals();
    });
    dom.animalPillsContainer.appendChild(allBtn);
  }

  function buildHomesMiniRack() {
    dom.homesMiniRack.innerHTML = '';
    let homeCount = 0;
    for (let n = 1; n <= 9; n++) {
      const done = isAnimalPathComplete(n);
      if (done) homeCount++;
      const slot = document.createElement('div');
      slot.className = `mini-home-slot ${done ? 'home-safe' : ''}`;
      slot.title = `${ANIMALS[n].name[state.lang]} (#${n})`;
      slot.innerHTML = `
        <span>${ANIMALS[n].emoji}</span>
        <span class="slot-num">${n}</span>
      `;
      slot.addEventListener('click', () => selectAnimalPath(n));
      dom.homesMiniRack.appendChild(slot);
    }
    dom.homesCountText.textContent = `${homeCount} / 9`;
    dom.rackProgressPct.textContent = `${homeCount} / 9`;
  }

  function refreshBoardVisuals() {
    const t = I18N[state.lang];
    dom.appTitle.textContent = t.appTitle;
    dom.appSubtitle.textContent = t.appSubtitle;
    dom.labelModeStory.textContent = t.modeStory;
    dom.labelModeTest.textContent = t.modeTest;
    dom.langLabel.textContent = t.langBtnLabel;
    dom.selectorPrompt.textContent = t.selectorPrompt;
    dom.legendTitle.textContent = t.legendTitle;
    dom.legendSubtitle.textContent = t.legendSubtitle;
    dom.labelHint.textContent = t.hintBtn;
    dom.rackTitle.textContent = t.rackTitle;
    dom.scoreText.textContent = String(state.score);

    buildAnimalSelectorPills();
    buildHomesMiniRack();

    // Determine active L-path set if a specific animal (1..9) is highlighted
    const activeN = state.mode === 'story' ? state.activeAnimal : 0;
    const activePathSet = new Set();
    if (activeN >= 1 && activeN <= 9) {
      getAnimalLPath(activeN).forEach((s) => activePathSet.add(`${s.r}-${s.c}`));
    }

    // Update top docks & right homes
    for (let n = 1; n <= 9; n++) {
      const topDock = document.getElementById(`topDock-${n}`);
      const rightHome = document.getElementById(`rightHome-${n}`);
      const done = isAnimalPathComplete(n);

      if (topDock) {
        topDock.classList.toggle('active-path', activeN === n);
        topDock.classList.toggle('is-home', done);
      }
      if (rightHome) {
        rightHome.classList.toggle('active-path', activeN === n);
        rightHome.classList.toggle('reached-home', done);
      }
    }

    // Update every cell in the upper-right triangle
    for (let r = 1; r <= 9; r++) {
      for (let c = r; c <= 9; c++) {
        const cell = document.getElementById(`cell-${r}-${c}`);
        if (!cell) continue;
        const key = `${r}-${c}`;
        const solved = isCellSolved(r, c);
        const isSelected =
          state.selectedCell && state.selectedCell.r === r && state.selectedCell.c === c;
        const onPath = activePathSet.has(key);

        cell.classList.toggle('selected-cell', !!isSelected);
        cell.classList.toggle('on-active-path', onPath);
        cell.classList.toggle('dimmed-cell', activeN > 0 && !onPath);

        if (r !== c) {
          cell.classList.toggle('solved-cell', solved);
          cell.classList.toggle('empty-cell', !solved);
          const box = document.getElementById(`cellBox-${r}-${c}`);
          if (box) {
            if (solved) {
              box.innerHTML = `
                <span>${r * c}</span>
                ${onPath ? '<span class="step-paw-badge">🐾</span>' : ''}
              `;
            } else if (isSelected) {
              box.innerHTML = `<span>${state.typedValue !== '' ? state.typedValue : '?'}</span>`;
            } else {
              box.innerHTML = `<span class="cell-mini-label">${r}×${c}</span>`;
            }
          }
        }
      }
    }

    // Highlight current row/col header circles for selectedCell
    for (let i = 1; i <= 9; i++) {
      const rHead = document.getElementById(`rowHeader-${i}`);
      const cHead = document.getElementById(`colHeader-${i}`);
      if (rHead) {
        rHead.classList.toggle('highlight-factor', !!(state.selectedCell && state.selectedCell.r === i));
      }
      if (cHead) {
        cHead.classList.toggle('highlight-factor', !!(state.selectedCell && state.selectedCell.c === i));
      }
    }

    updateJourneyCardAndWalker();
    updateSidebarQuestionCard();
  }

  /* --------------------------------------------------------------------------
   * 9. UPDATE FLOATING WALKER SPRITE & JOURNEY PROGRESS TRACKER
   * -------------------------------------------------------------------------- */
  function updateJourneyCardAndWalker() {
    const t = I18N[state.lang];
    const walker = document.getElementById('activeWalkerSprite');
    const walkerEmoji = document.getElementById('walkerEmoji');

    // Determine which animal to display in the Journey Tracker & Walker
    let focusAnimal = state.activeAnimal;
    if (focusAnimal === 0 && state.selectedCell) {
      focusAnimal = state.selectedCell.r;
    }
    if (!focusAnimal || focusAnimal < 1 || focusAnimal > 9) {
      focusAnimal = 2;
    }

    const animal = ANIMALS[focusAnimal];
    dom.journeyAnimalAvatar.textContent = animal.emoji;
    dom.journeyTitle.textContent = t.journeyTitle(animal.name[state.lang], focusAnimal);
    dom.journeyDesc.textContent = t.journeyDesc(focusAnimal);

    // Build step bubbles along the L-path
    const path = getAnimalLPath(focusAnimal);
    dom.journeyStepsTrack.innerHTML = '';
    path.forEach((step) => {
      const solved = isCellSolved(step.r, step.c);
      const isCurrent =
        state.selectedCell &&
        state.selectedCell.r === step.r &&
        state.selectedCell.c === step.c;
      const span = document.createElement('span');
      span.className = [
        'step-dot',
        solved ? 'done' : '',
        step.isCorner ? 'corner' : '',
        isCurrent ? 'current' : ''
      ]
        .filter(Boolean)
        .join(' ');
      span.textContent = solved ? `${step.r * step.c}` : `${step.r}×${step.c}`;
      span.addEventListener('click', () => {
        if (!step.isCorner) selectCell(step.r, step.c);
      });
      dom.journeyStepsTrack.appendChild(span);
    });

    // Position the floating animal walker sprite on the board!
    if (!walker || !walkerEmoji) return;
    walkerEmoji.textContent = animal.emoji;
    walker.style.borderColor = animal.color;

    const stopInfo = getAnimalCurrentStop(focusAnimal);
    let targetEl = null;
    if (stopInfo.type === 'HOME') {
      targetEl = document.getElementById(`rightHome-${focusAnimal}`);
    } else if (stopInfo.type === 'TOP') {
      targetEl = document.getElementById(`topDock-${focusAnimal}`);
    } else {
      targetEl = document.getElementById(`cell-${stopInfo.r}-${stopInfo.c}`);
    }

    if (targetEl && dom.boardFrame) {
      const boardRect = dom.boardFrame.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      if (boardRect.width > 0 && targetRect.width > 0) {
        if (stopInfo.type === 'CELL') {
          // Place the animal avatar in the top-left corner of the cell so it NEVER blocks the number!
          const cornerX = targetRect.left - boardRect.left + 8;
          const cornerY = targetRect.top - boardRect.top + 8;
          walker.style.left = `${cornerX}px`;
          walker.style.top = `${cornerY}px`;
        } else {
          const centerX = targetRect.left - boardRect.left + targetRect.width / 2;
          const centerY = targetRect.top - boardRect.top + targetRect.height / 2;
          walker.style.left = `${centerX}px`;
          walker.style.top = `${centerY}px`;
        }
      }
    }
  }

  function triggerWalkerCelebration(cheerText) {
    const walker = document.getElementById('activeWalkerSprite');
    const bubble = document.getElementById('walkerCheerBubble');
    if (!walker) return;
    walker.classList.remove('celebrating');
    void walker.offsetWidth; // reflow
    walker.classList.add('celebrating');

    if (bubble && cheerText) {
      bubble.textContent = cheerText;
      bubble.classList.remove('hidden');
      setTimeout(() => bubble.classList.add('hidden'), 1600);
    }
  }

  /* --------------------------------------------------------------------------
   * 10. UPDATE RIGHT SIDEBAR QUESTION CARD & VISUAL GROUPING HINT
   * -------------------------------------------------------------------------- */
  function updateSidebarQuestionCard() {
    const t = I18N[state.lang];
    const sel = state.selectedCell;
    if (!sel) return;

    const { r, c } = sel;
    const animalForStep =
      state.activeAnimal >= 1 && state.activeAnimal <= 9
        ? ANIMALS[state.activeAnimal]
        : ANIMALS[r];

    dom.activeAnimalBadge.textContent =
      state.mode === 'test'
        ? t.testChallengeLabel
        : t.activeStepLabel(animalForStep.emoji, animalForStep.name[state.lang]);

    dom.eqFactorA.textContent = String(r);
    dom.eqFactorA.className = `eq-num band-${r}`;
    dom.eqFactorB.textContent = String(c);
    dom.eqFactorB.className = `eq-num band-${c}`;
    dom.eqAnswerBox.textContent = state.typedValue !== '' ? state.typedValue : '?';

    // Repeated addition / grouping formula hint
    const repeatedTerms = Array(r).fill(c).join(' + ');
    if (c - 1 >= r && isCellSolved(r, c - 1)) {
      dom.hintFormulaText.textContent = t.hintFromPrev(r * (c - 1), r, r, c);
    } else if (r > 1 && isCellSolved(r - 1, c)) {
      dom.hintFormulaText.textContent = t.hintFromPrev((r - 1) * c, c, r, c);
    } else {
      dom.hintFormulaText.textContent = t.hintFormula(r, c, repeatedTerms);
    }

    // Build visual group pills when in Story Mode or when Hint is toggled
    dom.visualDotsGrid.innerHTML = '';
    if (state.mode === 'story' || state.showHintDots) {
      dom.visualHintBox.classList.remove('hidden');
      for (let g = 1; g <= r; g++) {
        const pill = document.createElement('div');
        pill.className = 'dot-group-pill';
        const dots = '⭐'.repeat(Math.min(c, 5)) + (c > 5 ? `+${c - 5}` : '');
        pill.textContent = `${c} (${dots})`;
        dom.visualDotsGrid.appendChild(pill);
      }
    } else {
      dom.visualHintBox.classList.add('hidden');
    }
  }

  /* --------------------------------------------------------------------------
   * 11. INTERACTION HANDLERS: SELECT ANIMAL, SELECT CELL, ENTER DIGITS
   * -------------------------------------------------------------------------- */
  function selectAnimalPath(n) {
    state.activeAnimal = n;
    const t = I18N[state.lang];
    const animal = ANIMALS[n];
    dom.catSpeechText.textContent = t.catWelcomeStory(animal.name[state.lang], n);

    // Pick the first unsolved cell along Animal n's L-path
    const nextCell = getNextUnsolvedInAnimalPath(n);
    if (nextCell) {
      state.selectedCell = nextCell;
      state.typedValue = '';
    }
    refreshBoardVisuals();
  }

  function onDiagonalCellClick(n) {
    const t = I18N[state.lang];
    dom.catSpeechText.textContent = t.catSquareClick(n);
    playKeyNote(String(n));
    selectAnimalPath(n);
  }

  function selectCell(r, c) {
    if (r === c) {
      onDiagonalCellClick(r);
      return;
    }
    state.selectedCell = { r, c };
    state.typedValue = '';
    state.showHintDots = false;

    // If in Story Mode and the clicked cell isn't on the active animal's L-path,
    // smoothly switch to the animal whose path contains this cell!
    if (state.mode === 'story' && state.activeAnimal > 0) {
      const activeN = state.activeAnimal;
      if (r !== activeN && c !== activeN) {
        state.activeAnimal = c;
      }
    }

    playKeyNote(String(c));
    refreshBoardVisuals();
  }

  function handleDigitInput(digitStr) {
    if (!state.selectedCell) return;
    const { r, c } = state.selectedCell;
    if (isCellSolved(r, c)) return;

    playKeyNote(digitStr);

    const expectedAnswer = r * c;
    const expectedDigits = String(expectedAnswer).length;

    if (state.typedValue.length < 2) {
      state.typedValue += digitStr;
    } else {
      state.typedValue = digitStr;
    }

    refreshBoardVisuals();

    // Auto-check immediately once the child enters the required number of digits (1 or 2 digits)!
    if (state.typedValue.length >= expectedDigits) {
      setTimeout(() => checkCurrentAnswer(), 110);
    }
  }

  function handleBackspace() {
    if (!state.selectedCell) return;
    state.typedValue = state.typedValue.slice(0, -1);
    playTone(360, 'sine', 0.1, 0, 0.12);
    refreshBoardVisuals();
  }

  function checkCurrentAnswer() {
    if (!state.selectedCell || state.typedValue === '') return;
    const { r, c } = state.selectedCell;
    const expected = r * c;
    const entered = parseInt(state.typedValue, 10);
    const t = I18N[state.lang];

    if (entered === expected) {
      // CORRECT ANSWER!
      state.solvedMap[`${r}-${c}`] = true;
      state.score += 10;
      state.typedValue = '';

      playCorrectChime();

      const cellEl = document.getElementById(`cell-${r}-${c}`);
      if (cellEl) {
        cellEl.classList.remove('just-solved');
        void cellEl.offsetWidth;
        cellEl.classList.add('just-solved');
        const rect = cellEl.getBoundingClientRect();
        spawnConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 26);
      }

      // Determine active animal to cheer
      const cheeringAnimalIdx =
        state.activeAnimal >= 1 && state.activeAnimal <= 9 ? state.activeAnimal : c;
      const cheeringAnimal = ANIMALS[cheeringAnimalIdx];
      const cheerMsg = cheeringAnimal.cheer[state.lang];
      dom.catSpeechText.textContent = t.catCorrect(cheerMsg, r, c, expected);

      // Voice encouragement (Chinese chant or English multiplication)
      if (state.lang === 'zh') {
        speakText(`${getChineseFormulaChant(r, c, expected)}！`);
      } else {
        speakText(`${r} times ${c} is ${expected}!`);
      }

      refreshBoardVisuals();
      triggerWalkerCelebration( state.lang === 'zh' ? '好棒！🎉' : 'Yay! 🎉' );

      // Check if any animal just completed its entire L-path home!
      checkNewlyCompletedAnimalHomes();

      // Advance to the next empty cell
      advanceToNextTargetCell();
    } else {
      // GENTLE MISTAKE FEEDBACK
      state.mistakes += 1;
      state.showHintDots = true;
      playWrongBoing();

      const cellEl = document.getElementById(`cell-${r}-${c}`);
      if (cellEl) {
        cellEl.classList.remove('wrong-shake');
        void cellEl.offsetWidth;
        cellEl.classList.add('wrong-shake');
        setTimeout(() => cellEl.classList.remove('wrong-shake'), 520);
      }

      dom.catSpeechText.textContent = t.catWrong(r, c);
      state.typedValue = '';
      refreshBoardVisuals();
    }
  }

  /* --------------------------------------------------------------------------
   * 12. ANIMAL HOME COMPLETION & CELEBRATION OVERLAY
   * -------------------------------------------------------------------------- */
  function checkNewlyCompletedAnimalHomes() {
    // Check if all 36 cells are solved
    const allNineComplete = [1, 2, 3, 4, 5, 6, 7, 8, 9].every((n) => isAnimalPathComplete(n));

    for (let n = 1; n <= 9; n++) {
      if (isAnimalPathComplete(n) && !state.celebratedAnimals[n]) {
        state.celebratedAnimals[n] = true;
        state.score += 25;

        if (!allNineComplete) {
          setTimeout(() => showAnimalHomeCelebration(n, false), 450);
          return;
        }
      }
    }

    if (allNineComplete) {
      stopTimer();
      setTimeout(() => showAnimalHomeCelebration(9, true), 450);
    }
  }

  function showAnimalHomeCelebration(animalIdx, isGrandFinale) {
    const t = I18N[state.lang];
    const animal = ANIMALS[animalIdx];

    playAnimalHomeFanfare();
    spawnConfettiBurst(window.innerWidth / 2, window.innerHeight / 3, isGrandFinale ? 90 : 48);

    dom.celebAnimalEmoji.textContent = isGrandFinale ? '🐼🐰🐶🐸🐵🐱🐧🐥🐷' : animal.emoji;
    dom.celebTitle.textContent = isGrandFinale
      ? t.celebAllTitle
      : t.celebSingleTitle(animal.name[state.lang]);
    dom.celebSubtitle.textContent = isGrandFinale
      ? t.celebAllSub(formatTime(state.timerSeconds), state.mistakes)
      : t.celebSingleSub(animalIdx);

    // Show all facts along this animal's L-path
    dom.celebPathBadges.innerHTML = '';
    const path = getAnimalLPath(animalIdx);
    path.forEach((step) => {
      const badge = document.createElement('span');
      badge.className = 'celeb-fact-pill';
      badge.textContent = `${step.r}×${step.c}=${step.r * step.c}`;
      dom.celebPathBadges.appendChild(badge);
    });

    dom.btnCelebContinue.textContent = isGrandFinale ? t.playAgainBtn : t.nextAnimalBtn;
    dom.btnCelebContinue.onclick = () => {
      dom.celebrationOverlay.classList.add('hidden');
      if (isGrandFinale) {
        resetGame();
      } else {
        // Move to the next animal that isn't home yet
        for (let nextN = 1; nextN <= 9; nextN++) {
          if (!isAnimalPathComplete(nextN)) {
            selectAnimalPath(nextN);
            break;
          }
        }
      }
    };

    dom.celebrationOverlay.classList.remove('hidden');
  }

  function advanceToNextTargetCell() {
    if (state.mode === 'story' && state.activeAnimal >= 1 && state.activeAnimal <= 9) {
      const nextInPath = getNextUnsolvedInAnimalPath(state.activeAnimal);
      if (nextInPath) {
        state.selectedCell = nextInPath;
        refreshBoardVisuals();
        return;
      }
      // If active animal's path is finished, pick the next animal with unsolved steps
      for (let n = 1; n <= 9; n++) {
        const candidate = getNextUnsolvedInAnimalPath(n);
        if (candidate) {
          state.activeAnimal = n;
          state.selectedCell = candidate;
          refreshBoardVisuals();
          return;
        }
      }
    } else {
      // Test Mode: pull next unsolved cell from shuffled testQueue
      while (state.testQueue.length > 0) {
        const next = state.testQueue.shift();
        if (!isCellSolved(next.r, next.c)) {
          state.selectedCell = next;
          refreshBoardVisuals();
          return;
        }
      }
      // Fallback scan if queue exhausted
      for (let r = 1; r <= 9; r++) {
        for (let c = r + 1; c <= 9; c++) {
          if (!isCellSolved(r, c)) {
            state.selectedCell = { r, c };
            refreshBoardVisuals();
            return;
          }
        }
      }
    }
  }

  /* --------------------------------------------------------------------------
   * 13. MODE SWITCHING, TIMER & RESET
   * -------------------------------------------------------------------------- */
  function buildShuffledTestQueue() {
    const cells = [];
    for (let r = 1; r <= 9; r++) {
      for (let c = r + 1; c <= 9; c++) {
        if (!isCellSolved(r, c)) {
          cells.push({ r, c });
        }
      }
    }
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    state.testQueue = cells;
  }

  function setGameMode(mode) {
    state.mode = mode;
    dom.btnModeStory.classList.toggle('active', mode === 'story');
    dom.btnModeTest.classList.toggle('active', mode === 'test');
    dom.timerPill.classList.toggle('hidden', mode !== 'test');

    const t = I18N[state.lang];
    if (mode === 'story') {
      stopTimer();
      // Find first animal with unsolved steps ( note: Animal 1 starts at [1,1] and goes across row 1: 1x2..1x9 )
      let startAnimal = 1;
      for (let n = 1; n <= 9; n++) {
        if (!isAnimalPathComplete(n)) {
          startAnimal = n;
          break;
        }
      }
      selectAnimalPath(startAnimal);
    } else {
      state.activeAnimal = 0;
      buildShuffledTestQueue();
      dom.catSpeechText.textContent = t.catWelcomeTest;
      startTimer();
      advanceToNextTargetCell();
    }
    refreshBoardVisuals();
  }

  function startTimer() {
    stopTimer();
    state.timerSeconds = 0;
    dom.timerText.textContent = '00:00';
    state.timerInterval = setInterval(() => {
      state.timerSeconds += 1;
      dom.timerText.textContent = formatTime(state.timerSeconds);
    }, 1000);
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function resetGame() {
    state.solvedMap = {};
    state.celebratedAnimals = {};
    state.score = 0;
    state.mistakes = 0;
    state.typedValue = '';
    state.showHintDots = false;
    buildBoardDOM();
    setGameMode(state.mode);
  }

  /* --------------------------------------------------------------------------
   * 14. CANVAS CONFETTI & STAR PARTICLE ENGINE
   * -------------------------------------------------------------------------- */
  const particles = [];
  let animFrameId = null;

  function resizeCanvas() {
    if (!dom.fxCanvas) return;
    dom.fxCanvas.width = window.innerWidth;
    dom.fxCanvas.height = window.innerHeight;
  }

  function spawnConfettiBurst(x, y, count = 30) {
    resizeCanvas();
    const colors = ['#ff5252', '#ffca28', '#66bb6a', '#29b6f6', '#ab47bc', '#ff7043'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 3 + Math.random() * 7;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 6 + Math.random() * 6,
        color: colors[i % colors.length],
        alpha: 1,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2
      });
    }
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(stepParticles);
    }
  }

  function stepParticles() {
    const ctx = dom.fxCanvas.getContext('2d');
    ctx.clearRect(0, 0, dom.fxCanvas.width, dom.fxCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.rot += p.vRot;
      p.alpha -= 0.016;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      ctx.restore();
    }

    if (particles.length > 0) {
      animFrameId = requestAnimationFrame(stepParticles);
    } else {
      animFrameId = null;
    }
  }

  /* --------------------------------------------------------------------------
   * 15. EVENT LISTENERS (KEYPAD, PHYSICAL KEYBOARD, TOOLBAR BUTTONS)
   * -------------------------------------------------------------------------- */
  function bindEvents() {
    // Keypad buttons
    dom.keypadGrid.querySelectorAll('.key-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (key === 'BACK') {
          handleBackspace();
        } else if (key === 'ENTER') {
          checkCurrentAnswer();
        } else {
          handleDigitInput(key);
        }
      });
    });

    // Physical Keyboard Support
    window.addEventListener('keydown', (e) => {
      if (!dom.celebrationOverlay.classList.contains('hidden')) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dom.btnCelebContinue.click();
        }
        return;
      }
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigitInput(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        checkCurrentAnswer();
      }
    });

    // Mode Switcher
    dom.btnModeStory.addEventListener('click', () => setGameMode('story'));
    dom.btnModeTest.addEventListener('click', () => setGameMode('test'));

    // Language Switcher (EN / 繁體中文)
    dom.btnLang.addEventListener('click', () => {
      state.lang = state.lang === 'en' ? 'zh' : 'en';
      const t = I18N[state.lang];
      if (state.mode === 'story' && state.activeAnimal >= 1) {
        const a = ANIMALS[state.activeAnimal];
        dom.catSpeechText.textContent = t.catWelcomeStory(a.name[state.lang], state.activeAnimal);
      } else {
        dom.catSpeechText.textContent = t.catWelcomeTest;
      }
      refreshBoardVisuals();
    });

    // Voice Read-Aloud Question
    dom.btnVoice.addEventListener('click', () => {
      if (!state.selectedCell) return;
      const { r, c } = state.selectedCell;
      if (state.lang === 'zh') {
        speakText(`Ning，請問 ${r} 乘以 ${c} 等於多少？`);
      } else {
        speakText(`Ning, what is ${r} times ${c}?`);
      }
    });

    // Sound Toggle
    dom.btnSound.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      dom.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
      dom.btnSound.classList.toggle('active', state.soundEnabled);
    });

    // Hint Button & Teacher Cat Click
    const triggerHint = () => {
      state.showHintDots = true;
      if (state.selectedCell) {
        const { r, c } = state.selectedCell;
        const repeatedTerms = Array(r).fill(c).join(' + ');
        dom.catSpeechText.textContent = I18N[state.lang].hintFormula(r, c, repeatedTerms);
      }
      refreshBoardVisuals();
    };
    dom.btnHint.addEventListener('click', triggerHint);
    dom.teacherCatBtn.addEventListener('click', triggerHint);

    // Reset Game
    dom.btnReset.addEventListener('click', resetGame);

    // Reposition walker sprite on window resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      updateJourneyCardAndWalker();
    });
  }

  /* --------------------------------------------------------------------------
   * 16. BOOTSTRAP GAME
   * -------------------------------------------------------------------------- */
  buildBoardDOM();
  bindEvents();
  setGameMode('story');
})();
