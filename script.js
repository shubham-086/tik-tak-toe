let container = document.querySelector(".container");

for (let i = 0; i < 9; i++) {
  let box = document.createElement("button");
  box.classList.add("box");
  container.append(box);
}

let boxes = document.querySelectorAll(".box");
let restart = document.querySelector("#restartBtn");
let msg = document.querySelector("#msg");

let turnX = true;
let count = 0;

let patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "x";
      turnX = false;
    } else {
      box.innerText = "o";
      turnX = true;
    }
    box.disabled = true;

    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      msg.innerText = "Game Draw! Play Again";
    }
  });
});

const disableBoxes = () => {
  for (const box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  disableBoxes();
  msg.innerText = `Contratulation! Winner is ${winner}`;
};

const checkWinner = () => {
  for (const pattern of patterns) {
    let val1 = boxes[pattern[0]].innerText;
    let val2 = boxes[pattern[1]].innerText;
    let val3 = boxes[pattern[2]].innerText;

    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 === val2 && val2 === val3) {
        showWinner(val1);
        return true;
      }
    }
  }
};

restart.addEventListener("click", () => {
  count = 0;
  turnX = true;
  enableBoxes();
  msg.innerText = "";
});
