const attemptInput = document.querySelector(".inputField");
const attemptButton = document.querySelector(".jsButton");
const messages = document.querySelector(".textField");
const easyBtn = document.querySelector(".easyBtn");
const normalBtn = document.querySelector(".normalBtn");
const hardBtn = document.querySelector(".hardBtn");

let difficulty = "";
let ans;
let hearts = 5;

function displayHearts(hearts) {
  const heartContainer = document.querySelector(".heart-container");
  heartContainer.innerHTML = "";

  if (hearts > 0) {
    for (let i = 0; i < hearts; i++) {
      const img = document.createElement("img");
      img.src = "heart.png";
      heartContainer.appendChild(img);
    }
  } else {
    heartContainer.innerHTML = `<h2>Du förlorade!</h2>`;
    setTimeout(() => {
      heartContainer.innerHTML = ``;
      hearts = 5;
      displayHearts(hearts);
      messages.textContent = "";
    }, 2000);
  }
}

function setDifficulty(level) {
  difficulty = level;
  messages.textContent = "";
  messages.style.color = "black";

  switch (difficulty) {
    case "easy":
      ans = Math.floor(Math.random() * 10);
      break;
    case "normal":
      ans = Math.floor(Math.random() * 50);
      break;
    case "hard":
      ans = Math.floor(Math.random() * 100);
      break;
    default:
      messages.textContent("Starta spelet genom att välja svårighetsgrad");
  }
}

easyBtn.addEventListener("click", () => setDifficulty("easy"));
normalBtn.addEventListener("click", () => setDifficulty("normal"));
hardBtn.addEventListener("click", () => setDifficulty("hard"));

attemptButton.addEventListener("click", function () {
  if (difficulty === "") {
    messages.textContent = "";
    messages.textContent = "Starta spelet genom att välja svårighetsgrad";
    return;
  }

  let attempt = Number(attemptInput.value);

  if (isNaN(attempt) === true || attempt === null) {
    messages.textContent = "";
    messages.textContent = "Du måste skriva in en siffra";
    return;
  }
  gameLoop(attempt);
  displayHearts(hearts);
});

function gameLoop(attempt) {
  if (hearts <= 0) {
    messages.textContent = "Du förlorade!";
    difficulty = "";
    return;
  }

  messages.textContent = "";
  if (attempt > ans) {
    hearts--;
    messages.textContent = "";
    messages.textContent = "Lägre!";
    displayHearts(hearts);
  } else if (attempt < ans) {
    hearts--;
    messages.textContent = "";
    messages.textContent = "Högre!";
    displayHearts(hearts);
  } else if (attempt === ans) {
    hearts = 5;
    messages.textContent = "";
    messages.style.color = "#00852aff";
    messages.textContent = `Rätt! Siffran var ${ans}`;
  } else if (hearts === 0 && attempt === ans) {
    hearts = 5;
    messages.textContent = "";
    messages.style.color = "#00852aff";
    messages.textContent = `Rätt! Siffran var ${ans}`;
  }
  displayHearts(hearts);
}
