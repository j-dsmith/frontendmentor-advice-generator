const main = document.querySelector("main");
const adviceCard = document.getElementById("advice-card");

const divider = document.createElement("img");

if (screen.width >= 1920) {
  divider.src = "./images/pattern-divider-desktop.svg";
} else {
  divider.src = "./images/pattern-divider-mobile.svg";
}

adviceCard.append(divider);

async function getAdvice() {
  const response = await axios.get("https://api.adviceslip.com/advice");

  if (response) {
    const {
      data: {
        slip: { id, advice },
      },
    } = response;
    return { id, advice };
  }
}

async function renderAdvice() {
  const res = await getAdvice();
  const { id, advice } = res;

  const adviceId = document.createElement("h1");
  adviceId.id = "advice-id";
  adviceId.innerText = `Advice #${id}`;

  const adviceText = document.createElement("p");
  adviceText.id = "advice-text";
  adviceText.innerText = `"${advice}"`;

  const divider = document.createElement("img");
  if (screen.width >= 1920) {
    divider.src = "./images/pattern-divider-desktop.svg";
  } else {
    divider.src = "./images/pattern-divider-mobile.svg";
  }

  const shuffleBtn = document.createElement("button");
  shuffleBtn.id = "shuffle-btn";
  shuffleBtn.addEventListener("click", () => location.reload());

  const diceIcon = document.createElement("img");
  diceIcon.src = "./images/icon-dice.svg";

  adviceCard.innerHTML = "";
  adviceCard.prepend(adviceId);
  adviceCard.append(adviceText);
  adviceCard.append(divider);
  adviceCard.append(shuffleBtn);
  shuffleBtn.append(diceIcon);
  main.append(adviceCard);
}

renderAdvice();
