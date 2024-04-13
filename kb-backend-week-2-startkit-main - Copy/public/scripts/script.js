const fetchGame = async url => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const addData = async () => {
  const data = await fetchGame("/game");
  const gameElement = document.querySelector(".game");
  gameElement.querySelector(".game__title").textContent = data.title;
  gameElement.querySelector(".game__description").textContent =
    data.description;
  gameElement.querySelector(".game__image").src = data.image;
  return data;
};

const object = addData();
const form = document.querySelector(".vote");

form.addEventListener("submit", async event => {
  event.preventDefault();
  const formData = new FormData(form);
  const obj = {
    id: (await object).id,
    gameplay: +formData.get("gameplay") ? +formData.get("gameplay") : 0,
    design: +formData.get("design") ? +formData.get("design") : 0,
    idea: +formData.get("idea") ? +formData.get("idea") : 0
  };
  const response = await fetch("/vote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  });
  const result = await response.json();
  document.querySelector("main").innerHTML = "";
  const ul = document.createElement("ul");
  ul.classList.add("box");
  const h2 = document.createElement("h2");
  h2.textContent = "Рейтинг игр:";
  ul.append(h2);
  result.forEach(element => {
    const li = document.createElement("li");
    li.textContent = `${element.title}: ${element.rating}`;
    ul.append(li);
  });
  const button = document.createElement("button");
  button.textContent = "Ещё одна рандомная игра";
  button.classList.add("play-again");
  ul.append(button);
  document.querySelector("main").append(ul);
  document.querySelector(".play-again").addEventListener("click", () => {
    location.reload();
  });
});

document.querySelector(".play").addEventListener("click", async () => {
  document.querySelector("#game-dialog").showModal();
  document.querySelector("#game-dialog iframe").src = (await object).link;
  document.body.style.overflow = "hidden";
});

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector("#game-dialog").close();
  document.querySelector("#game-dialog iframe").src = "";
  document.body.style.overflow = "auto";
});

function colorStars(containerSelector) {
  const targetContainer = document.querySelector(containerSelector);
  const stars = targetContainer.querySelectorAll(".star svg");
  const radio = targetContainer.querySelectorAll(".radio");
  radio.forEach((el, index) => {
    el.addEventListener("input", () => {
      stars.forEach((star, i) => {
        if (i <= index) {
          star.classList.add("colored");
        } else {
          star.classList.remove("colored");
        }
      });
    });
  });
}

colorStars(".gameplay");
colorStars(".design");
colorStars(".idea");
