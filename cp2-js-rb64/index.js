/*
 * Name: Rhea Bhutani
 * Date: October 13, 2019
 * Section: CSE 154 AA
 *
 * This is the JS to implement the UI for my to do
 * list. It is used to add and check off different
 * tasks, and also create new lists.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Attaches the required event listeners to the buttons.
   */
  function init() {
    id("addBtn").addEventListener('click', addList);
    qs("button").addEventListener('click', removeAll);
  }

  /**
   * Adds new list item after clicking add button.
   */
  function addList() {
    let li = document.createElement("span");
    let text = document.createTextNode(qs("input").value);
    if (qs("input").value !== "") {
      li.appendChild(text);
      qs("input").value = "";
      id("list").appendChild(li);
    } else {
      showAlert();
    }
    li.addEventListener('click', listListener);
  }

  /**
   * Adds check mark on list item after clicking.
   */
  function listListener() {
    this.classList.add("checked");
  }

  /**
   * Deletes all the elements in the list.
   */
  function removeAll() {
    let list = qsa("span");
    if (list.length === 0) {
      showAlert();
    } else {
      for (let i = 0; i < list.length; i++) {
        list[i].remove();
      }
    }
  }

  /**
   * Shows the alert for empty inputs.
   */
  function showAlert() {
    const closeTime = 1600;
    let error = window.open("", "Error", "width=200, height=100");
    error.document.write("<p>This is awkward, enter some data please ( ͡° ʖ̯ ͡°)</p>");
    setTimeout(function() {
      error.close();
    }, closeTime);
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
