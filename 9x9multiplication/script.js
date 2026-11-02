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
      propEmoji: '🎋',
      actionEmoji: '🥋',
      homeEmoji: '🎋',
      color: '#db7093',
      cellColor: '#e582a1',
      name: { en: 'Panda', zh: '小貓熊' },
      homeName: { en: 'Bamboo Dojo', zh: '竹林功夫館' },
      cheer: { en: 'Kung Fu Bamboo Kick! Skadoosh, Ning!', zh: '功夫竹子飛踢！Ning 太棒了！' },
      stepBubble: { en: '🥋 Kung Fu Kick! 🎋', zh: '🥋 功夫竹子踢！🎋' },
      finaleBadge: { en: '🥋 DRAGON WARRIOR KUNG FU PANDA! 🎋', zh: '🥋 神龍大俠功夫貓熊！ 🎋' },
      finaleDesc: {
        en: 'Panda spins the giant bamboo staff and performs the Dragon Warrior Kung Fu Kick!',
        zh: '小貓熊揮舞魔法綠竹竿，使出神龍大俠360度旋風功夫飛踢！'
      },
      burstIcons: ['🐼', '🎋', '🥋', '⚡', '🥟', '🌟']
    },
    {
      id: 2,
      emoji: '🐰',
      propEmoji: '🥕',
      actionEmoji: '🚀',
      homeEmoji: '🥕',
      color: '#c95f63',
      cellColor: '#d67175',
      name: { en: 'Bunny', zh: '小兔兔' },
      homeName: { en: 'Carrot Burrow', zh: '紅蘿蔔屋' },
      cheer: { en: 'Turbo Carrot Spring! Boing-boing, Ning!', zh: '超級紅蘿蔔彈跳！Ning 好棒！' },
      stepBubble: { en: '🥕 Turbo Spring! 🚀', zh: '🥕 火箭大彈跳！🚀' },
      finaleBadge: { en: '🥕 MOON-JUMP TURBO BUNNY! 🚀', zh: '🥕 衝上雲霄彈跳兔！ 🚀' },
      finaleDesc: {
        en: 'Bunny munches a golden carrot and launches into a triple sky-high moon jump!',
        zh: '小兔兔咬著黃金紅蘿蔔，連續三次超級大彈跳衝上雲霄！'
      },
      burstIcons: ['🐰', '🥕', '🚀', '🌸', '⭐', '💖']
    },
    {
      id: 3,
      emoji: '🐶',
      propEmoji: '🦴',
      actionEmoji: '🛹',
      homeEmoji: '🦴',
      color: '#d8833b',
      cellColor: '#e4944e',
      name: { en: 'Puppy', zh: '小狗狗' },
      homeName: { en: 'Cozy Kennel', zh: '骨頭狗屋' },
      cheer: { en: 'Woof-woof! Double Backflip catch, Ning!', zh: '汪汪！空中後空翻接骨頭！' },
      stepBubble: { en: '🦴 Backflip Catch! 🐾', zh: '🦴 後空翻接骨頭！🐾' },
      finaleBadge: { en: '🦴 ACROBAT BACKFLIP PUPPY! 🏆', zh: '🦴 特技後空翻小狗王！ 🏆' },
      finaleDesc: {
        en: 'Puppy tosses the golden bone into the air and lands a double 360° backflip!',
        zh: '小狗狗把黃金骨頭拋向空中，完美使出雙重360度大後空翻！'
      },
      burstIcons: ['🐶', '🦴', '🐾', '🛹', '🏆', '✨']
    },
    {
      id: 4,
      emoji: '🐸',
      propEmoji: '🪷',
      actionEmoji: '👑',
      homeEmoji: '🪷',
      color: '#eab731',
      cellColor: '#f2c447',
      name: { en: 'Froggy', zh: '小青蛙' },
      homeName: { en: 'Lily Pad Pond', zh: '荷葉池塘' },
      cheer: { en: 'Ribbit-Splash! Super Lily-Pad Leap, Ning!', zh: '呱呱！荷葉水上漂大跳躍！' },
      stepBubble: { en: '🪷 Super Ribbit Leap! 💦', zh: '🪷 荷葉超級跳！💦' },
      finaleBadge: { en: '👑 FROG PRINCE RAINBOW SPLASH! 🪷', zh: '👑 青蛙王子彩虹大飛躍！ 🪷' },
      finaleDesc: {
        en: 'Froggy puts on the golden crown and vaults across the rainbow pond with a giant splash!',
        zh: '小青蛙戴上黃金皇冠，在荷葉池塘上空劃出超大彩虹飛躍！'
      },
      burstIcons: ['🐸', '🪷', '👑', '💦', '🌈', '⭐']
    },
    {
      id: 5,
      emoji: '🐵',
      propEmoji: '🍌',
      actionEmoji: '🌴',
      homeEmoji: '🍌',
      color: '#87aa48',
      cellColor: '#98b95b',
      name: { en: 'Monkey', zh: '小猴子' },
      homeName: { en: 'Banana Treehouse', zh: '香蕉樹屋' },
      cheer: { en: 'Ooh-ooh! Tarzan Jungle Vine Swing, Ning!', zh: '吱吱！泰山藤蔓大擺盪！' },
      stepBubble: { en: '🍌 Jungle Vine Swing! 🌴', zh: '🍌 叢林藤蔓飛盪！🌴' },
      finaleBadge: { en: '🌴 JUNGLE KING ACROBAT MONKEY! 🍌', zh: '🌴 叢林泰山體操小猴王！ 🍌' },
      finaleDesc: {
        en: 'Monkey swings across the jungle vines juggling golden bananas in mid-air!',
        zh: '小猴子抓著叢林藤蔓飛盪空中，邊翻筋斗邊拋接黃金香蕉！'
      },
      burstIcons: ['🐵', '🍌', '🌴', '🥥', '🎉', '🌟']
    },
    {
      id: 6,
      emoji: '🐱',
      propEmoji: '🧶',
      actionEmoji: '🩰',
      homeEmoji: '🧶',
      color: '#5d9b7e',
      cellColor: '#6ead8f',
      name: { en: 'Kitty', zh: '小花貓' },
      homeName: { en: 'Cozy Basket', zh: '毛線球屋' },
      cheer: { en: 'Purr-fect Ballet Pirouette Twirl, Ning!', zh: '喵嗚！優雅芭蕾旋轉舞步！' },
      stepBubble: { en: '🧶 Ballet Twirl! 🩰', zh: '🧶 芭蕾轉圈圈！🩰' },
      finaleBadge: { en: '🩰 PRIMA BALLERINA KITTY STAR! 🧶', zh: '🩰 首席芭蕾舞星小花貓！ 🧶' },
      finaleDesc: {
        en: 'Kitty dances a dazzling 720° ballet pirouette with ribbons of rainbow yarn!',
        zh: '小花貓帶著彩色毛線彩帶，跳出超華麗的720度芭蕾大旋轉！'
      },
      burstIcons: ['🐱', '🧶', '🩰', '🎀', '💖', '✨']
    },
    {
      id: 7,
      emoji: '🐧',
      propEmoji: '🧊',
      actionEmoji: '⛸️',
      homeEmoji: '🧊',
      color: '#4e9da6',
      cellColor: '#60b0b9',
      name: { en: 'Penguin', zh: '小企鵝' },
      homeName: { en: 'Snowy Igloo', zh: '冰雪小屋' },
      cheer: { en: 'Ice Belly-Slide & Triple Axel Spin, Ning!', zh: '冰雪肚皮滑行＋三周半跳躍！' },
      stepBubble: { en: '⛸️ Ice Spin Slide! ❄️', zh: '⛸️ 溜冰大旋轉！❄️' },
      finaleBadge: { en: '⛸️ OLYMPIC ICE SKATING PENGUIN! ❄️', zh: '⛸️ 冰雪花式溜冰企鵝冠軍！ ❄️' },
      finaleDesc: {
        en: 'Penguin belly-slides on sparkling ice and spins a 1080° figure-skating finale!',
        zh: '小企鵝在閃亮冰面上肚皮衝刺，完美演出1080度花式溜冰大旋轉！'
      },
      burstIcons: ['🐧', '❄️', '🧊', '⛸️', '💎', '🌟']
    },
    {
      id: 8,
      emoji: '🐥',
      propEmoji: '🪺',
      actionEmoji: '🎵',
      homeEmoji: '🪺',
      color: '#6a7aa6',
      cellColor: '#7c8cb8',
      name: { en: 'Chick', zh: '小黃雞' },
      homeName: { en: 'Warm Nest', zh: '溫暖鳥巢' },
      cheer: { en: 'Chirp-chirp! Rocket Wing Flutter, Ning!', zh: '啾啾！小翅膀噴射飛翔！' },
      stepBubble: { en: '🐥 Rocket Flutter! 🎵', zh: '🐥 翅膀噴射飛！🎵' },
      finaleBadge: { en: '🎵 ROCKSTAR SKY-FLYING CHICK! 🌟', zh: '🎵 搖滾天團飛天小黃雞！ 🌟' },
      finaleDesc: {
        en: 'Chick flutters into the sky with golden musical notes and does a loop-the-loop!',
        zh: '小黃雞拍動翅膀伴隨金色音符衝上天空，表演空中360度翻圈特技！'
      },
      burstIcons: ['🐥', '🎵', '🎶', '🪺', '🌻', '⭐']
    },
    {
      id: 9,
      emoji: '🐷',
      propEmoji: '🎈',
      actionEmoji: '🪩',
      homeEmoji: '🏡',
      color: '#ac517f',
      cellColor: '#bd6390',
      name: { en: 'Piggy', zh: '小粉豬' },
      homeName: { en: 'Berry Cottage', zh: '花園小木屋' },
      cheer: { en: 'Oink-oink! Funky Disco Boogie Dance, Ning!', zh: '哼哼！動感迪斯可派對熱舞！' },
      stepBubble: { en: '🪩 Disco Boogie! 🎈', zh: '🪩 派對熱舞跳！🎈' },
      finaleBadge: { en: '🪩 SUPERSTAR DISCO PARTY PIGGY! 🎉', zh: '🪩 超級巨星派對熱舞小粉豬！ 🎉' },
      finaleDesc: {
        en: 'Piggy drops the disco ball and throws a giant fireworks dance party at the cottage!',
        zh: '小粉豬點亮旋轉迪斯可球，在花園小木屋前跳起盛大煙火派對舞！'
      },
      burstIcons: ['🐷', '🪩', '🎈', '🎉', '🍰', '🌈']
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
    viewMode: window.innerWidth <= 740 ? 'path' : 'table', // 'path' (Big Stepping Stones) | 'table' (Full 9x9 Triangle)
    userToggledView: false,
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
    btnToggleView: document.getElementById('btnToggleView'),
    viewToggleIcon: document.getElementById('viewToggleIcon'),
    viewToggleLabel: document.getElementById('viewToggleLabel'),
    btnLang: document.getElementById('btnLang'),
    langLabel: document.getElementById('langLabel'),
    btnVoice: document.getElementById('btnVoice'),
    btnSound: document.getElementById('btnSound'),
    soundIcon: document.getElementById('soundIcon'),
    btnReset: document.getElementById('btnReset'),
    animalSelectorBar: document.getElementById('animalSelectorBar'),
    selectorPrompt: document.getElementById('selectorPrompt'),
    animalPillsContainer: document.getElementById('animalPillsContainer'),
    focusedPathStage: document.getElementById('focusedPathStage'),
    fpAnimalBar: document.getElementById('fpAnimalBar'),
    fpHeroBadge: document.getElementById('fpHeroBadge'),
    fpAnimalEmoji: document.getElementById('fpAnimalEmoji'),
    fpAnimalProp: document.getElementById('fpAnimalProp'),
    fpPathTitle: document.getElementById('fpPathTitle'),
    btnSwitchToFullMap: document.getElementById('btnSwitchToFullMap'),
    fpSpeechText: document.getElementById('fpSpeechText'),
    fpTrailWrap: document.getElementById('fpTrailWrap'),
    fpTrailGrid: document.getElementById('fpTrailGrid'),
    fpWalkerLayer: document.getElementById('fpWalkerLayer'),
    boardFrame: document.getElementById('boardFrame'),
    btnBackToPathView: document.getElementById('btnBackToPathView'),
    labelBackToPath: document.getElementById('labelBackToPath'),
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
    celebSpecialBadge: document.getElementById('celebSpecialBadge'),
    celebHeroWrap: document.getElementById('celebHeroWrap'),
    celebPropLeft: document.getElementById('celebPropLeft'),
    celebPropRight: document.getElementById('celebPropRight'),
    celebAnimalEmoji: document.getElementById('celebAnimalEmoji'),
    celebHouseEmoji: document.getElementById('celebHouseEmoji'),
    celebTitle: document.getElementById('celebTitle'),
    celebMoveDesc: document.getElementById('celebMoveDesc'),
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

    // Create the floating walking animal sprite inside walkerLayer (with signature prop badge!)
    dom.walkerLayer.innerHTML = `
      <div id="activeWalkerSprite" class="walking-animal-sprite">
        <span id="walkerEmoji">🐼</span>
        <span id="walkerProp" class="walker-prop-badge">🎋</span>
        <div id="walkerCheerBubble" class="walker-cheer-bubble hidden">Yay!</div>
      </div>
    `;

    // Create the floating walking animal sprite inside Focused Path Stage's fpWalkerLayer!
    if (dom.fpWalkerLayer) {
      dom.fpWalkerLayer.innerHTML = `
        <div id="fpWalkerSprite" class="walking-animal-sprite fp-walker-sprite">
          <span id="fpWalkerEmoji">🐼</span>
          <span id="fpWalkerProp" class="walker-prop-badge">🎋</span>
          <div id="fpWalkerBubble" class="walker-cheer-bubble hidden">Yay!</div>
        </div>
      `;
    }
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
              box.innerHTML = `<span>${r * c}</span>`;
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
    updateFocusedPathStage();
    updateSidebarQuestionCard();
  }

  /* --------------------------------------------------------------------------
   * 8B. FOCUSED ANIMAL L-PATH STAGE (BIG STEPPING STONES FOR IPHONE & IPAD!)
   * -------------------------------------------------------------------------- */
  function setViewMode(mode, isUserAction = true) {
    if (isUserAction) {
      state.userToggledView = true;
    }
    state.viewMode = mode === 'path' ? 'path' : 'table';
    refreshBoardVisuals();
  }

  function updateFocusedPathStage() {
    if (!dom.focusedPathStage || !dom.boardFrame) return;

    const isPathView = state.viewMode === 'path';
    dom.focusedPathStage.classList.toggle('hidden', !isPathView);
    dom.boardFrame.classList.toggle('hidden', isPathView);

    // Update top header view toggle button
    if (dom.viewToggleIcon && dom.viewToggleLabel) {
      dom.viewToggleIcon.textContent = isPathView ? '🗺️' : '🐾';
      dom.viewToggleLabel.textContent =
        state.lang === 'zh'
          ? isPathView ? '完整九九表' : '大步石路線'
          : isPathView ? '9×9 Table' : 'Animal Path';
    }
    if (dom.btnSwitchToFullMap) {
      dom.btnSwitchToFullMap.textContent =
        state.lang === 'zh' ? '🗺️ 看完整 9×9 乘法表' : '🗺️ Full 9×9 Table';
    }
    if (dom.labelBackToPath) {
      dom.labelBackToPath.textContent =
        state.lang === 'zh' ? '切換：大步石動物路線' : 'Big Animal Path View';
    }

    // Determine which animal's L-path is currently focused
    let focusAnimal = state.activeAnimal;
    if (!focusAnimal || focusAnimal < 1 || focusAnimal > 9) {
      focusAnimal = state.selectedCell ? state.selectedCell.c : 1;
    }
    const animal = ANIMALS[focusAnimal] || ANIMALS[1];

    // 1. Render 9-Animal Quick Switcher Bar
    if (dom.fpAnimalBar) {
      dom.fpAnimalBar.innerHTML = '';
      for (let n = 1; n <= 9; n++) {
        const a = ANIMALS[n];
        const done = isAnimalPathComplete(n);
        const isActive = focusAnimal === n;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = [
          'fp-animal-btn',
          isActive ? 'active' : '',
          done ? 'done' : ''
        ]
          .filter(Boolean)
          .join(' ');
        if (isActive) {
          btn.style.borderColor = a.color;
          btn.style.boxShadow = `0 0 0 3px ${a.color}55, 0 4px 8px rgba(0,0,0,0.18)`;
        }
        btn.innerHTML = `
          <span class="fp-btn-emoji">${a.emoji}</span>
          <span class="fp-btn-num band-${n}">${done ? '✓' : n}</span>
        `;
        btn.addEventListener('click', () => selectAnimalPath(n));
        dom.fpAnimalBar.appendChild(btn);
      }
    }

    // 2. Update Active Animal Header & Teacher Cat Speech Copy
    if (dom.fpAnimalEmoji) dom.fpAnimalEmoji.textContent = animal.emoji;
    if (dom.fpAnimalProp) dom.fpAnimalProp.textContent = animal.propEmoji || '⭐';
    if (dom.fpHeroBadge) dom.fpHeroBadge.style.borderColor = animal.color;
    if (dom.fpPathTitle) {
      dom.fpPathTitle.textContent =
        state.lang === 'zh'
          ? `${animal.name.zh}的數字 ${focusAnimal} 回家之路`
          : `${animal.name.en}'s #${focusAnimal} Path Home`;
    }
    if (dom.fpSpeechText && dom.catSpeechText) {
      dom.fpSpeechText.textContent = dom.catSpeechText.textContent;
    }

    // 3. Build the 10 Big Stepping Stones (Steps 1..9 + Animal Home!) in a 5x2 Grid
    if (!dom.fpTrailGrid) return;
    dom.fpTrailGrid.innerHTML = '';
    const path = getAnimalLPath(focusAnimal);

    path.forEach((step, idx) => {
      const { r, c, isCorner, dir } = step;
      const solved = isCellSolved(r, c);
      const isSelected =
        state.selectedCell && state.selectedCell.r === r && state.selectedCell.c === c;
      const bandIdx = getCellBandIndex(r, c);

      const stone = document.createElement('div');
      stone.id = `fpStone-${r}-${c}`;
      stone.className = [
        'fp-stone',
        `band-${bandIdx}`,
        isCorner ? 'is-corner' : '',
        solved ? 'solved-stone' : 'empty-stone',
        isSelected ? 'selected-stone' : ''
      ]
        .filter(Boolean)
        .join(' ');

      let dirBadge = '';
      if (isCorner) {
        dirBadge = state.lang === 'zh' ? `⭐ ${focusAnimal}² 轉角` : `⭐ ${focusAnimal}² Turn`;
      } else if (dir === 'down') {
        dirBadge = state.lang === 'zh' ? `⬇ 直行 ${c}` : `⬇ Col ${c}`;
      } else {
        dirBadge = state.lang === 'zh' ? `➔ 橫列 ${r}` : `➔ Row ${r}`;
      }

      const centerDisplay = solved
        ? `${r * c}`
        : isSelected
          ? state.typedValue !== '' ? state.typedValue : '?'
          : '?';

      const stepArrow = idx === 4 ? '⤵' : '➔';

      stone.innerHTML = `
        <div class="fp-stone-top">
          <span class="fp-stone-eq">${r} × ${c}</span>
          <span class="fp-stone-arrow">${stepArrow}</span>
        </div>
        <div class="fp-stone-val">${centerDisplay}</div>
        <div class="fp-stone-dir">${dirBadge}</div>
      `;

      stone.addEventListener('click', () => selectCell(r, c));
      dom.fpTrailGrid.appendChild(stone);
    });

    // 10th Stone: Animal's Destination Home!
    const isHome = isAnimalPathComplete(focusAnimal);
    const homeStone = document.createElement('div');
    homeStone.id = `fpStone-home-${focusAnimal}`;
    homeStone.className = `fp-stone fp-home-stone ${isHome ? 'reached-home' : ''}`;
    homeStone.innerHTML = `
      <div class="fp-stone-top">
        <span class="fp-stone-eq">${state.lang === 'zh' ? '🏡 終點' : '🏡 HOME'}</span>
      </div>
      <div class="fp-stone-val fp-home-icons">${animal.emoji}${animal.homeEmoji}</div>
      <div class="fp-stone-dir">${
        isHome
          ? state.lang === 'zh' ? '平安到家！🎉' : 'Safe Home! 🎉'
          : animal.homeName[state.lang]
      }</div>
    `;
    dom.fpTrailGrid.appendChild(homeStone);

    // 4. Position the Floating Walking Animal Sprite on the Focused Trail (Top-Right Rim so numbers are NEVER blocked!)
    requestAnimationFrame(() => positionFocusedWalker(focusAnimal));
  }

  function positionFocusedWalker(focusAnimal) {
    if (state.viewMode !== 'path' || !dom.fpTrailWrap) return;
    const fpWalker = document.getElementById('fpWalkerSprite');
    const fpEmoji = document.getElementById('fpWalkerEmoji');
    const fpProp = document.getElementById('fpWalkerProp');
    if (!fpWalker || !fpEmoji) return;

    const animal = ANIMALS[focusAnimal] || ANIMALS[1];
    fpEmoji.textContent = animal.emoji;
    if (fpProp) fpProp.textContent = animal.propEmoji || '⭐';
    fpWalker.style.borderColor = animal.color;

    const stopInfo = getAnimalCurrentStop(focusAnimal);
    let targetStone = null;
    if (stopInfo.type === 'HOME') {
      targetStone = document.getElementById(`fpStone-home-${focusAnimal}`);
    } else if (stopInfo.type === 'CELL') {
      targetStone = document.getElementById(`fpStone-${stopInfo.r}-${stopInfo.c}`);
    } else {
      targetStone = document.getElementById(`fpStone-1-${focusAnimal}`);
    }

    if (targetStone && dom.fpTrailWrap) {
      const wrapRect = dom.fpTrailWrap.getBoundingClientRect();
      const stoneRect = targetStone.getBoundingClientRect();
      if (wrapRect.width > 0 && stoneRect.width > 0) {
        if (stopInfo.type === 'TOP') {
          // Starting edge on top-left of the first stone
          fpWalker.style.left = `${stoneRect.left - wrapRect.left + 10}px`;
          fpWalker.style.top = `${stoneRect.top - wrapRect.top + 8}px`;
        } else if (stopInfo.type === 'HOME') {
          // Centered on the Home stone
          fpWalker.style.left = `${stoneRect.left - wrapRect.left + stoneRect.width * 0.78}px`;
          fpWalker.style.top = `${stoneRect.top - wrapRect.top + 10}px`;
        } else {
          // Perched on the top-right corner rim of the solved stone so the big number in the center is 100% visible!
          fpWalker.style.left = `${stoneRect.right - wrapRect.left - 8}px`;
          fpWalker.style.top = `${stoneRect.top - wrapRect.top + 8}px`;
        }
      }
    }
  }

  /* --------------------------------------------------------------------------
   * 9. UPDATE FLOATING WALKER SPRITE & JOURNEY PROGRESS TRACKER
   *    (Animal hops along the L-path and stands in the right side of the box,
   *     while the number shifts slightly left so they NEVER overlap!)
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

    // Clear previous `has-walker` class from all cells
    document.querySelectorAll('.tri-cell.has-walker').forEach((el) => {
      el.classList.remove('has-walker');
    });

    if (!walker || !walkerEmoji) return;
    const walkerProp = document.getElementById('walkerProp');
    walkerEmoji.textContent = animal.emoji;
    if (walkerProp) {
      walkerProp.textContent = animal.propEmoji || '⭐';
    }
    walker.style.borderColor = animal.color;

    const stopInfo = getAnimalCurrentStop(focusAnimal);
    let targetEl = null;
    const isMobileScreen = window.innerWidth <= 740;
    if (stopInfo.type === 'HOME') {
      targetEl = document.getElementById(`rightHome-${focusAnimal}`);
    } else if (stopInfo.type === 'TOP') {
      targetEl = document.getElementById(`topDock-${focusAnimal}`);
    } else {
      targetEl = document.getElementById(`cell-${stopInfo.r}-${stopInfo.c}`);
      if (targetEl && !isMobileScreen) {
        // On desktop/tablet, mark this cell with `has-walker` so its number shifts left and stands beside the animal!
        targetEl.classList.add('has-walker');
      }
    }

    if (targetEl && dom.boardFrame) {
      const boardRect = dom.boardFrame.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      if (boardRect.width > 0 && targetRect.width > 0) {
        if (stopInfo.type === 'CELL') {
          if (isMobileScreen) {
            // On compact iPhone screens, perch the animal on the top-right corner rim of the cell
            // so the solved number inside the box remains 100% centered and unobstructed!
            const cornerX = targetRect.right - boardRect.left - 3;
            const cornerY = targetRect.top - boardRect.top + 3;
            walker.style.left = `${cornerX}px`;
            walker.style.top = `${cornerY}px`;
          } else {
            // On desktop/iPad, place the animal on the right side of the cell (76% across, 52% down)
            // while `.has-walker` shifts the number to the left side of the cell!
            const sideX = targetRect.left - boardRect.left + targetRect.width * 0.76;
            const sideY = targetRect.top - boardRect.top + targetRect.height * 0.52;
            walker.style.left = `${sideX}px`;
            walker.style.top = `${sideY}px`;
          }
        } else {
          const centerX = targetRect.left - boardRect.left + targetRect.width / 2;
          const centerY = targetRect.top - boardRect.top + targetRect.height / 2;
          walker.style.left = `${centerX}px`;
          walker.style.top = `${centerY}px`;
        }
      }
    }
  }

  function triggerWalkerCelebration(r, c, animalIdx = 1) {
    const walker = document.getElementById('activeWalkerSprite');
    const bubble = document.getElementById('walkerCheerBubble');
    const fpWalker = document.getElementById('fpWalkerSprite');
    const fpBubble = document.getElementById('fpWalkerBubble');
    const animal = ANIMALS[animalIdx] || ANIMALS[1];

    [walker, fpWalker].forEach((w) => {
      if (!w) return;
      for (let i = 1; i <= 9; i++) {
        w.classList.remove(`move-animal-${i}`);
      }
      void w.offsetWidth;
      w.classList.add(`move-animal-${animal.id}`);
    });

    [bubble, fpBubble].forEach((b) => {
      if (!b) return;
      b.textContent = animal.stepBubble ? animal.stepBubble[state.lang] : 'Yay! 🎉';
      b.classList.remove('hidden');
    });

    if (state.bubbleHideTimer) clearTimeout(state.bubbleHideTimer);
    state.bubbleHideTimer = setTimeout(() => {
      if (bubble) bubble.classList.add('hidden');
      if (fpBubble) fpBubble.classList.add('hidden');
    }, 3800);

    const targets = [
      document.getElementById(`topDock-${c}`),
      document.getElementById(`topDock-${r}`),
      document.getElementById(`rightHome-${r}`),
      dom.journeyAnimalAvatar,
      dom.fpHeroBadge
    ];
    targets.forEach((el) => {
      if (!el) return;
      el.classList.remove('cheer-jump');
      void el.offsetWidth;
      el.classList.add('cheer-jump');
      setTimeout(() => el.classList.remove('cheer-jump'), 1450);
    });
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

    const isCompactPhone = window.innerWidth <= 740;
    dom.activeAnimalBadge.textContent =
      state.mode === 'test'
        ? (isCompactPhone ? '⚡' : t.testChallengeLabel)
        : isCompactPhone
          ? `${animalForStep.emoji} ${animalForStep.name[state.lang]}`
          : t.activeStepLabel(animalForStep.emoji, animalForStep.name[state.lang]);

    dom.eqFactorA.textContent = String(r);
    dom.eqFactorA.className = `eq-num band-${r}`;
    dom.eqFactorB.textContent = String(c);
    dom.eqFactorB.className = `eq-num band-${c}`;
    dom.eqAnswerBox.textContent = state.typedValue !== '' ? state.typedValue : '?';

    // Pulse the OK ✓ button when Ning has entered digits so she knows to press OK!
    const btnSubmit = document.getElementById('btnSubmit');
    if (btnSubmit) {
      btnSubmit.classList.toggle('ready-pulse', state.typedValue !== '');
    }

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

    if (state.typedValue.length < 2) {
      state.typedValue += digitStr;
    } else {
      state.typedValue = digitStr;
    }

    refreshBoardVisuals();
    // Wait for Ning to press OK ✓ (or Enter) before checking!
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

      // Determine active animal to cheer
      const cheeringAnimalIdx =
        state.activeAnimal >= 1 && state.activeAnimal <= 9 ? state.activeAnimal : c;
      const cheeringAnimal = ANIMALS[cheeringAnimalIdx];
      const cheerMsg = cheeringAnimal.cheer[state.lang];
      dom.catSpeechText.textContent = t.catCorrect(cheerMsg, r, c, expected);

      const cellEl =
        state.viewMode === 'path'
          ? document.getElementById(`fpStone-${r}-${c}`)
          : document.getElementById(`cell-${r}-${c}`);
      if (cellEl) {
        cellEl.classList.remove('just-solved');
        void cellEl.offsetWidth;
        cellEl.classList.add('just-solved');
        const rect = cellEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        spawnConfettiBurst(cx, cy, 42, cheeringAnimal.burstIcons || [cheeringAnimal.emoji]);
        spawnFloatingScore(cx, cy - 10, `+10 ⭐ ${cheeringAnimal.emoji}${cheeringAnimal.propEmoji}`);
      }

      // Voice encouragement (Chinese chant or English multiplication)
      if (state.lang === 'zh') {
        speakText(`${getChineseFormulaChant(r, c, expected)}！`);
      } else {
        speakText(`${r} times ${c} is ${expected}!`);
      }

      refreshBoardVisuals();
      triggerWalkerCelebration(r, c, cheeringAnimalIdx);

      // Check if any animal just completed its entire L-path home!
      checkNewlyCompletedAnimalHomes();

      // Advance to the next empty cell
      advanceToNextTargetCell();
    } else {
      // GENTLE MISTAKE FEEDBACK
      state.mistakes += 1;
      state.showHintDots = true;
      playWrongBoing();

      const cellEl =
        state.viewMode === 'path'
          ? document.getElementById(`fpStone-${r}-${c}`)
          : document.getElementById(`cell-${r}-${c}`);
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
          setTimeout(() => showAnimalHomeCelebration(n, false), 1400);
          return;
        }
      }
    }

    if (allNineComplete) {
      stopTimer();
      setTimeout(() => showAnimalHomeCelebration(9, true), 1400);
    }
  }

  function showAnimalHomeCelebration(animalIdx, isGrandFinale) {
    const t = I18N[state.lang];
    const animal = ANIMALS[animalIdx] || ANIMALS[1];

    playAnimalHomeFanfare();
    spawnConfettiBurst(
      window.innerWidth / 2,
      window.innerHeight / 3,
      isGrandFinale ? 95 : 54,
      animal.burstIcons || [animal.emoji, animal.propEmoji, animal.actionEmoji]
    );

    if (dom.celebSpecialBadge) {
      dom.celebSpecialBadge.textContent = isGrandFinale
        ? state.lang === 'zh'
          ? '🏆 九大功夫萌寵全員到齊！ 🏆'
          : '🏆 ALL 9 SUPER ANIMALS HOME! 🏆'
        : animal.finaleBadge[state.lang];
    }

    if (dom.celebHeroWrap) {
      for (let i = 1; i <= 9; i++) {
        dom.celebHeroWrap.classList.remove(`finale-animal-${i}`);
      }
      dom.celebHeroWrap.classList.add(`finale-animal-${animal.id}`);
    }

    if (dom.celebPropLeft) {
      dom.celebPropLeft.textContent = isGrandFinale ? '🏆' : animal.propEmoji;
    }
    if (dom.celebPropRight) {
      dom.celebPropRight.textContent = isGrandFinale ? '👑' : animal.actionEmoji;
    }
    if (dom.celebHouseEmoji) {
      dom.celebHouseEmoji.textContent = isGrandFinale ? '🏰' : animal.homeEmoji;
    }

    dom.celebAnimalEmoji.textContent = isGrandFinale ? '🐼🐰🐶🐸🐵🐱🐧🐥🐷' : animal.emoji;
    dom.celebTitle.textContent = isGrandFinale
      ? t.celebAllTitle
      : t.celebSingleTitle(animal.name[state.lang]);

    if (dom.celebMoveDesc) {
      dom.celebMoveDesc.textContent = isGrandFinale
        ? state.lang === 'zh'
          ? '9隻小動物使出專屬招牌絕技，為 Ning 舉辦盛大煙火慶功宴！'
          : 'All 9 animal friends perform their signature special moves for Ning!'
        : animal.finaleDesc[state.lang];
    }

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
   * 14. RICH CANVAS FIREWORKS, EMOJI BURSTS, SHOCKWAVES & FLOATING SCORE ENGINE
   * -------------------------------------------------------------------------- */
  const particles = [];
  const emojiSprites = [];
  const shockwaves = [];
  let animFrameId = null;

  function resizeCanvas() {
    if (!dom.fxCanvas) return;
    dom.fxCanvas.width = window.innerWidth;
    dom.fxCanvas.height = window.innerHeight;
  }

  function spawnFloatingScore(x, y, text = '+10 ⭐') {
    const pop = document.createElement('div');
    pop.className = 'floating-score-pop';
    pop.style.left = `${x}px`;
    pop.style.top = `${y}px`;
    pop.textContent = text;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 2400);
  }

  function spawnConfettiBurst(x, y, count = 42, customIcons = null) {
    resizeCanvas();
    const colors = [
      '#ff1744', '#ff9100', '#ffea00', '#00e676',
      '#00b0ff', '#d500f9', '#ff4081', '#ffd740'
    ];

    // 1. Expanding glowing golden shockwave rings
    shockwaves.push({
      x,
      y,
      radius: 8,
      maxRadius: 115,
      alpha: 0.9,
      color: '#ffd43b'
    });
    shockwaves.push({
      x,
      y,
      radius: 4,
      maxRadius: 80,
      alpha: 0.85,
      color: '#ff6b6b'
    });

    // 2. Confetti & glowing star sparks (Gentle, slow-motion burst!)
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
      const speed = 2.2 + Math.random() * 5.2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.4,
        size: 8 + Math.random() * 7,
        color: colors[i % colors.length],
        alpha: 1,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.12,
        isStar: i % 3 === 0
      });
    }

    // 3. Flying Celebration Emojis (Animal + Signature Props + Stars + Rainbow)
    const celebIcons = Array.isArray(customIcons) && customIcons.length > 0
      ? customIcons
      : [typeof customIcons === 'string' ? customIcons : '⭐', '🌟', '🎉', '💖', '🌈', '✨'];
    const emojiCount = 12;
    for (let j = 0; j < emojiCount; j++) {
      const angle = (Math.PI * 2 * j) / emojiCount + (Math.random() - 0.5) * 0.3;
      const speed = 1.8 + Math.random() * 3.8;
      emojiSprites.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.8,
        size: 24 + Math.random() * 12,
        icon: celebIcons[j % celebIcons.length],
        alpha: 1,
        rot: (Math.random() - 0.5) * 0.35,
        vRot: (Math.random() - 0.5) * 0.035
      });
    }

    if (!animFrameId) {
      animFrameId = requestAnimationFrame(stepParticles);
    }
  }

  function drawStar(ctx, r) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a1 = ((i * 72 - 90) * Math.PI) / 180;
      const a2 = (((i * 72 + 36) - 90) * Math.PI) / 180;
      ctx.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
      ctx.lineTo(Math.cos(a2) * (r * 0.45), Math.sin(a2) * (r * 0.45));
    }
    ctx.closePath();
    ctx.fill();
  }

  function stepParticles() {
    const ctx = dom.fxCanvas.getContext('2d');
    ctx.clearRect(0, 0, dom.fxCanvas.width, dom.fxCanvas.height);

    // Render shockwave rings (Slower expansion)
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.radius += (sw.maxRadius - sw.radius) * 0.085;
      sw.alpha -= 0.016;
      if (sw.alpha <= 0) {
        shockwaves.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, sw.alpha);
      ctx.strokeStyle = sw.color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Render confetti & stars (Gentle float & slow fade)
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.988;
      p.vy += 0.11; // gentle gravity
      p.rot += p.vRot;
      p.alpha -= 0.008;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.isStar) {
        drawStar(ctx, p.size * 0.75);
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      }
      ctx.restore();
    }

    // Render flying emoji sprites (Gentle float & slow fade)
    for (let i = emojiSprites.length - 1; i >= 0; i--) {
      const e = emojiSprites[i];
      e.x += e.vx;
      e.y += e.vy;
      e.vy += 0.09;
      e.rot += e.vRot;
      e.alpha -= 0.008;

      if (e.alpha <= 0) {
        emojiSprites.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, e.alpha);
      ctx.translate(e.x, e.y);
      ctx.rotate(e.rot);
      ctx.font = `${Math.round(e.size)}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(e.icon, 0, 0);
      ctx.restore();
    }

    if (particles.length > 0 || emojiSprites.length > 0 || shockwaves.length > 0) {
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

    // View Switcher: Focused Animal Path View vs Full 9x9 Table View
    if (dom.btnToggleView) {
      dom.btnToggleView.addEventListener('click', () => {
        setViewMode(state.viewMode === 'path' ? 'table' : 'path', true);
      });
    }
    if (dom.btnSwitchToFullMap) {
      dom.btnSwitchToFullMap.addEventListener('click', () => setViewMode('table', true));
    }
    if (dom.btnBackToPathView) {
      dom.btnBackToPathView.addEventListener('click', () => setViewMode('path', true));
    }

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
      updateFocusedPathStage();
    });
  }

  /* --------------------------------------------------------------------------
   * 16. DYNAMIC DEVICE & PLATFORM ADAPTER (PC, iPad, iPhone, Android)
   * -------------------------------------------------------------------------- */
  function detectAndApplyDeviceProfile() {
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const maxTouch = navigator.maxTouchPoints || 0;

    const isIPad =
      /iPad/.test(ua) ||
      (platform === 'MacIntel' && maxTouch > 1 && !/iPhone/.test(ua));
    const isIPhone = /iPhone|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);

    const vw = Math.round(window.visualViewport ? window.visualViewport.width : window.innerWidth);
    const vh = Math.round(window.visualViewport ? window.visualViewport.height : window.innerHeight);
    const orientation = vw >= vh ? 'landscape' : 'portrait';

    const isMobile = isIPhone || (isAndroid && /Mobile/.test(ua)) || vw <= 740;
    const isTablet =
      isIPad ||
      (!isMobile &&
        (isAndroid || (vw > 740 && vw <= 1220 && maxTouch > 0)));
    const isDesktop = !isMobile && !isTablet;

    // Default to Focused Animal Path View on iPhone/Mobile unless the user explicitly toggled!
    if (!state.userToggledView) {
      state.viewMode = isMobile ? 'path' : 'table';
    }

    const root = document.documentElement;
    root.style.setProperty('--app-height', `${vh}px`);
    root.style.setProperty('--app-width', `${vw}px`);

    // Deterministically compute exact board row heights in pixels so iOS WebKit
    // never stretches or overflows the 11-row multiplication grid!
    let cellH = 38;
    let topRowH = 48;
    let numRowH = 30;

    if (vw <= 740) {
      // iPhone / Mobile Portrait (3-Zone Layout: Top Bar 36px + Board + Bottom Dock 162px)
      const reservedVertical = 36 + 162 + 22; // top bar + bottom dock + outer paddings/gaps
      const maxBoardGridH = Math.max(220, Math.min(vh - reservedVertical, Math.floor(vw * 0.94)));
      cellH = Math.max(20, Math.floor(maxBoardGridH / 11.0));
      topRowH = Math.max(26, Math.floor(cellH * 1.22));
      numRowH = Math.max(18, Math.floor(cellH * 0.78));
    } else if (orientation === 'portrait') {
      // iPad / Tablet Portrait (Top Bar 46px + Board + 2-Col Bottom Dock 215px)
      const reservedVertical = 48 + 215 + 32;
      const maxBoardGridH = Math.max(300, Math.min(vh - reservedVertical, Math.floor(vw * 0.88)));
      cellH = Math.max(28, Math.floor(maxBoardGridH / 11.1));
      topRowH = Math.floor(cellH * 1.26);
      numRowH = Math.floor(cellH * 0.82);
    } else {
      // iPad Horizontal / Landscape & Desktop (Side-by-Side: Left Board + Right Sidebar)
      const selectorAllowance = vw > 1220 && vh > 820 ? 44 : 0;
      const sidebarWidth = vw <= 1180 ? 280 : 320;
      const reservedVertical = 52 + selectorAllowance + 34;
      const availW = Math.max(380, vw - sidebarWidth - 44);
      const maxBoardGridH = Math.max(290, Math.min(vh - reservedVertical, Math.floor(availW * 0.82)));
      cellH = Math.max(26, Math.floor(maxBoardGridH / 11.15));
      topRowH = Math.floor(cellH * 1.28);
      numRowH = Math.floor(cellH * 0.82);
    }

    root.style.setProperty('--cell-h', `${cellH}px`);
    root.style.setProperty('--top-row-h', `${topRowH}px`);
    root.style.setProperty('--num-row-h', `${numRowH}px`);

    root.classList.toggle('device-ipad', isIPad);
    root.classList.toggle('device-iphone', isIPhone);
    root.classList.toggle('device-mobile', isMobile);
    root.classList.toggle('device-tablet', isTablet);
    root.classList.toggle('device-desktop', isDesktop);
    root.classList.toggle('orientation-landscape', orientation === 'landscape');
    root.classList.toggle('orientation-portrait', orientation === 'portrait');

    if (dom.triangleGrid && dom.triangleGrid.children.length > 0) {
      requestAnimationFrame(() => {
        updateJourneyCardAndWalker();
        updateFocusedPathStage();
      });
    }
  }

  window.addEventListener('resize', detectAndApplyDeviceProfile);
  window.addEventListener('orientationchange', () => {
    setTimeout(detectAndApplyDeviceProfile, 120);
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', detectAndApplyDeviceProfile);
  }

  /* --------------------------------------------------------------------------
   * 17. BOOTSTRAP GAME
   * -------------------------------------------------------------------------- */
  detectAndApplyDeviceProfile();
  buildBoardDOM();
  bindEvents();
  setGameMode('story');
})();
