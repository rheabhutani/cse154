/*
 * CSE 154 Section Exercise - Whack a Bug
 * Allows the user to start games of Whack a Bug, and handles whacking bugs.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Sets up event listeners for the start button and the bugs.
   */
  function init() {
    // STEP 1: Hook up the event listeners.
    id("start").addEventListener("click", startGame);
    let game = qsa("img");
    for(let i = 0; i < game.length; i++) {
      game[i].addEventListener("click", whackBug);
    }
  }

  /**
   * Reveals the game view, hides some of the bugs, and starts the game.
   * On repeat games, the score is reset and the bugs are unwhacked.
   */
  function startGame() {
    // STEP 2: Reveal the game view when the game starts.
    id("game").classList.remove("hidden");
    // STEP 3: Make it so each bug has a 25% chance of being hidden on the page.
    let bug = qsa("img");
    for(let i = 0; i < bug.length; i++) {
      bug[i].src = "bug.png";
      let num = Math.random();
      if(num <= 0.25) {
        bug[i].classList.add("hidden");
      } else {
        bug[i].classList.remove("hidden");
      }
      bug[i].classList.remove("whacked");
    }
    // STEP 6: Allow games to start again by resetting the score and "unwhacking" the bugs.
    id("score").textContent = 0;
  }

  /**
   * Whacks the clicked bug and increments the score. The bug cannot be whacked again afterwards.
   */
  function whackBug() {
    // STEP 4: When a bug is clicked, change it to the whacked image and increment the score.
    if(!this.classList.contains("whacked")) {
      this.classList.add("whacked");
      this.src = "bug-whacked.png";
      let score = id("score");
      score.textContent = parseInt(score.textContent) + 1;
    }
    // STEP 5: Make it so the bug cannot be whacked again after being whacked once.

  }

  /* --- CSE 154 HELPER FUNCTIONS --- */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} - The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();
