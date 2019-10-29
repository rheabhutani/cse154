/*
 * CSE 154 Section Exercise - Whack a Bug Part 2
 * Allows the user to start games of Whack a Bug, and handles whacking bugs.
 * Also handles timing of the game and incrementing score
 */

"use strict";
(function() {

  /*
   * Do not change these module-global variables/constants,
   * at least, not until the challenge problems.
   * Try to find ways to solve the problems without global variables.
   */
  let gameTimerId = null;
  let spawnTimerId = null;
  const GAME_LENGTH = 60;
  const BUG_IMG = "bug.png";
  const BUG_WHACKED = "bug-whacked.png";
  const BUG_CONTAINER_WIDTH = 1200;
  const BUG_CONTAINER_HEIGHT = 600;
  const BUG_SIZE = 75;

  window.addEventListener("load", init);

  /**
   * Sets up the event listener for the start button.
   */
  function init() {
    id("start").addEventListener("click", startGame);
  }

  /**
   * Reveals and clears the game view, resets the score, and begins the game by setting up timers.
   * Previously running games are stopped.
   */
  function startGame() {
    id("game").classList.remove("hidden");
    /*
     * STEP 1: Check if there are errors in the form elements
     *         Print relevant errors to the page.
     *         Hide the game if there are errors. Reveal the game if there are none.
     */
     let spawn-rate = id("spawn-rate").value;
     let count = id("spawn-count").value;
     let despawn-rate = id("despawn-rate").value;
     if(spawn-rate === "" || count === "" || despawn-rate === "") {
       id("error").textContent = "Some parameters are not filled in!";
       id("game").classList.add("hidden");
     } else if(spawn-rate <= 0 || count <= 0 || despawn-rate <= 0) {
       id("error").textContent = "Some parameters are 0 or less!";
       id("game").classList.add("hidden");
     } else {
       id("error").textContent = "";
       id("game").classList.remove("hidden");
       id("score").textContent = 0;
       id("timer").textContent = GAME_LENGTH;
       setupGameTimers(spawn-rate, count, despawn-rate);
     }
    // STEP 2: When the game is revealed, reset the score and countdown and start the game timers.
  }

  /**
   * Decrements the game timer by 1, and ends the game if it reaches 0.
   */
  function decrementGameTimer() {
    // STEP 3: Decrement the game timer and stop the game if needed.
  }

  /**
   * Spawns bugs according to the count and despawn parameters set by the user.
   * Is called periodically during a game.
   */
  function spawnBugs() {
    /*
     * STEP 4: Spawn the necessary number of bugs. Their position should be random within the
     * bug container, they should be whacked when clicked, and they should despawn after the
     * amount of time specified by the form elements.
     */
  }

  /**
   * Stops the current game, removing bugs from the screen and stopping the timer.
   */
  function stopGame() {
    // STEP 3: Clear the board and clear game timers that are running.
  }

  /**
   * whacks the clicked bug and increments the score. The bug cannot be whacked again afterwards.
   */
  function whackBug() {
    if (!this.classList.contains("whacked")) {
      this.classList.add("whacked");
      this.src = BUG_WHACKED;
      let score = id("score");

      // Need to convert the string content into a number.
      score.textContent = parseInt(score.textContent) + 1;
    }
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

})();
