const game = document.getElementById("game");
const character = document.getElementById("character");
const distanceDisplay = document.getElementById("distance");

let isJumping = false;
let speed = 5;
let distance = 0;
let backgroundX = 0;
let obstacleSpeedIncrease = 0.1;  // To‘siq tezligining o‘sishi
let obstacleIntervalTime = 1500; // To‘siq paydo bo‘lish tezligi

// Tugma bosilsa sakrash
document.addEventListener("keydown", (e) => {
  if (e.key === " " && !isJumping) jump();
});

function jump() {
  isJumping = true;
  character.style.background = "limegreen";
  let up = 0;

  const upInterval = setInterval(() => {
    if (up >= 180) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (up <= 0) {
          clearInterval(downInterval);
          character.style.bottom = "0px";
          character.style.background = "green";
          isJumping = false;
        } else {
          up -= 10;
          character.style.bottom = `${up}px`;
        }
      }, 20);
    } else {
      up += 10;
      character.style.bottom = `${up}px`;
    }
  }, 20);
}

function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.left = "800px";
  game.appendChild(obstacle);

  let obsLeft = 800;

  const move = setInterval(() => {
    if (obsLeft < -40) {
      clearInterval(move);
      obstacle.remove();

      // Qiyinchilikni oshiramiz
      speed += obstacleSpeedIncrease;
      obstacleIntervalTime = Math.max(500, obstacleIntervalTime - 50); // To‘siq tezligi oshadi
    } else {
      obsLeft -= speed;
      obstacle.style.left = obsLeft + "px";
    }

    const charRect = character.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

    if (
      charRect.bottom > obsRect.top &&
      charRect.top < obsRect.bottom &&
      charRect.right > obsRect.left &&
      charRect.left < obsRect.right
    ) {
      clearInterval(move);
      alert("Game Over! Masofa: " + Math.floor(distance) + " m");
      window.location.reload();
    }
  }, 20);

  setTimeout(createObstacle, obstacleIntervalTime); // To‘siqlar tezroq paydo bo‘ladi
}

function updateDistance() {
  distance += speed * 0.05;
  distanceDisplay.innerText = "Masofa: " + Math.floor(distance) + " m";

  // Orqa fonni sekin harakatlantiramiz
  backgroundX -= speed * 0.5; // 2 baravar sekin
  game.style.backgroundPositionX = `${backgroundX}px`;

  requestAnimationFrame(updateDistance);
}

// Boshlash
createObstacle();
updateDistance();
