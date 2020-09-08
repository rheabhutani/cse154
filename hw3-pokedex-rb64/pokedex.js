/*
 * Name: Rhea Bhutani
 * Date: November 3, 2019
 * Section: CSE 154 AA
 *
 * This is the JS to implement the UI for the Pokedex. Till now, this script only works for the
 * Pokedex entry view, which contains all the pokemons, and also shows the pokemons which have been
 * found till now. Information on the found pokemons can be seen on the left of the screen on the
 * pokemon card, which displays name, image, information, and moves for the pokemon selected.
 */

"use strict";
(function() {
  const URL_POKEDEX = "https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php";
  const URL_GAME = "https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/game.php";
  const GET_SPRITE = "https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/sprites/";
  const API_IMAGES = "https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/";

  const STARTER = ["bulbasaur", "charmander", "squirtle"];
  const PERC = 100;

  let found = STARTER;
  let myPokemon = "";

  let guid = "";
  let pid = "";
  let originalHP = 0;

  window.addEventListener("load", init);

  /**
   * Calls the function which fetches the sprite images from the API which is used to put images
   * in the pokedex.
   */
  function init() {
    fetchAll();
    id("start-btn").addEventListener("click", startGame);
  }

  /**
   * Fetches the pokemon names from the pokedex API and then handles a promise which gives all
   * all the images and shows an error it fails to fetch the data from the API.
   */
  function fetchAll() {
    fetch(URL_POKEDEX + "?pokedex=all")
      .then(checkStatus)
      .then(response => response.text())
      .then(processResponse)
      .catch(console.error);
  }

  /**
   * Converts the data fetched from the API to a JSON object and then adds the images of the
   * names fetched to the pokedex one by one.
   * @param {object} text -the response form the API, which is in text format
   */
  function processResponse(text) {
    text = JSON.parse(JSON.stringify(text));
    let names = textToName(text);
    for (let i = 0; i < names.length; i++) {
      let pokemon = names[i][1];
      let img = getSprite(pokemon);
      id("pokedex-view").appendChild(img);
    }
  }

  /**
   * Generates the image of a pokemon and adds it to the pokedex. If the pokemon is already found,
   * its details can be viewed on the card.
   * @param {string} pokemon - name of the pokemon whose image is to be generated
   * @returns {object} the final sprite image of the pokemon which contains all the classes
   */
  function getSprite(pokemon) {
    let img = gen("img");
    img.src = GET_SPRITE + pokemon + ".png";
    img.alt = pokemon;
    img.classList.add("sprite");
    if (found.includes(pokemon)) {
      img.classList.add("found");
      img.addEventListener("click", () => {
        showCard(pokemon);
      });
    }
    return img;
  }

  /**
   * Splits all the names from the response object as a JSON into names and shorthands in the
   * form of a 2D array.
   * @param {object} text - json object for the names and shortnames for all the pokemon from API
   * @returns {[string]} names - 2D array of names and shorthands for all the pokemons
   */
  function textToName(text) {
    text = text.split("\n");
    let names = [];
    for (let i = 0; i < text.length; i++) {
      let pair = text[i].split(":");
      names.push(pair);
    }
    return names;
  }

  /**
   * Fetches data for a particular pokemon from the pokemon API and then handles a promise which
   * populates the pokemon card on the left and shows an error it fails to fetch the data from
   * the API.
   * @param {string} pokemon - name of the pokemon whose data is to be fetched from the API
   */
  function showCard(pokemon) {
    fetch(URL_POKEDEX + "?pokemon=" + pokemon)
      .then(checkStatus)
      .then(response => response.json())
      .then(populateCard)
      .catch(console.error);
  }

  /**
   * Populates the card on the left of the screen with the correct information about the chosen
   * and found pokemon. It also shows the start button so that the view can be switched to
   * the one vs one player mode.
   * @param {object} json - the json object for the specific pokemon
   */
  function populateCard(json) {
    myPokemon = json.shortname;
    id("start-btn").classList.add("hidden");
    let card = "#p1";
    qs(card + " .name").textContent = json.name;
    qs(card + " .pokepic").src = API_IMAGES + json.images.photo;
    qs(card + " .pokepic").alt = json.name;
    qs(card + " .type").src = API_IMAGES + json.images.typeIcon;
    qs(card + " .type").alt = json.info.type;
    qs(card + " .weakness").src = API_IMAGES + json.images.weaknessIcon;
    qs(card + " .weakness").alt = json.info.weakness;
    originalHP = json.hp;
    qs(card + " .hp").textContent = originalHP + "HP";
    qs(card + " .info").textContent = json.info.description;
    let moveButtons = qsa("#p1 .moves button");
    for (let i = 0; i < moveButtons.length; i++) {
      moveButtons[i].classList.add("hidden");
    }
    if (moveButtons.length <= json.moves.length) {
      for (let i = 0; i < moveButtons.length; i++) {
        generalPopulate(json.moves[i], moveButtons[i]);
      }
    } else {
      for (let i = 0; i < json.moves.length; i++) {
        generalPopulate(json.moves[i], moveButtons[i]);
      }
    }
    id("start-btn").classList.remove("hidden");
  }

  /**
   * Populates the general part of the card without the moves.
   * @param {object} moves - the moves part of the json object for the specific pokemon
   * @param {object} button - the move button on the pokemon card
   */
  function generalPopulate(moves, button) {
    button.classList.remove("hidden");
    let elements = button.children;
    elements[0].textContent = moves.name;
    elements[1].innerHTML = "";
    if (moves.dp !== null) {
      elements[1].textContent = moves.dp + " DP";
    }
    elements[2].src = API_IMAGES + "icons/" + moves.type + ".jpg";
    elements[2].alt = moves.type;
  }

  /**
   * Switches to pokemon battle mode from pokedex mode. Makes all the buttons on the card chosen
   * enabled so that the game can be played.
   */
  function startGame() {
    id("pokedex-view").classList.add("hidden");
    id("p2").classList.remove("hidden");
    qs("#p1 .hp-info").classList.remove("hidden");
    id("results-container").classList.remove("hidden");
    id("flee-btn").classList.remove("hidden");
    id("start-btn").classList.add("hidden");
    let moveButtons = qsa(".moves button");
    for (let i = 0; i < moveButtons.length; i++) {
      if (!moveButtons[i].classList.contains("hidden")) {
        moveButtons[i].disabled = false;
      }
    }
    qs("header h1").textContent = "Pokemon Battle Mode!";
    fetchGameData(true);
  }

  /**
   * Fetches game data for the initial game state according to the pokemon chosen by the user, and
   * makes the move buttons functioning.
   * @param {Boolean} startgame - tells the state of the game, true if the game is to be played,
   * false otherwise
   */
  function fetchGameData(startgame) {
    let form = new FormData();
    form.append("startgame", startgame);
    form.append("mypokemon", myPokemon);
    fetch(URL_GAME, {method: "POST", body: form})
      .then(checkStatus)
      .then(response => response.json())
      .then(populateCard2)
      .catch(console.error);
    let moveButtons = qsa("#p1 .moves button");
    for (let i = 0; i < moveButtons.length; i++) {
      if (!moveButtons[i].classList.contains("hidden")) {
        moveButtons[i].addEventListener("click", () => {
          playMove(moveButtons[i]);
        });
      }
    }
  }

  /**
   * Populates the opponent's card with all the specific details fetched from the API and
   * saves the unique game id and player id.
   * @param {object} json - the json object for the initial state of the game
   */
  function populateCard2(json) {
    guid = json.guid;
    pid = json.pid;
    let card = "#p2";
    qs(card + " .name").textContent = json.p2.name;
    qs(card + " .pokepic").src = API_IMAGES + json.p2.images.photo;
    qs(card + " .pokepic").alt = json.p2.name;
    qs(card + " .type").src = API_IMAGES + json.p2.images.typeIcon;
    qs(card + " .type").alt = json.p2.info.type;
    qs(card + " .weakness").src = API_IMAGES + json.p2.images.weaknessIcon;
    qs(card + " .weakness").alt = json.p2.info.weakness;
    qs(card + " .hp").textContent = json.p2.hp + "HP";
    qs(card + " .info").textContent = json.p2.info.description;
    let moveButtons = qsa(card + " .moves button");
    for (let i = 0; i < moveButtons.length; i++) {
      moveButtons[i].classList.add("hidden");
    }
    if (moveButtons.length <= json.p2.moves.length) {
      for (let i = 0; i < moveButtons.length; i++) {
        generalPopulate(json.p2.moves[i], moveButtons[i]);
      }
    } else {
      for (let i = 0; i < json.p2.moves.length; i++) {
        generalPopulate(json.p2.moves[i], moveButtons[i]);
      }
    }
  }

  /**
   * Makes the shortname for the move chosen by the player, and fetches the correct data from the
   * API according to that move.
   * @param {object} button - the move button clicked by the user
   */
  function playMove(button) {
    id("p1-turn-results").classList.add("hidden");
    id("p2-turn-results").classList.add("hidden");
    let name = button.children[0].textContent;
    name = name.split(" ").join("");
    name = name.toLowerCase();
    id("loading").classList.remove("hidden");
    let body = new FormData();
    body.append("guid", guid);
    body.append("pid", pid);
    body.append("movename", name);
    fetch(URL_GAME, {method: "POST", body: body})
      .then(checkStatus)
      .then(response => response.json())
      .then(battle)
      .catch(console.error);
  }

  /**
   * Updates the results, health bar, and buffs for both the players on the board according to the
   * data fetched from the API. ALso checks whether the game has been won by a player or not.
   * @param {object} json - the json object for the updated game state according to the move
   * chosen by the user
   */
  function battle(json) {
    let buffs = qsa(".buffs");
    for (let i = 0; i < buffs.length; i++) {
      buffs[i].innerHTML = "";
    }
    id("loading").classList.add("hidden");
    id("p1-turn-results").classList.remove("hidden");
    id("p1-turn-results").innerHTML = "";
    id("p2-turn-results").classList.remove("hidden");
    id("p2-turn-results").innerHTML = "";
    id("p1-turn-results").textContent =
      displayMove(1, json.results["p1-move"], json.results["p1-result"]);
    id("p2-turn-results").textContent =
      displayMove(2, json.results["p2-move"], json.results["p2-result"]);
    healthBar("#p1", json.p1["current-hp"], json.p1.hp);
    healthBar("#p2", json.p2["current-hp"], json.p2.hp);
    createBuffs("#p1", json.p1.buffs, json.p1.debuffs);
    createBuffs("#p2", json.p2.buffs, json.p2.debuffs);
    if (json.p1["current-hp"] === 0 || json.p2["current-hp"] === 0) {
      checkWin(json.p1["current-hp"], json.p2["current-hp"], json.p2.shortname);
    }
    id("flee-btn").addEventListener("click", fleeGame);
    newGame();
  }

  /**
   * Returns the result of the move played by both the players in the required format.
   * @param {int} num - number of the player, 1 if it's the user, 2 otherwise
   * @param {string} move - the move which is played by either opponent
   * @param {string} result - the result of the move played, either hit or missed
   * @return {string} the final message which is to be displayed on the screen.
   */
  function displayMove(num, move, result) {
    return "Player " + num + " played " + move + " and " + result + "!";
  }

  /**
   * Updates the status of the health bar according to the current HP and the original HP
   * @param {string} card - the id of the card which is to be updated
   * @param {int} currentHp - the current HP of the pokemon fetched from the API
   * @param {int} hp - the original HP of either opponent
   */
  function healthBar(card, currentHp, hp) {
    qs(card + " .hp").textContent = currentHp + "HP";
    let percentage = currentHp / hp;
    let health = qs(card + " .health-bar");
    const percMin = 0.2;
    if (percentage < percMin) {
      health.classList.add("low-health");
    } else {
      health.classList.remove("low-health");
    }
    health.style.width = percentage * PERC + "%";
  }

  /**
   * Creates buffs and/or debuffs according to the data fetched from the API.
   * @param {string} card - the id of the card which is to be updated.
   * @param {[string]} buffs - the array of types of buffs fetched from the API
   * @param {[string]} debuffs - the array of types of debuffs fetched from the API
   */
  function createBuffs(card, buffs, debuffs) {
    qs(card + " .buffs").classList.remove("hidden");
    for (let i = 0; i < buffs.length; i++) {
      createDiv(card, "buff", buffs[i]);
    }
    for (let i = 0; i < debuffs.length; i++) {
      createDiv(card, "debuff", debuffs[i]);
    }
  }

  /**
   * Generates a div according to the type of the buff/debuff.
   * @param {string} card - the id of the card which is to be updated
   * @param {string} type - the type of div, either a buff or a debuff
   * @param {string} move - the type of buff/debuff
   */
  function createDiv(card, type, move) {
    let div = gen("div");
    div.classList.add(type);
    div.classList.add(move);
    qs(card + " .buffs").appendChild(div);
  }

  /**
   * Checks if the game has been won by either player or not and updates the state of the board
   * according to the results, adds the opponent to the list of found pokemon if the user wins.
   * @param {int} hp1 - HP of the first player
   * @param {int} hp2 - HP of the opponent
   * @param {string} name - the name of the opponent in the case the user wins
   */
  function checkWin(hp1, hp2, name) {
    id("flee-btn").classList.add("hidden");
    id("endgame").classList.remove("hidden");
    let buttons = qsa("#p1 .card button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    if (hp1 <= 0) {
      qs("header h1").textContent = "You lost!";
    } else if (hp2 <= 0) {
      qs("header h1").textContent = "You won!";
      id("p2-turn-results").classList.add("hidden");
      found.push(name);
    }
    id("endgame").addEventListener("click", newGame);
  }

  /**
   * Clears the board and restores everything to its original status, and starts the game again.
   */
  function newGame() {
    id("endgame").classList.add("hidden");
    id("flee-btn").classList.add("hidden");
    id("results-container").classList.add("hidden");
    id("p2").classList.add("hidden");
    qs("#p1 .hp-info").classList.add("hidden");
    id("start-btn").classList.remove("hidden");
    qs("header h1").textContent = "Your Pokedex";
    qs("#p1 .hp").textContent = originalHP + "HP";
    let health = qsa(".health-bar");
    for (let i = 0; i < health.length; i++) {
      health[i].style.width = PERC + "%";
      health[i].classList.remove("low-health");
    }
    let buffs = qsa(".buffs");
    for (let i = 0; i < buffs.length; i++) {
      buffs[i].innerHTML = "";
    }
    id("pokedex-view").classList.remove("hidden");
    id("pokedex-view").innerHTML = "";
    init();
  }

  /**
   * Fetched the data from the API in the case of the user fleeing the game.
   */
  function fleeGame() {
    let body = new FormData();
    body.append("guid", guid);
    body.append("pid", pid);
    body.append("movename", "flee");
    id("loading").classList.remove("hidden");
    fetch(URL_GAME, {method: "POST", body: body})
      .then(checkStatus)
      .then(response => response.json())
      .then(flee)
      .catch(console.error);
  }

  /**
   * Updates the board with the flee state of the game, and displays the results accordingly.
   * @param {object} json - the json object returned with flee as the move
   */
  function flee(json) {
    id("loading").classList.add("hidden");
    id("p1-turn-results").classList.remove("hidden");
    id("p1-turn-results").textContent =
      displayMove(1, json.results["p1-move"], json.results["p1-result"]);
    id("p2-turn-results").classList.add("hidden");
    checkWin(0, PERC, "notRequired");
    newGame();
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response; // a Response object
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
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
})();
