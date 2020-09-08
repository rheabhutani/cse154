/*
 * Name: Rhea Bhutani
 * Date: November 13, 2019
 * Section: CSE 154 AA
 *
 * This is the JS to implement the UI for area and perimeter calculator made for Creative Project
 * 4. The user chooses which shape they want to calculate the area and perimeter of, enter the
 * corresponding value(s), and choose what value they want to be calculated.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Set up event listeners for the shapes
   */
  function init() {
    id("circle").addEventListener("click", circle);
    id("rectangle").addEventListener("click", rectangle);
    id("triangle").addEventListener("click", triangle);
  }

  /**
   * Generates specific view for circle in which user can enter the radius, and
   * calculate the area or the circumference.
   */
  function circle() {
    id("choose").classList.add("hidden");
    id("values").classList.remove("hidden");
    generatePara("Radius");
    generateInput("radius");
    id("values").appendChild(gen("br"));
    let area = generateButton("Area");
    area.addEventListener("click", fetchCircle);
    let circumference = generateButton("Circumference");
    circumference.addEventListener("click", fetchCircle);
  }

  /**
   * Generates specific view for rectangle in which user can enter the height and width,
   * and calculate the area or the perimeter.
   */
  function rectangle() {
    id("choose").classList.add("hidden");
    id("values").classList.remove("hidden");
    generatePara("Width");
    generateInput("width");
    generatePara("Height");
    generateInput("height");
    id("values").appendChild(gen("br"));
    let area = generateButton("Area");
    area.addEventListener("click", fetchRectangle);
    let perimeter = generateButton("Perimeter");
    perimeter.addEventListener("click", fetchRectangle);
  }

  /**
   * Generates specific view for triangle in which user can enter the side
   * and calculate the area or the perimeter.
   */
  function triangle() {
    id("choose").classList.add("hidden");
    id("values").classList.remove("hidden");
    generatePara("Side");
    generateInput("side");
    id("values").appendChild(gen("br"));
    let area = generateButton("Area");
    area.addEventListener("click", fetchTriangle);
    let perimeter = generateButton("Perimeter");
    perimeter.addEventListener("click", fetchTriangle);
  }

  /**
   * Generates a paragraph with the type of data which is to be entered, depending on the shape,
   * and appends it to the enter view for the specific shape.
   * @param {string} type - The shape chosen by the user
   */
  function generatePara(type) {
    let para = gen("p");
    para.textContent = type + ":";
    id("values").appendChild(para);
  }

  /**
   * Generates a number input box for the user to enter values.
   * @param {string} type - The shape chosen by the user
   */
  function generateInput(type) {
    let input = gen("input");
    input.type = "number";
    input.classList.add("input");
    input.id = type;
    id("values").appendChild(input);
  }

  /**
   * Generates a button specific to the shape chosen by the user.
   * @param {string} type - The value which is to be calculated
   * @return {object} DOM button with the vaklue which is to be calculated.
   */
  function generateButton(type) {
    let button = gen("div");
    button.classList.add("button");
    button.textContent = type;
    button.id = type.toLowerCase();
    id("values").appendChild(button);
    return button;
  }

  /**
   * Makes a request to the API which returns the area and the circumference for the circle,
   * and displays the result, rounded to 2 decimal places, on the screen.
   */
  function fetchCircle() {
    let radius = id("radius").value;
    let type = this.id;
    fetch("/circle?radius=" + radius)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(resp => {
        if (type === "area") {
          id("answer").textContent = "Area: " + roundTo2(resp.area);
        } else {
          id("answer").textContent = "Circumference: " + roundTo2(resp.circumference);
        }
        id("answer-section").classList.remove("hidden");
      })
      .catch(displayError);
  }

  /**
   * Makes a request to the API which returns the area and the perimeter for the rectangle,
   * and displays the result, rounded to 2 decimal places, on the screen.
   */
  function fetchRectangle() {
    let width = id("width").value;
    let height = id("height").value;
    let type = this.id;
    fetch("/rectangle?width=" + width + "&height=" + height)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(resp => {
        if (type === "area") {
          id("answer").textContent = "Area: " + roundTo2(resp.area);
        } else {
          id("answer").textContent = "Perimeter: " + roundTo2(resp.perimeter);
        }
        id("answer-section").classList.remove("hidden");
      })
      .catch(displayError);
  }

  /**
   * Makes a request to the API which returns the area and the perimeter for the triangle,
   * and displays the result, rounded to 2 decimal places, on the screen.
   */
  function fetchTriangle() {
    let side = id("side").value;
    let type = this.id;
    fetch("/triangle?side=" + side)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(resp => {
        if (type === "area") {
          id("answer").textContent = "Area: " + roundTo2(resp.area);
        } else {
          id("answer").textContent = "Perimeter: " + roundTo2(resp.perimeter);
        }
        id("answer-section").classList.remove("hidden");
      })
      .catch(displayError);
  }

  /**
   * DIsplays the error message on the screen when the data can not be fetched from the API.
   */
  function displayError() {
    id("answer").textContent = "An error occured while calculating the answer";
  }

  /**
   * Rounds the passed number to two decimal places.
   * @param {float} number - The number which is to be rounded
   * @return {float} the numeber rounded to two decimal places.
   */
  function roundTo2(number) {
    const round = 100;
    return Math.round(number * round) / round;
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
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
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
})();
