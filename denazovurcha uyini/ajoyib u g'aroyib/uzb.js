const gameArea = document.getElementById('gameArea');
const typedText = document.getElementById('typedText');
const words = ['switch', 'fair', 'extend', 'date', 'space', 'code', 'type', 'light', 'planet', 'game', 'star', 'rocket', 'orbit', 'ship', 'mission', 'galaxy'];
let activeWords = [];
let currentInput = '';

let level = 1;
let correctWords = 0;
let fallSpeed = 30;
let wordInterval = 2000;
let maxLevel = 10;
let spawnIntervalId, moveIntervalId;

function updateLevelDisplay() {
  document.title = `Bosqich: ${level}`;
}

function spawnWord() {
  const word = words[Math.floor(Math.random() * words.length)];
  const span = document.createElement('span');
  span.className = 'word';
  span.innerText = word;
  span.style.top = '0px';
  span.style.left = Math.random() * (gameArea.clientWidth - 100) + 'px';
  gameArea.appendChild(span);

  activeWords.push({ word: word, element: span, y: 0 });
}

function moveWords() {
  activeWords.forEach(obj => {
    obj.y += 1;
    obj.element.style.top = obj.y + 'px';

    if (obj.y > gameArea.clientHeight - 50) {
      obj.element.remove();
      activeWords = activeWords.filter(w => w !== obj);
    }
  });
}

function nextLevel() {
  if (level < maxLevel) {
    level++;
    correctWords = 0;
    fallSpeed = Math.max(10, fallSpeed * 0.67); // 1.5 baravar tezroq
    wordInterval = Math.max(400, wordInterval * 0.67);

    clearInterval(spawnIntervalId);
    clearInterval(moveIntervalId);

    spawnIntervalId = setInterval(spawnWord, wordInterval);
    moveIntervalId = setInterval(moveWords, fallSpeed);

    alert(`🎉 Bosqich ${level} ga o‘tdingiz!`);
    updateLevelDisplay();
  } else {
    alert('🎉 Tabriklaymiz! Siz barcha bosqichlarni yakunladingiz!');
    clearInterval(spawnIntervalId);
    clearInterval(moveIntervalId);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key.length === 1) {
    currentInput += e.key;
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
  }

  typedText.innerText = currentInput;

  let matched = false;

  for (let obj of activeWords) {
    if (obj.word.startsWith(currentInput)) {
      obj.element.style.color = 'yellow';
      matched = true;

      if (obj.word === currentInput) {
        obj.element.remove();
        activeWords = activeWords.filter(w => w !== obj);
        currentInput = '';
        typedText.innerText = '';
        correctWords++;

        if (correctWords >= 5) {
          nextLevel();
        }
        break;
      }
    } else {
      obj.element.style.color = '#00ffff';
    }
  }

  if (!matched) {
    currentInput = '';
    typedText.innerText = '';
  }
});

function startGame() {
  updateLevelDisplay();
  spawnIntervalId = setInterval(spawnWord, wordInterval);
  moveIntervalId = setInterval(moveWords, fallSpeed);
}

startGame();