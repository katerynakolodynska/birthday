const startBtn = document.getElementById("startBtn");
const magicMessage = document.querySelector(".magic-message");
const bgMusic = document.getElementById("bgMusic");
const musicBox = document.getElementById("musicBox");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
const giftBox = document.getElementById("giftBox");
const greetingSection = document.querySelector(".wrapper");
const magicalScene = document.getElementById("magicalScene");
const giftContent = document.getElementById("giftContent");
const btnGreeting = document.getElementById("btnGreeting");
const btnPuzzle = document.getElementById("btnPuzzle");
const btnSurprise = document.getElementById("btnSurprise");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let musicStarted = false;

function tryPlayMusic() {
  if (!musicStarted) {
    bgMusic.volume = 0.8;
    bgMusic
      .play()
      .then(() => {
        musicStarted = true;
        console.log("🎵 Музика грає");
      })
      .catch((err) => {
        console.warn("⛔ Не вдалося відтворити музику:", err);
      });
  }
}

const confetti = [];

function randomColor() {
  const colors = ["#ff85a2", "#fcd5ce", "#ffd6a5", "#d0f4de", "#a0c4ff"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createConfettiPiece() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: Math.random() * 8 + 2,
    color: randomColor(),
    speed: Math.random() * 2 + 1.5,
    drift: Math.random() * 3 - 1.5,
  };
}
let confettiRunning = false;

function launchConfetti() {
  if (confettiRunning) return;
  confettiRunning = true;
  confetti.length = 0;
  for (let i = 0; i < 1500; i++) {
    confetti.push(createConfettiPiece());
  }
  animateConfetti();

  setTimeout(() => {
    confettiRunning = false;
  }, 90000);
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.y += c.speed;
    c.x += c.drift;

    if (c.y > canvas.height) {
      confetti[i] = createConfettiPiece();
      confetti[i].y = 0;
    }
  });
  requestAnimationFrame(animateConfetti);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

giftBox.addEventListener("click", () => {
  tryPlayMusic();
  giftBox.style.display = "none";
  greetingSection.style.display = "block";
  magicalScene.classList.remove("hidden");
  launchConfetti();
});

startBtn.addEventListener("click", () => {
  magicMessage.classList.remove("hidden");
  musicBox.classList.remove("hidden");
  launchConfetti();
});

// 🛑 Зупинити музику при виборі будь-якого подарунка:
function stopMusic() {
  if (!bgMusic.paused) {
    bgMusic.pause();
    console.log("🛑 Музика зупинена");
  }
}

btnGreeting?.addEventListener("click", () => {
  stopMusic();
  giftContent.innerHTML =
    "💌 Дорога Настюша, бажаю тобі казкових моментів, веселих пригод і здійснення мрій! Твоя сестра тебе дуже любить! 💖";
  giftContent.style.display = "block";
});

btnSurprise?.addEventListener("click", () => {
  stopMusic();
  giftContent.innerHTML =
    "💖 💖 💖 Ти найчарівніша дівчинка! Нехай сьогоднішній день буде початком нової магічної історії!";
  giftContent.style.display = "block";
  for (let i = 0; i < 5; i++) launchConfetti();
});
