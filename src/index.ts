let order: number[] = [];
let clickedOrder: number[] = [];
let score: number = 0;

const red = document.querySelector('.red') as HTMLElement;
const blue = document.querySelector('.blue') as HTMLElement;
const yellow = document.querySelector('.yellow') as HTMLElement;
const green = document.querySelector('.green') as HTMLElement;

function shuffleOrder() {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elColor = createColorElement(order[i]);
    lightColor(elColor, Number(i) + 1);
  }
}

function lightColor(el: HTMLElement, num: number) {
  num *= 500;
  setTimeout(() => {
    el.classList.add('selected');
  }, num - 250);

  setTimeout(() => {
    el.classList.remove('selected');
  }, num - 250);
}

function checkOrder() {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length === order.length) {
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
    nextLevel();
  }
}

function userClick(color: number): any {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected');
  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkOrder();
  }, 250);
}

function createColorElement(color: number): HTMLElement {
  switch (color) {
    case 0:
      return green;
    case 1:
      return red;
    case 2:
      return yellow;
    case 3:
      return blue;
    default:
      throw new Error('Não é possível criar o elemento de cor');
  }
}

function nextLevel() {
  score++;
  shuffleOrder();
}

function gameOver() {
  alert(`Pontuação: ${score}\nVocê perdeu o jogo...`);
  order = [];
  clickedOrder = [];

  playGame();
}

function playGame() {
  alert('Bem vindo ao Genius Game! Iniciando novo jogo');
  score = 0;

  nextLevel();
}

green.onclick = () => userClick(0);
red.onclick = () => userClick(1);
yellow.onclick = () => userClick(2);
blue.onclick = () => userClick(3);

playGame();
