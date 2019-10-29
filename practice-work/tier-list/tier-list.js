/*
 * CSE 154 Section Exercise - Tier List Maker
 * Defines functionality of forms, switching views, and editing the tier-list
 * for the CSE 154 tier list maker website.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Sets up event-listeners on buttons and form-elements.
   */
  function init() {
    // TODO: Hook up the #make-list, #row-count, #add-item and #go-back event listeners here.
    id("make-list").addEventListener('click', makeList);
    id("row-count").addEventListener('change', makeInputs);
    id("add-item").addEventListener('click', makeItems);
    id("go-back").addEventListener('click', toggleViews);
  }

  /**
   * Builds an empty tier-list based on user parameters and switches views to it.
   * Also populates the tiers in the maker fieldset.
   */
  function makeList() {
    // TODO
    id("tier-list").innerHTML = "";
    id("tier-select").innerHTML = "";
    let rows = qsa("#row-names input");
    for(let i = 0; i < rows.length; i++) {
      let rowId = "tier-" + i;
      let tierRow = generateTierRow(rows[i].value, rowId);
      id("tier-list").appendChild(tierRow);
      let tierOption = generateTierOption(rows[i].value, rowId);
      id("tier-select").appendChild(tierOption);
    }
    toggleViews();
  }

  /**
   * Toggles the hidden class on both views to switch perspectives.
   */
  function toggleViews() {
    // TODO
    id("maker").classList.toggle("hidden");
    id("setup").classList.toggle("setup");
  }

  /**
   * Generates and returns a tier-row element with the given rowName
   * @param {string} rowName - The name of the tier-row.
   * @param {string} rowId - The id for the tier-items element to reference when adding items.
   * @returns {object} - The tier-row DOM element.
   */
  function generateTierRow(rowName, rowId) {
    // TODO
    let row = document.createElement("div");
    row.classList.add("tier-row");

    let p = document.createElement("p");
    p.textContent = rowName;
    p.classList.add("tier-row");
    row.appendChild(p);

    let item = document.createElement("div");
    item.classList.add("tier-items");
    item.id = rowId;
    row.appendChild(item);

    return row;
  }

  /**
   * Generates and returns an option element for the maker select with the given rowName
   * @param {string} rowName - The name of the tier.
   * @param {string} rowId - The id of the tier-items element associated with this option
   * @returns {object} - The option DOM element.
   */
  function generateTierOption(rowName, rowId) {
    // TODO
    let option = document.createElement("option");
    option.textContent = rowName;
    option.value = rowId;
    return option;
  }

  /**
   * Updates the inputs in the setup fieldset to equal the number of rows.
   */
  function makeInputs() {
    // TODO
    let rows = id("row-count").value;
    id("row-names").innerHTML = "";
    for (let i = 0; i < rows; i++) {
      let input = document.createElement("input");
      input.type = "text";
      id("row-names").appendChild(input);
    }
  }

  /**
   * Creatse a tier-item based on user-supplied parameters, and hooks up the item's
   * event listeners. Then adds it to the page.
   */
  function makeItem() {
    // TODO
    let name = id("item-name").value;
    let src = id("item-image").value;
    let tier = id("tier-select").value;
    let item = generateTierItem(name, src);
    item.addEventListener('click', populateItemParameters);
    item.addEventListener('dbclick', removeTierItem);
    id(tier).appendChild(item);
  }

  /**
   * Creates a tier item img element with the given name alt text and src image.
   * @param {string} name - The name of the item, to be stored in the alt text.
   * @param {string} src - The source of the image.
   * @returns {object} - The DOM element of the tier item image.
   */
  function generateTierItem(name, src) {
    // TODO
    let img = document.createElement("img");
    img.src = src;
    img.alt = name;
    return img;
  }

  /**
   * Populates the maker fieldset form elements with the properties of the clicked item.
   */
  function populateItemParameters() {
    // TODO
    id("item-name").value = this.alt;
    id("item-image").value = this.src;
    id("tier-select").value = this.parentNode.id;
  }

  /**
   * Removes the double-clicked item from the tier-list.
   */
  function removeTierItem() {
    // TODO
    this.parentNode.removeChild(this);
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
