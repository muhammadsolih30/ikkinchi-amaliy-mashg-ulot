const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");
let playerX = window.innerWidth / 2 - 25;
let speed = 7;

function movePlayer(e) {
  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= speed;
  } else if (e.key === "ArrowRight" && playerX < window.innerWidth - 50) {
    playerX += speed;
  }
  player.style.left = playerX + "px";
}

let score = 0;
function createObstacle() {
  const obs = document.createElement("div");
  obs.classList.add("obstacle");
  obs.style.left = Math.random() * (window.innerWidth - 50) + "px";
  gameArea.appendChild(obs);

  let obsY = -100;
  const fall = setInterval(() => {
    obsY += 5;
    obs.style.top = obsY + "px";

    if (obsY > window.innerHeight) {
      clearInterval(fall);
      obs.remove();
      score++;
    }

    const px = player.offsetLeft;
    const py = player.offsetTop;
    const ox = obs.offsetLeft;
    const oy = obs.offsetTop;

    if (
      ox < px + 50 &&
      ox + 50 > px &&
      oy < py + 100 &&
      oy + 100 > py
    ) {
      alert("Game Over! Ball: " + score);
      location.reload();
    }
  }, 20);
}

setInterval(createObstacle, 1500);
document.addEventListener("keydown", movePlayer);


const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");
let playerX = window.innerWidth / 2 - 25;
let speed = 7;

// Chap va o‘ng chegaralar
const leftBound = window.innerWidth / 2 - 120;
const rightBound = window.innerWidth / 2 + 120;

function movePlayer(e) {
  if (e.key === "ArrowLeft" && playerX > leftBound) {
    playerX -= speed;
  } else if (e.key === "ArrowRight" && playerX < rightBound - 50) {
    playerX += speed;
  }
  player.style.left = playerX + "px";
}
