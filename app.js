class Box {
  constructor(red, green, blue, correctBox) {
    this.red = red;
    this.green = green;
    this.blue = blue;

    this.element = document.createElement('div');
    this.element.className = 'box four columns';
    this.element.style.background = `rgb(${this.red}, ${this.green}, ${this.blue})`;
    if (correctBox) {
      this.element.addEventListener('click', Game.win);
    }
    else {
      this.element.addEventListener('click', Game.lose)
    }
  }

  renderTo(elem) {
    elem.appendChild(this.element);
  }

  static createRandom() {
    return new Box(Game.createRandomColour(), Game.createRandomColour(), Game.createRandomColour(), false);
  }
}

class Game {
  constructor() {
    this.elements = {
      title: document.getElementById('title'),
      boxContainer: document.getElementById('box-container'),
      message: document.getElementById('message'),
      resetBtn: document.getElementById('reset-btn'),
      score: document.getElementById('score')
    }
    this.boxes = [];
    this.score = 0;
  }

  static createRandomColour() {
    return Math.floor((Math.random() * 255) + 1);
  }

  run() {
    this.reset();
    this.red = Game.createRandomColour();
    this.green = Game.createRandomColour();
    this.blue = Game.createRandomColour();
    this.elements.score.textContent = `Score: ${this.score}`;

    this.setTitle();
    this.createBoxes();
    this.renderBoxes();
  }

  reset() {
    while(this.elements.boxContainer.firstChild) {
      this.elements.boxContainer.removeChild(this.elements.boxContainer.firstChild);
    }
    this.elements.message.textContent = '';
  }

  setTitle() {
    this.elements.title.textContent = `Red: ${this.red}, Green: ${this.green}, Blue: ${this.blue}`;
  }

  createBoxes() {
    this.boxes = [Box.createRandom(), Box.createRandom(), new Box(this.red, this.green, this.blue, true)];
    this.boxes.sort(() => 0.5 - Math.random());
  }

  renderBoxes() {
    this.boxes.forEach(box => {
      box.renderTo(this.elements.boxContainer);
    });
  }

  static lose() {
    game.score -= 1;
    Game.setMessageAndScore('Incorrect!', 'red');
    setTimeout(function() {game.run()}, 600);
  }

  static win() {
    game.score += 1;
    Game.setMessageAndScore('Correct!', 'green');
    setTimeout(function() {game.run()}, 600);
  }

  static setMessageAndScore(msg, color) {
    game.elements.message.textContent = msg;
    game.elements.message.style.color = color;
    game.elements.score.textContent = `Score: ${game.score}`;
  }
}

const game = new Game();
game.run();

document.getElementById('reset-btn').addEventListener('click', function(){
  game.run();
  game.score = 0;
  game.elements.message.textContent = '';
  game.elements.score.textContent = 'Score: 0'
});