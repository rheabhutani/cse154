/**
 * CSE 154 Summer 2019
 * Week 8 Section
 * Numbers API Example
 *
 * Fetches trivia about a number a user inputs (or random if they click the "Fetch Random
 * Number Fact!" button) and displays the trivia on the page.
 */
"use strict";
(function() {
  const URL = "http://numbersapi.com/";

  window.addEventListener("load", init);

  /**
   * Sets up event listeners for fetching number trivia.
   */
  function init() {
    id("fetch-num").addEventListener("click", getNum);
    id("fetch-random-num").addEventListener("click", function() {
      fetchNum("random");
    });
  }

  function getNum() {
    let num = id("num-box").value;
    if(num !== "") {
      fetchNum(num);
    } else {
      fetchNum("random")
    }
  }

  /**
   * Fetches trivia data about the given numberValue and displays it on the page if
   * successful, logging an error to the console if an error occurred during the request.
   * @param {int} numberValue - value of number to request trivia for.
   */
  function fetchNum(numberValue) {
    let url = URL + numberValue;
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.text())
      .then(showTriviaResult)
      .catch(console.error);
  }

  /**
   * Displays the trivia result response to the #output paragraph.
   * @param {string} response - response string from Numbers API request
   */
  function showTriviaResult(response) {
    id("output").textContent = response;
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

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
})();
