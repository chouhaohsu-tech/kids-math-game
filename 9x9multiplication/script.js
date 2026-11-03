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
      modeClue: 'Clue Mode',
      modeTest: 'Clue Mode',
      labelTestStatus: 'Revealed Clues:',
      testHolesRemaining: (rev, total) => `${rev} / ${total} Unlocked`,
      testDiffEasy: '🟢 Easy (12 Seeds)',
      testDiffMed: '🟡 Medium (6 Seeds)',
      testDiffHard: '🔴 Hard (2 Seeds)',
      newTestBtn: 'New Map 🔄',
      catWelcomeTest:
        'Welcome to Clue Mode, Ning! Like Minesweeper, look at the numbers already revealed on the map. Find hidden tiles next to them to deduce mystery numbers. Each one you solve reveals brand new clues for its neighbors!',
      testStepLabel: '🔍 Clue Deduction',
      testClueHeading: 'Surrounding Revealed Clues:',
      celebTestTitle: '🏆 CLUE MAP CLEARED, NING! 🏆',
      celebTestSub: (total, timeStr, mistakes) =>
        `Ning deduced and unlocked all ${total} multiplication tiles in ${timeStr}! Mistakes: ${mistakes}`,
      nextTestBtn: 'Next Map 🔄',
      langBtnLabel: '中文 / EN',
      selectorPrompt: '🐾 Animal Path:',
      allAnimalsPill: '🌈 All Paths',
      legendTitle: 'Square Numbers (Diagonal)',
      legendSubtitle: 'The Most Special Corner Stones!',
      hintBtn: 'Hint',
      rackTitle: '🏡 Animal Homes Reached',
      nextAnimalBtn: 'OK ✓ Next Animal Friend ➡️',
      playAgainBtn: 'OK ✓ Play Again 🔄',
      catWelcomeStory: (animalName, n) =>
        `Hi Ning! Let's take ${animalName} (#${n}) home! Start at the top of Column ${n}, go down to ${n}×${n}=${n * n}, then turn right along Row ${n}!`,
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
      modeClue: '線索模式',
      modeTest: '線索模式',
      labelTestStatus: '已解鎖線索：',
      testHolesRemaining: (rev, total) => `已解開 ${rev} / ${total} 格`,
      testDiffEasy: '🟢 初級 (12個種子)',
      testDiffMed: '🟡 中級 (6個種子)',
      testDiffHard: '🔴 掃雷大師 (2個種子)',
      newTestBtn: '換張新地圖 🔄',
      catWelcomeTest:
        '歡迎來到線索模式，Ning！就像踩地雷一樣，先從地圖上已經揭曉的數字線索開始，找出相鄰空格的神秘答案。每解開一格，四周的格子就會獲得全新的線索喔！',
      testStepLabel: '🔍 線索推導',
      testClueHeading: '四周相鄰線索：',
      celebTestTitle: '🏆 太神啦 Ning！線索地圖完全掃清！ 🏆',
      celebTestSub: (total, timeStr, mistakes) =>
        `妳在 ${timeStr} 內推導並解開了全部 ${total} 個乘法格子！錯誤次數：${mistakes}`,
      nextTestBtn: '挑戰新地圖 🔄',
      langBtnLabel: 'EN / 中文',
      selectorPrompt: '🐾 選擇小動物路線：',
      allAnimalsPill: '🌈 全部顯示',
      legendTitle: '平方數（對角線轉角）',
      legendSubtitle: '最特別的轉彎魔法石！',
      hintBtn: '小提示',
      rackTitle: '🏡 已平安回家的小動物',
      nextAnimalBtn: 'OK ✓ 幫助下一隻小動物 ➡️',
      playAgainBtn: 'OK ✓ 再玩一次 🔄',
      catWelcomeStory: (animalName, n) =>
        `嗨 Ning！我們帶${animalName}（數字 ${n}）回家吧！從第 ${n} 直行最上方出發，往下走到轉角 ${n}×${n}=${n * n}，再往右走完第 ${n} 橫列就到家囉！`,
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
    mode: 'story',           // 'story' | 'clue'
    clueDiff: 'medium',      // 'easy' (12 seeds) | 'medium' (6 seeds) | 'hard' (2 seeds)
    clueSeeds: new Set(),    // set of 'r-c' keys that were initial revealed seeds
    clueRevealed: {},        // key 'r-c' -> true if revealed (seeds + solved)
    testDiff: 'medium',      // backward compatibility alias
    testHoles: [],           // backward compatibility alias
    testTotalHoles: 36,
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
    testQueue: []            // randomized cell queue
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
    if (r === c) return true; // Diagonal square numbers are pre-filled base anchors!
    if (state.mode === 'clue' || state.mode === 'test' || state.mode === 'detective') {
      return !!state.clueRevealed[`${r}-${c}`];
    }
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
    btnModeClue: document.getElementById('btnModeClue') || document.getElementById('btnModeTest'),
    btnModeTest: document.getElementById('btnModeClue') || document.getElementById('btnModeTest'),
    labelModeStory: document.getElementById('labelModeStory'),
    labelModeClue: document.getElementById('labelModeClue') || document.getElementById('labelModeTest'),
    labelModeTest: document.getElementById('labelModeClue') || document.getElementById('labelModeTest'),
    testToolbar: document.getElementById('testToolbar'),
    labelTestStatus: document.getElementById('labelTestStatus'),
    testHolesRemaining: document.getElementById('testHolesRemaining'),
    diffBtnEasy: document.getElementById('diffBtnEasy'),
    diffBtnMedium: document.getElementById('diffBtnMedium'),
    diffBtnHard: document.getElementById('diffBtnHard'),
    btnNewTest: document.getElementById('btnNewTest'),
    labelNewTest: document.getElementById('labelNewTest'),
    testClueBox: document.getElementById('testClueBox'),
    testClueHeader: document.getElementById('testClueHeader'),
    testCluesList: document.getElementById('testCluesList'),
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
    btnCelebClose: document.getElementById('btnCelebClose'),
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
    const isCompactBar = window.innerWidth <= 760 || window.innerHeight <= 520;
    dom.appTitle.textContent = t.appTitle;
    dom.appSubtitle.textContent = t.appSubtitle;
    dom.labelModeStory.textContent = isCompactBar
      ? (state.lang === 'zh' ? '故事' : 'Story')
      : t.modeStory;
    const clueLabelEl = dom.labelModeClue || dom.labelModeTest;
    if (clueLabelEl) {
      clueLabelEl.textContent = isCompactBar
        ? (state.lang === 'zh' ? '線索模式' : 'Clue Mode')
        : (t.modeClue || t.modeTest);
    }
    if (dom.labelModeDetective) {
      dom.labelModeDetective.textContent = isCompactBar
        ? state.lang === 'zh' ? '偵探' : 'Detective'
        : t.modeDetective;
    }
    dom.langLabel.textContent = t.langBtnLabel;
    dom.selectorPrompt.textContent = t.selectorPrompt;
    dom.legendTitle.textContent = t.legendTitle;
    dom.legendSubtitle.textContent = t.legendSubtitle;
    dom.labelHint.textContent = t.hintBtn;
    dom.rackTitle.textContent = t.rackTitle;
    dom.scoreText.textContent = String(state.score);

    const isClueMode = state.mode === 'clue' || state.mode === 'test';
    if (dom.testToolbar) {
      dom.testToolbar.classList.toggle('hidden', !isClueMode);
    }
    if (dom.animalSelectorBar) {
      dom.animalSelectorBar.classList.toggle('hidden', isClueMode);
    }

    if (isClueMode) {
      const revealedCount = Object.keys(state.clueRevealed).length;
      if (dom.testHolesRemaining) {
        dom.testHolesRemaining.textContent = t.testHolesRemaining(
          revealedCount,
          36
        );
      }
      if (dom.labelTestStatus) dom.labelTestStatus.textContent = t.labelTestStatus;
      if (dom.labelNewTest) dom.labelNewTest.textContent = t.newTestBtn;
      if (dom.diffBtnEasy) {
        dom.diffBtnEasy.textContent = t.testDiffEasy;
        dom.diffBtnEasy.classList.toggle('active', state.clueDiff === 'easy');
      }
      if (dom.diffBtnMedium) {
        dom.diffBtnMedium.textContent = t.testDiffMed;
        dom.diffBtnMedium.classList.toggle('active', state.clueDiff === 'medium');
      }
      if (dom.diffBtnHard) {
        dom.diffBtnHard.textContent = t.testDiffHard;
        dom.diffBtnHard.classList.toggle('active', state.clueDiff === 'hard');
      }
    }

    buildAnimalSelectorPills();
    buildHomesMiniRack();

    // Clue Neighbors Map for selected cell in Clue Mode
    const clueNeighbors =
      isClueMode && state.selectedCell
        ? getRevealedCluesForCell(state.selectedCell.r, state.selectedCell.c).neighborMap
        : {};

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
        rightHome.classList.toggle('active-path', state.mode !== 'clue' && activeN === n);
        rightHome.classList.toggle('reached-home', state.mode !== 'clue' && done);
      }
    }

    // Update every cell in the upper-right triangle
    for (let r = 1; r <= 9; r++) {
      for (let c = r; c <= 9; c++) {
        const cell = document.getElementById(`cell-${r}-${c}`);
        if (!cell) continue;
        const key = `${r}-${c}`;
        const isDiag = r === c;
        const solved = isCellSolved(r, c);
        const isSelected =
          state.selectedCell && state.selectedCell.r === r && state.selectedCell.c === c;
        const onPath = activePathSet.has(key);
        const isClueNeighbor = !!clueNeighbors[key];

        cell.classList.toggle('selected-cell', !!isSelected);
        cell.classList.toggle('on-active-path', onPath);
        cell.classList.toggle(
          'dimmed-cell',
          activeN > 0 && !onPath && !isClueMode
        );
        cell.classList.toggle('clue-neighbor', isClueNeighbor);

        // Remove any old clue tag
        const oldTag = cell.querySelector('.clue-tag');
        if (oldTag) oldTag.remove();

        if (isClueNeighbor && isClueMode) {
          const clueInfo = clueNeighbors[key];
          const tag = document.createElement('span');
          tag.className = 'clue-tag';
          tag.textContent = clueInfo.diff || clueInfo.rel || '';
          cell.appendChild(tag);
        }

        if (isDiag) {
          // Diagonal square cells are always solved anchor stones
          cell.classList.add('solved-cell', 'is-diagonal');
          cell.classList.remove('empty-cell');
          continue;
        }

        // Upper triangle interactive cells (r < c):
        if (isClueMode) {
          const isRevealed = !!state.clueRevealed[key];
          cell.classList.toggle('solved-cell', isRevealed);
          cell.classList.toggle('empty-cell', !isRevealed);
          cell.classList.toggle('clue-revealed', isRevealed);

          const box = document.getElementById(`cellBox-${r}-${c}`);
          if (box) {
            if (isRevealed) {
              cell.classList.remove('clue-ready', 'clue-fog', 'test-hole');
              box.innerHTML = `<span class="revealed-num">${r * c}</span>`;
            } else {
              // Hidden tile: check how many clues surround it
              const cellClues = getRevealedCluesForCell(r, c);
              const hasClues = cellClues.count > 0;
              cell.classList.toggle('clue-ready', hasClues);
              cell.classList.toggle('clue-fog', !hasClues);
              cell.classList.add('test-hole');

              if (isSelected) {
                box.innerHTML = `<span>${state.typedValue !== '' ? state.typedValue : '?'}</span>`;
              } else if (hasClues) {
                box.innerHTML = `
                  <div class="clue-beacon" title="${cellClues.count} clues nearby">
                    <span class="beacon-lens">🔍</span>
                    <span class="beacon-count">${cellClues.count}</span>
                  </div>
                `;
              } else {
                box.innerHTML = `<span class="clue-fog-icon">?</span>`;
              }
            }
          }
        } else {
          // Story Mode
          cell.classList.toggle('solved-cell', solved);
          cell.classList.toggle('empty-cell', !solved);
          cell.classList.remove('clue-ready', 'clue-fog', 'clue-revealed', 'test-hole');

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
    const isCompactBar = window.innerWidth <= 760 || window.innerHeight <= 520;
    if (dom.viewToggleIcon && dom.viewToggleLabel) {
      dom.viewToggleIcon.textContent = isPathView ? '🗺️' : '🐾';
      dom.viewToggleLabel.textContent =
        state.lang === 'zh'
          ? isPathView ? '九九表' : '動物路徑'
          : isPathView ? '9×9 Table' : 'Path';
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
    document.querySelectorAll('.fp-stone.has-walker').forEach((el) => {
      el.classList.remove('has-walker');
    });

    let targetStone = null;
    if (stopInfo.type === 'HOME') {
      targetStone = document.getElementById(`fpStone-home-${focusAnimal}`);
    } else if (stopInfo.type === 'CELL') {
      targetStone = document.getElementById(`fpStone-${stopInfo.r}-${stopInfo.c}`);
      if (targetStone) targetStone.classList.add('has-walker');
    } else {
      targetStone = document.getElementById(`fpStone-1-${focusAnimal}`);
    }

    if (targetStone && dom.fpTrailWrap) {
      const wrapRect = dom.fpTrailWrap.getBoundingClientRect();
      const stoneRect = targetStone.getBoundingClientRect();
      if (wrapRect.width > 0 && stoneRect.width > 0) {
        if (stopInfo.type === 'TOP') {
          // Starting edge perched on the top-left roof of the first stone (above the number box!)
          fpWalker.style.left = `${stoneRect.left - wrapRect.left + 14}px`;
          fpWalker.style.top = `${stoneRect.top - wrapRect.top - 4}px`;
        } else if (stopInfo.type === 'HOME') {
          // Perched on the top-right roof of the Home stone
          fpWalker.style.left = `${stoneRect.right - wrapRect.left - 14}px`;
          fpWalker.style.top = `${stoneRect.top - wrapRect.top - 2}px`;
        } else {
          // Perched on the TOP-RIGHT ROOF of the solved stone (inside the overhead walking lane),
          // completely above the white `.fp-stone-val` number box so the number is 100% untouched!
          fpWalker.style.left = `${stoneRect.right - wrapRect.left - 12}px`;
          fpWalker.style.top = `${stoneRect.top - wrapRect.top - 4}px`;
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
    const isClueMode = state.mode === 'clue' || state.mode === 'test';
    const walker = document.getElementById('activeWalkerSprite');

    // In Clue Mode, animal icons do not move in the triangle board!
    if (isClueMode) {
      if (walker) walker.classList.add('hidden');
      if (dom.walkerLayer) dom.walkerLayer.classList.add('hidden');
      if (dom.journeyGuideCard) dom.journeyGuideCard.classList.add('hidden');
      document.querySelectorAll('.tri-cell.has-walker').forEach((el) => {
        el.classList.remove('has-walker');
      });
      return;
    }

    if (walker) walker.classList.remove('hidden');
    if (dom.walkerLayer) dom.walkerLayer.classList.remove('hidden');
    if (dom.journeyGuideCard) dom.journeyGuideCard.classList.remove('hidden');

    const t = I18N[state.lang];
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
    const isMobileScreen = window.innerWidth <= 760 || window.innerHeight <= 520;
    if (stopInfo.type === 'HOME') {
      targetEl = document.getElementById(`rightHome-${focusAnimal}`);
    } else if (stopInfo.type === 'TOP') {
      targetEl = document.getElementById(`topDock-${focusAnimal}`);
    } else {
      targetEl = document.getElementById(`cell-${stopInfo.r}-${stopInfo.c}`);
      if (targetEl) {
        // Always mark this cell with `has-walker` on ALL devices (PC, iPad, iPhone)
        // so the solved number shifts to the bottom-left while the animal perches on the top-right!
        targetEl.classList.add('has-walker');
      }
    }

    if (targetEl && dom.boardFrame) {
      const boardRect = dom.boardFrame.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      if (boardRect.width > 0 && targetRect.width > 0) {
        if (stopInfo.type === 'CELL') {
          // Perch the animal on the TOP-RIGHT corner rim of the cell while `.has-walker`
          // places the solved number in the BOTTOM-LEFT of the cell — 100% zero overlap!
          const offsetX = isMobileScreen ? 3 : 6;
          const offsetY = isMobileScreen ? 2 : 5;
          const cornerX = targetRect.right - boardRect.left - offsetX;
          const cornerY = targetRect.top - boardRect.top + offsetY;
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

  function triggerWalkerCelebration(r, c, animalIdx = 1) {
    if (state.mode === 'clue' || state.mode === 'test') {
      return; // In clue mode, animal icons stay at their docks/homes and do not move in the triangle
    }
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
   * 9B. ROW & COLUMN SHINE + ANIMAL DANCE CELEBRATION (CRACKED NUMBER)
   * -------------------------------------------------------------------------- */
  function triggerRowColShineAndAnimalDance(r, c) {
    const expected = r * c;
    const animalRow = ANIMALS[r];
    const animalCol = ANIMALS[c];

    // Collect elements along Column c (from top dock, col header, down to (r, c) and (c, c))
    const colElements = [];
    const topDock = document.getElementById(`topDock-${c}`);
    const colHeader = document.getElementById(`colHeader-${c}`);
    if (topDock) colElements.push(topDock);
    if (colHeader) colElements.push(colHeader);

    for (let rowIdx = 1; rowIdx <= Math.min(r, c); rowIdx++) {
      const cell = document.getElementById(`cell-${rowIdx}-${c}`);
      if (cell) colElements.push(cell);
    }

    // Collect elements along Row r (from row header, diagonal across Row r to right home)
    const rowElements = [];
    const rowHeader = document.getElementById(`rowHeader-${r}`);
    const rightHome = document.getElementById(`rightHome-${r}`);
    if (rowHeader) rowElements.push(rowHeader);

    for (let colIdx = r; colIdx <= 9; colIdx++) {
      const cell = document.getElementById(`cell-${r}-${colIdx}`);
      if (cell) rowElements.push(cell);
    }
    if (rightHome) rowElements.push(rightHome);

    const intersectionCell = document.getElementById(`cell-${r}-${c}`);

    // Apply shining classes
    colElements.forEach((el) => el.classList.add('shine-col'));
    rowElements.forEach((el) => el.classList.add('shine-row'));
    if (intersectionCell) {
      intersectionCell.classList.add('shine-intersection');
    }

    // Glowing downward arrows along Column c pointing toward (r, c)
    const activeArrows = [];
    for (let rowIdx = 1; rowIdx < r; rowIdx++) {
      const cell = document.getElementById(`cell-${rowIdx}-${c}`);
      if (cell) {
        const arrow = document.createElement('div');
        arrow.className = 'shine-arrow arrow-down';
        arrow.textContent = '⬇️';
        cell.appendChild(arrow);
        activeArrows.push(arrow);
      }
    }

    // Glowing rightward arrows along Row r pointing toward (r, c)
    for (let colIdx = r; colIdx < c; colIdx++) {
      const cell = document.getElementById(`cell-${r}-${colIdx}`);
      if (cell) {
        const arrow = document.createElement('div');
        arrow.className = 'shine-arrow arrow-right';
        arrow.textContent = '➡️';
        cell.appendChild(arrow);
        activeArrows.push(arrow);
      }
    }

    // Corresponding Animal Dance: top dock (Col animal) and right home (Row animal)
    // In Clue Mode, the right-side animal icons stay completely steady and never wobble
    if (topDock && state.mode !== 'clue') {
      topDock.classList.add('animal-dancing');
    }

    if (rightHome && state.mode !== 'clue') {
      rightHome.classList.add('animal-dancing');
    }

    // Cheerful Cat message highlighting the row & col animals dancing
    dom.catSpeechText.textContent =
      state.lang === 'zh'
        ? `✨ ${animalRow.name[state.lang]}（第 ${r} 列）與 ${animalCol.name[state.lang]}（第 ${c} 行）開心地跳起舞來了！${r} × ${c} = ${expected} 破解成功！🎉`
        : `✨ ${animalRow.name[state.lang]} (Row ${r}) & ${animalCol.name[state.lang]} (Col ${c}) are dancing! ${r} × ${c} = ${expected} cracked! 🎉`;

    // Clean up animation classes after 2.2 seconds
    setTimeout(() => {
      colElements.forEach((el) => el.classList.remove('shine-col'));
      rowElements.forEach((el) => el.classList.remove('shine-row'));
      if (intersectionCell) {
        intersectionCell.classList.remove('shine-intersection');
      }
      if (topDock) topDock.classList.remove('animal-dancing');
      if (rightHome) rightHome.classList.remove('animal-dancing');
      activeArrows.forEach((arr) => {
        if (arr.parentNode) arr.parentNode.removeChild(arr);
      });
    }, 2200);
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
    if (state.mode === 'test') {
      dom.activeAnimalBadge.textContent = t.testStepLabel;
    } else {
      dom.activeAnimalBadge.textContent =
        isCompactPhone
          ? `${animalForStep.emoji} ${animalForStep.name[state.lang]}`
          : t.activeStepLabel(animalForStep.emoji, animalForStep.name[state.lang]);
    }

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
    const isClueMode = state.mode === 'clue' || state.mode === 'test';
    if (isClueMode) {
      if (dom.activeAnimalBadge) {
        dom.activeAnimalBadge.textContent = t.testStepLabel;
      }
      if (dom.testClueBox) {
        dom.testClueBox.classList.remove('hidden');
        if (dom.testClueHeader) {
          dom.testClueHeader.textContent = t.testClueHeading;
        }
        if (dom.testCluesList) {
          dom.testCluesList.innerHTML = '';
          const cellClues = getRevealedCluesForCell(r, c);
          const left = cellClues.neighborMap[`${r}-${c - 1}`];
          const right = cellClues.neighborMap[`${r}-${c + 1}`];
          const top = cellClues.neighborMap[`${r - 1}-${c}`];
          const bottom = cellClues.neighborMap[`${r + 1}-${c}`];

          if (cellClues.count === 0) {
            const noClueItem = document.createElement('div');
            noClueItem.className = 'clue-item-text';
            noClueItem.innerHTML =
              state.lang === 'zh'
                ? `💡 <strong>四周暫無已揭開的鄰居</strong>：建議先點擊旁邊有 🔍 標記的格子獲得線索喔！`
                : `💡 <strong>No revealed neighbors yet</strong>: Try solving a nearby 🔍 tile first to unlock clues!`;
            dom.testCluesList.appendChild(noClueItem);

            dom.catSpeechText.textContent =
              state.lang === 'zh'
                ? `Ning，這格四周都還在迷霧中喔！建議先解開有 🔍 標記的相鄰格子，線索就會解開囉！`
                : `Ning, this tile is still surrounded by fog! Try unlocking a nearby 🔍 tile first to reveal clues!`;
          } else {
            // 1. Horizontal Sequence Clue (Skip counting in Row r!)
            if (left && right) {
              const seq = document.createElement('div');
              seq.className = 'clue-sequence-bar';
              seq.innerHTML = `
                <span class="seq-num">${left.val}</span>
                <span class="seq-arrow">+${r} ➔</span>
                <span class="seq-target">❓</span>
                <span class="seq-arrow">+${r} ➔</span>
                <span class="seq-num">${right.val}</span>
              `;
              dom.testCluesList.appendChild(seq);
            } else if (left) {
              const seq = document.createElement('div');
              seq.className = 'clue-sequence-bar';
              seq.innerHTML = `
                <span class="seq-num">${left.val}</span>
                <span class="seq-arrow">+${r} ➔</span>
                <span class="seq-target">❓</span>
              `;
              dom.testCluesList.appendChild(seq);
            } else if (right) {
              const seq = document.createElement('div');
              seq.className = 'clue-sequence-bar';
              seq.innerHTML = `
                <span class="seq-target">❓</span>
                <span class="seq-arrow">◀ -${r}</span>
                <span class="seq-num">${right.val}</span>
              `;
              dom.testCluesList.appendChild(seq);
            } else if (top) {
              const seq = document.createElement('div');
              seq.className = 'clue-sequence-bar';
              seq.innerHTML = `
                <span class="seq-num">${top.val}</span>
                <span class="seq-arrow">⬇ +${c}</span>
                <span class="seq-target">❓</span>
              `;
              dom.testCluesList.appendChild(seq);
            } else if (bottom) {
              const seq = document.createElement('div');
              seq.className = 'clue-sequence-bar';
              seq.innerHTML = `
                <span class="seq-target">❓</span>
                <span class="seq-arrow">⬆ -${c}</span>
                <span class="seq-num">${bottom.val}</span>
              `;
              dom.testCluesList.appendChild(seq);
            }

            // Update Cat speech with direct clue guidance
            if (left) {
              dom.catSpeechText.textContent =
                state.lang === 'zh'
                  ? `Ning 請看線索：左邊是 ${left.val}，第 ${r} 列往右多 +${r}，空格是 ${left.val} + ${r} = ？`
                  : `Ning, look at the clue: left is ${left.val}. Row ${r} adds +${r}. What is ${left.val} + ${r}?`;
            } else if (top) {
              dom.catSpeechText.textContent =
                state.lang === 'zh'
                  ? `Ning 請看線索：上面是 ${top.val}，第 ${c} 行往下多 +${c}，空格是 ${top.val} + ${c} = ？`
                  : `Ning, look at the clue: top is ${top.val}. Column ${c} adds +${c}. What is ${top.val} + ${c}?`;
            } else if (right) {
              dom.catSpeechText.textContent =
                state.lang === 'zh'
                  ? `Ning 請看線索：右邊是 ${right.val}，往左減 -${r}，空格是 ${right.val} - ${r} = ？`
                  : `Ning, look at the clue: right is ${right.val}. Subtract -${r}: ${right.val} - ${r} = ?`;
            }
          }
        }
      }
      dom.visualHintBox.classList.add('hidden');
    } else {
      if (dom.testClueBox) {
        dom.testClueBox.classList.add('hidden');
      }
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
    detectAndApplyDeviceProfile();
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
      if (state.mode === 'clue' || state.mode === 'test' || state.mode === 'detective') {
        state.clueRevealed[`${r}-${c}`] = true;
      } else {
        state.solvedMap[`${r}-${c}`] = true;
      }
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
        cellEl.classList.remove('just-solved', 'clue-newly-unlocked');
        void cellEl.offsetWidth;
        cellEl.classList.add('just-solved', 'clue-newly-unlocked');
        const rect = cellEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        spawnCellSparkle(cx, cy, ['✨', '⭐']);
        spawnFloatingScore(cx, cy - 10, `+10 ⭐ 🔍`);
      }

      // Voice encouragement (Chinese chant or English multiplication)
      if (state.lang === 'zh') {
        speakText(`${getChineseFormulaChant(r, c, expected)}！`);
      } else {
        speakText(`${r} times ${c} is ${expected}!`);
      }

      refreshBoardVisuals();
      triggerWalkerCelebration(r, c, cheeringAnimalIdx);
      triggerRowColShineAndAnimalDance(r, c);

      // Advance to next target cell
      if (state.mode === 'clue' || state.mode === 'test' || state.mode === 'detective') {
        advanceToNextTargetCell();
      } else {
        checkNewlyCompletedAnimalHomes();
        advanceToNextTargetCell();
      }
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
    detectAndApplyDeviceProfile();
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

    if (dom.btnCelebClose) {
      dom.btnCelebClose.onclick = () => {
        dom.btnCelebContinue.click();
      };
    }
    dom.celebrationOverlay.onclick = (e) => {
      if (e.target === dom.celebrationOverlay) {
        dom.btnCelebContinue.click();
      }
    };

    dom.celebrationOverlay.scrollTop = 0;
    if (dom.celebrationModal) dom.celebrationModal.scrollTop = 0;
    dom.celebrationOverlay.classList.remove('hidden');
  }

  function advanceToNextTargetCell() {
    if (state.mode === 'clue' || state.mode === 'test' || state.mode === 'detective') {
      const revealedCount = Object.keys(state.clueRevealed).length;
      if (revealedCount >= 36) {
        showClueSweeperVictory();
        return;
      }

      // Check unsolved immediate neighbors of current cell (they now have brand new clues!)
      if (state.selectedCell) {
        const { r, c } = state.selectedCell;
        const candidateNeighbors = [
          { r, c: c - 1 },
          { r, c: c + 1 },
          { r: r - 1, c },
          { r: r + 1, c }
        ].filter((p) => p.r >= 1 && p.c <= 9 && p.r < p.c && !state.clueRevealed[`${p.r}-${p.c}`]);

        if (candidateNeighbors.length > 0) {
          candidateNeighbors.sort((a, b) => {
            return (
              getRevealedCluesForCell(b.r, b.c).count -
              getRevealedCluesForCell(a.r, a.c).count
            );
          });
          state.selectedCell = candidateNeighbors[0];
          state.typedValue = '';
          refreshBoardVisuals();
          return;
        }
      }

      // If no immediate neighbors unrevealed, pick the unrevealed cell with the highest clue count
      const allUnrevealed = [];
      for (let r = 1; r <= 8; r++) {
        for (let c = r + 1; c <= 9; c++) {
          if (!state.clueRevealed[`${r}-${c}`]) {
            allUnrevealed.push({ r, c });
          }
        }
      }

      allUnrevealed.sort((a, b) => {
        return (
          getRevealedCluesForCell(b.r, b.c).count -
          getRevealedCluesForCell(a.r, a.c).count
        );
      });

      if (allUnrevealed.length > 0) {
        state.selectedCell = allUnrevealed[0];
        state.typedValue = '';
        refreshBoardVisuals();
        return;
      }

      showClueSweeperVictory();
      return;
    }

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
    }
  }

  /* --------------------------------------------------------------------------
   * 12B. CLUE MODE: MINESWEEPER STYLE MAP UNLOCK & CHAIN-REACTION CLUES ENGINE
   * -------------------------------------------------------------------------- */
  function getRevealedCluesForCell(r, c) {
    const clues = [];
    const neighborMap = {};

    // 1. Left Neighbor: (r, c - 1)
    if (c - 1 >= r) {
      const isDiag = c - 1 === r;
      const isRev = isDiag || !!state.clueRevealed[`${r}-${c - 1}`];
      if (isRev) {
        const val = isDiag ? r * r : r * (c - 1);
        const clueObj = {
          dir: 'left',
          r: r,
          c: c - 1,
          val: val,
          diff: `+${r}`,
          math: `${val} + ${r} = ${r * c}`,
          isDiag: isDiag
        };
        clues.push(clueObj);
        neighborMap[`${r}-${c - 1}`] = clueObj;
      }
    }

    // 2. Right Neighbor: (r, c + 1)
    if (c + 1 <= 9) {
      const isRev = !!state.clueRevealed[`${r}-${c + 1}`];
      if (isRev) {
        const val = r * (c + 1);
        const clueObj = {
          dir: 'right',
          r: r,
          c: c + 1,
          val: val,
          diff: `-${r}`,
          math: `${val} - ${r} = ${r * c}`,
          isDiag: false
        };
        clues.push(clueObj);
        neighborMap[`${r}-${c + 1}`] = clueObj;
      }
    }

    // 3. Top Neighbor: (r - 1, c)
    if (r - 1 >= 1) {
      const isDiag = r - 1 === c;
      const isRev = isDiag || !!state.clueRevealed[`${r - 1}-${c}`];
      if (isRev) {
        const val = isDiag ? c * c : (r - 1) * c;
        const clueObj = {
          dir: 'top',
          r: r - 1,
          c: c,
          val: val,
          diff: `+${c}`,
          math: `${val} + ${c} = ${r * c}`,
          isDiag: isDiag
        };
        clues.push(clueObj);
        neighborMap[`${r - 1}-${c}`] = clueObj;
      }
    }

    // 4. Bottom Neighbor: (r + 1, c)
    if (r + 1 <= c) {
      const isDiag = r + 1 === c;
      const isRev = isDiag || !!state.clueRevealed[`${r + 1}-${c}`];
      if (isRev) {
        const val = isDiag ? c * c : (r + 1) * c;
        const clueObj = {
          dir: 'bottom',
          r: r + 1,
          c: c,
          val: val,
          diff: `-${c}`,
          math: `${val} - ${c} = ${r * c}`,
          isDiag: isDiag
        };
        clues.push(clueObj);
        neighborMap[`${r + 1}-${c}`] = clueObj;
      }
    }

    return { clues, count: clues.length, neighborMap };
  }

  // Backward compatibility wrapper
  function getDetectiveNeighborMap(r, c) {
    return getRevealedCluesForCell(r, c).neighborMap;
  }

  function initClueMode(diff = state.clueDiff) {
    state.clueDiff = diff || 'medium';
    state.testDiff = state.clueDiff;
    const seedMap = { easy: 12, medium: 6, hard: 2 };
    const seedCount = seedMap[state.clueDiff] || 6;

    // Upper triangle cells: 1 <= r < c <= 9 (36 cells)
    const candidates = [];
    for (let r = 1; r <= 8; r++) {
      for (let c = r + 1; c <= 9; c++) {
        candidates.push({ r, c });
      }
    }

    // Shuffle
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }

    const seeds = candidates.slice(0, seedCount);
    state.clueSeeds = new Set(seeds.map((s) => `${s.r}-${s.c}`));
    state.clueRevealed = {};

    seeds.forEach((s) => {
      const k = `${s.r}-${s.c}`;
      state.clueRevealed[k] = true;
    });

    // Unrevealed candidates sorted by number of starting clues
    const unrevealed = candidates.slice(seedCount);
    unrevealed.sort((a, b) => {
      const ca = getRevealedCluesForCell(a.r, a.c).count;
      const cb = getRevealedCluesForCell(b.r, b.c).count;
      return cb - ca;
    });

    state.selectedCell = unrevealed[0] || null;
    state.typedValue = '';
    state.mistakes = 0;
    state.showHintDots = false;

    startTimer();

    const t = I18N[state.lang];
    dom.catSpeechText.textContent = t.catWelcomeTest;
    refreshBoardVisuals();
  }

  function initTestMode(diff) {
    initClueMode(diff);
  }

  function showClueSweeperVictory() {
    stopTimer();
    playAnimalHomeFanfare();
    const t = I18N[state.lang];
    dom.celebrationOverlay.classList.remove('hidden');

    const timeStr = formatTime(state.timerSeconds);

    dom.celebSpecialBadge.textContent =
      state.lang === 'zh'
        ? '🏆 乘法線索掃雷大師！整張地圖完全掃清！ 🏆'
        : '🏆 MASTER CLUE SWEEPER! FULL MAP CLEARED! 🏆';

    dom.celebHeroWrap.innerHTML = `
      <span class="celeb-prop prop-left">🔍</span>
      <span class="celeb-animal-emoji">🐱</span>
      <span class="celeb-prop prop-right">⭐</span>
    `;
    dom.celebHouseEmoji.textContent = '🏆';
    dom.celebMoveDesc.textContent =
      state.lang === 'zh'
        ? `太厲害了 Ning！妳在 ${timeStr} 內推導並解開了全部 36 個乘法格子！`
        : `Ning deduced and unlocked all 36 multiplication tiles in ${timeStr}! Amazing job!`;

    dom.celebTitle.textContent = t.celebTestTitle;
    dom.celebSubtitle.textContent = t.celebTestSub(36, timeStr, state.mistakes);

    dom.celebPathBadges.innerHTML = '';
    const badge = document.createElement('span');
    badge.className = 'celeb-fact-pill';
    badge.textContent =
      state.lang === 'zh'
        ? `🔍 難度：${state.clueDiff.toUpperCase()} • 錯誤：${state.mistakes} 次`
        : `🔍 Difficulty: ${state.clueDiff.toUpperCase()} • Mistakes: ${state.mistakes}`;
    dom.celebPathBadges.appendChild(badge);

    dom.btnCelebContinue.textContent = t.nextTestBtn;
    dom.btnCelebContinue.onclick = () => {
      dom.celebrationOverlay.classList.add('hidden');
      initClueMode();
    };

    spawnConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 90, [
      '🔍',
      '⭐',
      '✨',
      '🐱',
      '🏆',
      '🎉'
    ]);
  }

  function showTestCelebration() {
    showClueSweeperVictory();
  }

  /* --------------------------------------------------------------------------
   * 13. MODE SWITCHING, TIMER & RESET
   * -------------------------------------------------------------------------- */
  function setGameMode(mode) {
    state.mode = (mode === 'test' || mode === 'clue') ? 'clue' : 'story';
    dom.btnModeStory.classList.toggle('active', state.mode === 'story');
    dom.btnModeTest.classList.toggle('active', state.mode === 'clue');
    dom.timerPill.classList.toggle('hidden', state.mode !== 'clue');

    const t = I18N[state.lang];
    if (state.mode === 'story') {
      stopTimer();
      let startAnimal = 1;
      for (let n = 1; n <= 9; n++) {
        if (!isAnimalPathComplete(n)) {
          startAnimal = n;
          break;
        }
      }
      selectAnimalPath(startAnimal);
    } else {
      // Clue Mode (Minesweeper Style Map Deduction)
      state.activeAnimal = 0;
      initClueMode();
    }
    detectAndApplyDeviceProfile();
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
    state.clueRevealed = {};
    state.clueSeeds = new Set();
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

  function spawnCellSparkle(x, y, icons = ['✨', '⭐']) {
    resizeCanvas();
    const colors = ['#ffd43b', '#69db7c', '#4dabf7', '#ffa94d'];

    // 1. Tiny gentle golden ring restricted to cell boundary (maxRadius ~20px)
    shockwaves.push({
      x,
      y,
      radius: 4,
      maxRadius: 20,
      alpha: 0.65,
      color: '#ffd43b'
    });

    // 2. Just 8 small, slow-moving micro star sparks (staying within ~25px)
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 0.9 + Math.random() * 1.5;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        size: 3 + Math.random() * 3,
        color: colors[i % colors.length],
        alpha: 0.85,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
        isStar: true
      });
    }

    // 3. Just 1 or 2 small cute floating sparkles (size 13-14px)
    const celebIcons = Array.isArray(icons) && icons.length > 0 ? icons : ['✨', '⭐'];
    const emojiCount = 2;
    for (let j = 0; j < emojiCount; j++) {
      const angle = (Math.PI * 2 * j) / emojiCount;
      const speed = 0.8 + Math.random() * 0.8;
      emojiSprites.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: -0.8 - Math.random() * 0.8,
        size: 13 + Math.random() * 3,
        icon: celebIcons[j % celebIcons.length] || '✨',
        alpha: 0.85,
        rot: (Math.random() - 0.5) * 0.2,
        vRot: 0.015
      });
    }

    if (!animFrameId) {
      animFrameId = requestAnimationFrame(stepParticles);
    }
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
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
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

    // Mode Switcher (Story vs Clue Mode)
    dom.btnModeStory.addEventListener('click', () => setGameMode('story'));
    dom.btnModeTest.addEventListener('click', () => setGameMode('clue'));

    // Clue Mode Toolbar Buttons (Difficulty & New Map)
    if (dom.diffBtnEasy) {
      dom.diffBtnEasy.addEventListener('click', () => initClueMode('easy'));
    }
    if (dom.diffBtnMedium) {
      dom.diffBtnMedium.addEventListener('click', () => initClueMode('medium'));
    }
    if (dom.diffBtnHard) {
      dom.diffBtnHard.addEventListener('click', () => initClueMode('hard'));
    }
    if (dom.btnNewTest) {
      dom.btnNewTest.addEventListener('click', () => initClueMode());
    }

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

    // Reposition walker sprite on window resize and orientation changes
    const handleLayoutChange = () => {
      detectAndApplyDeviceProfile();
      resizeCanvas();
      updateJourneyCardAndWalker();
      updateFocusedPathStage();
    };
    window.addEventListener('resize', handleLayoutChange);
    window.addEventListener('orientationchange', () => {
      setTimeout(handleLayoutChange, 100);
      setTimeout(handleLayoutChange, 350);
    });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleLayoutChange);
    }
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

    const isDesktopOS = /Windows|Macintosh|Linux/i.test(ua) && !/Android|iPhone|iPad/i.test(ua);
    const isMobile =
      !isIPad &&
      !isDesktopOS &&
      (isIPhone ||
       (isAndroid && /Mobile/.test(ua)) ||
       (maxTouch > 0 && vw <= 768) ||
       (vw < 640));

    const isTablet =
      isIPad ||
      (!isMobile && !isDesktopOS &&
        (isAndroid || (vw >= 768 && vw <= 1380 && maxTouch > 0)));

    const isDesktop = !isMobile && !isTablet;

    // Default to Focused Animal Path View ONLY on mobile portrait!
    // On iPad, tablet, desktop, or any landscape device, default strictly to the 9x9 Triangle Table!
    if (!state.userToggledView) {
      state.viewMode = isMobile && orientation === 'portrait' ? 'path' : 'table';
    }

    const root = document.documentElement;
    root.style.setProperty('--app-height', `${vh}px`);
    root.style.setProperty('--app-width', `${vw}px`);

    // Deterministically compute exact board row heights in pixels so iOS WebKit
    // never stretches or overflows the 11-row multiplication grid!
    let cellH = 38;
    let topRowH = 48;
    let numRowH = 30;

    if (isMobile && orientation === 'landscape') {
      // iPhone Horizontal: Dynamically calculate cell height so all 11 rows of the triangle fit within the screen height!
      const availH = Math.max(150, Math.min(260, vh - 44));
      cellH = Math.max(14, Math.min(22, Math.floor(availH / 11.35)));
      topRowH = Math.floor(cellH * 1.2);
      numRowH = Math.floor(cellH * 0.82);
    } else if (isMobile) {
      // iPhone Vertical
      cellH = 26;
      topRowH = 32;
      numRowH = 20;
    } else if (orientation === 'portrait') {
      // iPad / Tablet Portrait
      const reservedVertical = 48 + 215 + 32;
      const maxBoardGridH = Math.max(300, Math.min(vh - reservedVertical, Math.floor(vw * 0.88)));
      cellH = Math.max(28, Math.floor(maxBoardGridH / 11.1));
      topRowH = Math.floor(cellH * 1.26);
      numRowH = Math.floor(cellH * 0.82);
    } else {
      // PC Desktop & iPad Landscape: Sized dynamically to fill the screen without scrolling or excess empty space!
      const isIPadLandscape =
        (isIPad || isTablet || (vw >= 768 && vw <= 1380)) && orientation === 'landscape';
      const hasSelector = vw > 1220 && vh > 780 && state.mode === 'story';
      const headerAllowance = hasSelector ? 80 : 42;
      const clueBarAllowance = state.mode === 'clue' ? 38 : 0;
      const sidebarW = isIPadLandscape
        ? Math.max(260, Math.min(310, Math.floor(vw * 0.26)))
        : 285;
      const paddingAllowance = 12;
      const reservedH = headerAllowance + clueBarAllowance + paddingAllowance + 28;
      const availH = Math.max(220, vh - reservedH);
      const availW = Math.max(320, vw - sidebarW - 44 - 72);
      // Grid dimensions (11 rows total: 1 top animal row + 1 number header row + 9 table cell rows):
      // Ratio: topRowH = 1.18 * cellH, numRowH = 0.78 * cellH, 9 * cellH => 10.96 * cellH
      const maxByH = Math.floor(availH / 10.96);
      const maxByW = Math.floor(availW / 9.0);
      const optimalCellH = Math.min(maxByH, maxByW);
      cellH = Math.max(22, Math.min(56, optimalCellH));
      topRowH = Math.floor(cellH * 1.18);
      numRowH = Math.floor(cellH * 0.78);
    }

    root.style.setProperty('--cell-h', `${cellH}px`);
    root.style.setProperty('--top-row-h', `${topRowH}px`);
    root.style.setProperty('--num-row-h', `${numRowH}px`);

    root.classList.toggle('mode-clue', state.mode === 'clue');
    document.body.classList.toggle('mode-clue', state.mode === 'clue');

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
