/*
 * Name: Rhea Bhutani
 * Date: October 24, 2019
 * Section: CSE 154 AA
 *
 * This is the JS to implement the UI for the Set! game to be made for this homework. It generates
 * different number of cards according to the mode of gameplay that has been selected by the user.
 * The game keeps count of the total number of setts created and also displays the time left for
 * user to play the game for. The game works on the same rules as the actual card game.
 */

"use strict";
(function() {

  let timerId = null;
  let remainingSeconds = 0;
  let style = ["solid", "outline", "striped"];
  let color = ["green", "purple", "red"];
  let shape = ["diamond", "oval", "squiggle"];

  window.addEventListener("load", init);

  /**
   * Hooks up the event listeners to the start, back and refresh buttons
   */
  function init() {
    id("start-btn").addEventListener("click", toggleView);
    id("back-btn").addEventListener("click", toggleView);
    id("refresh-btn").addEventListener("click", generateBoard);
  }

  /**
   * Switches between the menu and the game. Starts the game when the start button is clicked, and
   * stops the timer when the back button is clicked.
   */
  function toggleView() {
    if (id("game-view").classList.contains("hidden")) { // start-btn
      id("menu-view").classList.add("hidden");
      id("game-view").classList.remove("hidden");
      startGame();
    } else if (id("menu-view").classList.contains("hidden")) { // back-btn
      id("menu-view").classList.remove("hidden");
      id("game-view").classList.add("hidden");
      stopTimer();
    }
  }

  /**
   * A wrapper function which puts cards on the board and starts the timer when the game is
   * switched to game view.
   */
  function startGame() {
    id("refresh-btn").disabled = false;
    qs("#set-count").textContent = "0";
    generateBoard();
    startTimer();
  }

  /**
   * Checks to see if the three selected cards make up a valid set. This is done by comparing each
   * of the type of attribute against the other two cards. If each four attributes for each card are
   * either all the same or all different, then the cards make a set. If not, they do not make a set
   * @param {DOMList} selected - List of all selected cards to check if a set.
   * @return {boolean} True if valid set false otherwise.
   */
  function isASet(selected) {
    let attributes = [];
    for (let i = 0; i < selected.length; i++) {
      attributes.push(selected[i].id.split("-"));
    }
    for (let i = 0; i < attributes[0].length; i++) {
      let allSame = attributes[0][i] === attributes[1][i] &&
                    attributes[1][i] === attributes[2][i];
      let allDiff = attributes[0][i] !== attributes[1][i] &&
                    attributes[1][i] !== attributes[2][i] &&
                    attributes[0][i] !== attributes[2][i];
      if (!(allDiff || allSame)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Generates 4 random integers for every attribute of any card. Returns the corresponding
   * values as a string array as [STYLE, SHAPE, COLOR, COUNT]. Chooses the style mode on the
   * basis of the difficulty of the game, only solid if it's easy, or any of the three styles if
   * it's standard mode.
   * @param {boolean} isEasy - True if game is being played in easy mode, false otherwise
   * @returns {[string]} randomly generated attributes as [STYLE, SHAPE, COLOR, COUNT];
   */
  function generateRandomAttributes(isEasy) {
    let styleRandom = 0;
    if (!isEasy) {
      styleRandom = getRandomArbitrary(0, 3);
    }
    let colorRandom = getRandomArbitrary(0, 3);
    let shapeRandom = getRandomArbitrary(0, 3);
    let countRandom = getRandomArbitrary(0, 3);
    return [style[styleRandom], shape[shapeRandom], color[colorRandom], countRandom + 1];
  }

  /**
   * Returns a unique card div according to the randomly generated attributes. Makes the card
   * clickable and attaches the card to the board. If a card with the same attributes already
   * exists on the board, it calls a method to generate a new card, and it keeps doing that
   * until then card is unique.
   * @param {boolean} isEasy - True if valid set false otherwise.
   * @returns {object} card div with the image(s) corresponding to the attributes
   */
  function generateUniqueCard(isEasy) {
    let attributes = generateRandomAttributes(isEasy);
    let card = generateOneCard(attributes);
    let divs = qsa("#board div");
    let board = [];
    for (let i = 0; i < divs.length; i++) {
      board.push(divs[i].id);
    }
    while (board.includes(card.id) && board.length > 0) {
      card = generateOneCard(generateRandomAttributes(isEasy));
    }
    card.addEventListener('click', cardSelected);
    qs("#board").appendChild(card);
    return card;
  }

  /**
   * Gets the selected time from the drop-down list in the menu. Initializes the timer and then
   * calls the function for decrementing the timer every one second.
   */
  function startTimer() {
    let option = qsa("select option");
    for (let i = 0; i < option.length; i++) {
      if (option[i].selected) {
        remainingSeconds = option[i].value;
      }
    }
    id("time").textContent = timeToMMSS(remainingSeconds);
    if (timerId === null) {
      const advanceSecs = 1000;
      timerId = setInterval(advanceTimer, advanceSecs);
    } else {
      stopTimer();
    }
  }

  /**
   * Stops the timer by making the global timerId null.
   */
  function stopTimer() {
    clearInterval(timerId);
    timerId = null;
  }

  /**
   * Updates the timer by decrementing it by 1 second every time it's called. If remaining seconds
   * reaches 0, it ends the game by making sure none of the cards can be selected and the refresh
   * button is diabled. It clears the running timer so that the time doesn't go in negative.
   */
  function advanceTimer() {
    remainingSeconds--;
    if (remainingSeconds <= 0) {
      remainingSeconds = 0;
      let cards = qsa(".card");
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].classList.contains("selected")) {
          cards[i].classList.remove("selected");
        }
        cards[i].removeEventListener('click', cardSelected);
      }
      id("refresh-btn").disabled = true;
      clearInterval(timerId);
      timerId = null;
    }
    id("time").textContent = timeToMMSS(remainingSeconds);
  }

  /**
   * Gives the class a selected or unselected appearance. Generates message according to whether
   * the three selected cards form a set or not. If they form a set, it will generate new unique
   * images in place of the selected set.
   */
  function cardSelected() {
    if (!this.classList.contains("selected")) {
      this.classList.add("selected");
      let cards = qsa(".selected");
      if (cards.length === 3) {
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.remove("selected");
        }
        if (isASet(cards)) {
          qs("#set-count").textContent = parseInt(qs("#set-count").textContent) + 1;
          displayMessage(cards, "SET!");
        } else {
          const decrementSecs = 15;
          remainingSeconds -= decrementSecs;
          displayMessage(cards, "Not a Set :(");
        }
        const advanceSecs = 1000;
        setTimeout(() => {
          removeMessage(cards);
        }, advanceSecs);
      }
    } else {
      this.classList.remove("selected");
    }
  }

  /**
   * Removes the message from the cards, and if selected cards form a set, then generates new
   * images according to new randomly generated unique attributes in the same place
   * @param {[object]} cards - collection of selected cards
   */
  function removeMessage(cards) {
    for (let i = 0; i < cards.length; i++) {
      let para = qs("#" + cards[i].id + " p");
      cards[i].removeChild(para);
      cards[i].classList.remove("hide-imgs");
      if (isASet(cards)) {
        qs("#" + cards[i].id).innerHTML = "";
        let isEasy = getValue();
        let divs = qsa("#board div");
        let board = [];
        for (let j = 0; i < divs.length; i++) {
          board.push(divs[j].id);
        }
        while (board.includes(cards[i].id) && board.length > 0) {
          cards[i] = generateOneCard(generateRandomAttributes(isEasy));
        }
        generateImgs(generateRandomAttributes(isEasy), cards[i]);

      }
    }
  }

  /**
   * Displays a message of the cards selected being a set or not on the cards and hides the images.
   * @param {[object]} cards - collection of selected cards
   * @param {string} message - the text which is to be displayed in the cards in place of the
   * images.
   */
  function displayMessage(cards, message) {
    for (let i = 0; i < cards.length; i++) {
      let para = gen("p");
      para.textContent = message;
      cards[i].classList.add("hide-imgs");
      cards[i].appendChild(para);
    }
  }

  /**
   * Returns the total remaining seconds in the game timer format, which is "MM:SS"
   * @param {[int]} attributes - randomly generated attributes
   * @returns {object} card div with the image(s) corresponding to the attributes
   */
  function generateOneCard(attributes) {
    let card = gen("div");
    card.classList.add("card");
    generateImgs(attributes, card);
    return card;
  }

  /**
   * Generates all the images which are supposed to go inside one card according to the random
   * number generated.
   * @param {[string]} attributes - randomly generated attributes
   * @param {object} card - the card to which the images are to be attached
   */
  function generateImgs(attributes, card) {
    let id = makeId(attributes);
    let idCount = id + "-" + attributes[3];
    card.id = idCount;
    for (let i = 0; i < attributes[3]; i++) {
      let img = gen("img");
      let src = "img/" + id + ".png";
      img.src = src;
      img.alt = idCount;
      card.appendChild(img);
    }
  }

  /**
   * Clears the board and puts either nine or twelve cards on the board, according to whether the
   * game is being played in easy or standard mode. It generates only unique cards.
   */
  function generateBoard() {
    id("board").innerHTML = "";
    const numCards = 12;
    const numCardsEasy = 9;
    let isEasy = getValue();
    if (isEasy) {
      for (let i = 0; i < numCardsEasy; i++) {
        generateUniqueCard(isEasy);
      }
    } else {
      for (let i = 0; i < numCards; i++) {
        generateUniqueCard(isEasy);
      }
    }
  }

  /**
   * Returns the checked value of the mode the game is supposed to be played in as a boolean,
   * either easy or standard.
   * @return {boolean} true if the game is to be played in easy mode, false otherwise.
   */
  function getValue() {
    let value = qs("input[name='diff']:checked").value;
    return value === "easy";
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   * @param {int} min - minimum number
   * @param {int} max - maximum number
   * @returns {int} random integral number
   */
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * Generates the id for a card using the style, shape, and color from the randomly generated
   * attributes, returns the id as a string.
   * @param {[string]} attributes - randomly generated attributes
   * @returns {string} the attributes to be used as id.
   */
  function makeId(attributes) {
    let id = attributes[0] + "-" + attributes[1] + "-" + attributes[2];
    return id;
  }

  /**
   * Returns the total remaining seconds in the game timer format, which is "MM:SS"
   * @param {int} time - total remaining seconds
   * @returns {string} remaining seconds in game timer format.
   */
  function timeToMMSS(time) {
    const secsToMins = 60;
    let mins = Math.floor(time / secsToMins);
    let secs = time - (mins * secsToMins);
    const lessThan = 10;
    if (secs < lessThan) {
      secs = "0" + secs;
    }
    return "0" + mins + ":" + secs;
  }

  /** ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
