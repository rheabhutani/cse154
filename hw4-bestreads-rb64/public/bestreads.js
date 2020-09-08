/**
 * Name: Rhea Bhutani
 * Date: November 20, 2019
 * Section: CSE 154 AA
 *
 * This is the JavaScript to implement the UI for the BestReads webpage. It fetches all
 * book data from the BEST reads API. It populates the all books view with covers of all
 * the books, and when the book is clicked, it shows the reviews, ratings, anf a description
 * of the book with the average rating.
 */

"use strict";

(function() {
  let books = [""];

  window.addEventListener("load", init);

  /**
   * Fetches data for all the books and populates the all books view with them.
   * Hides the single book view and hooks up an event listener to the Home button
   * to take the user back to the home page.
   */
  function init() {
    fetch("/bestreads/books")
      .then(checkStatus)
      .then(resp => resp.json())
      .then(displayAllBooks)
      .catch(handleError);
    id("single-book").classList.add("hidden");
    id("home").addEventListener("click", homePage);
  }

  /**
   * Populates the all books view with the covers and names of the all the books and makes them
   * so that they can be clicked to view each book's seperate details.
   * @param {object} json - json object for a list of all the books from the API
   */
  function displayAllBooks(json) {
    for (let i = 0; i < json.books.length; i++) {
      if (!books.includes(json.books[i].book_id)) {
        books.push(json.books[i].book_id);
        let div = gen("div");
        let para = gen("p");
        let img = gen("img");
        para.textContent = json.books[i].title;
        img.src = ("/covers/" + json.books[i].book_id + ".jpg");
        img.alt = json.books[i].title;
        img.classList.add("selectable");
        para.classList.add("selectable");
        div.classList.add("selectable");
        div.appendChild(img);
        div.appendChild(para);
        div.id = json.books[i].book_id;
        id("all-books").appendChild(div);
        div.addEventListener("click", () => {
          singleBookDetails(json.books[i].book_id);
        });
      }
    }
  }

  /**
   * Fetches all the details for the book and populates the single book view for the book.
   * @param {string} bookId - the id of the book for which the details are to be fetched.
   */
  function singleBookDetails(bookId) {
    id("all-books").classList.add("hidden");
    id("single-book").classList.remove("hidden");
    id("book-cover").src = ("/covers/" + bookId + ".jpg");
    fetch("/bestreads/info/" + bookId)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(displayInfo)
      .catch(handleError);
    fetch("/bestreads/description/" + bookId)
      .then(checkStatus)
      .then(resp => resp.text())
      .then(displayDescription)
      .catch(handleError);
    fetch("/bestreads/reviews/" + bookId)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(displayReviews)
      .catch(handleError);
  }

  /**
   * Puts the title and the author of the book on the single book view.
   * @param {object} json - JSON object for the info of the book
   */
  function displayInfo(json) {
    id("book-title").textContent = json.title;
    id("book-author").textContent = json.author;
  }

  /**
   * Puts the description of the book on the single book view.
   * @param {string} text - the description for the book.
   */
  function displayDescription(text) {
    id("book-description").textContent = text;
  }

  /**
   * Displays all the reviews for the book with the name, the rating, and the text in the
   * single book view. Also calculates and puts the average rating of the book.
   * @param {object} json - JSON object for the reviews of the book_id
   */
  function displayReviews(json) {
    id("book-reviews").innerHTML = "";
    let sum = 0;
    for (let i = 0; i < json.length; i++) {
      let h3 = gen("h3");
      h3.textContent = json[i].name;
      id("book-reviews").appendChild(h3);
      let h4 = gen("h4");
      let rating = parseFloat(json[i].rating);
      let formattedRating = rating.toFixed(1);
      h4.textContent = "Rating: " + formattedRating;
      sum += rating;
      id("book-reviews").appendChild(h4);
      let para = gen("p");
      para.textContent = json[i].text;
      id("book-reviews").appendChild(para);
    }
    let average = sum / json.length;
    let formattedAverage = average.toFixed(1);
    id("book-rating").textContent = formattedAverage;
  }

  /**
   * Hides the single book view and shows the all book view.
   */
  function homePage() {
    id("single-book").classList.add("hidden");
    id("all-books").classList.remove("hidden");
  }

  /**
   * Displays the error view while hiding all the other views. Also disables
   * the home button.
   */
  function handleError() {
    id("book-data").classList.add("hidden");
    id("home").disabled = true;
    id("error-text").classList.remove("hidden");
  }

  // ------------------------- HELPER FUNCTIONS ------------------------- //
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID.
   * @return {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
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
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
