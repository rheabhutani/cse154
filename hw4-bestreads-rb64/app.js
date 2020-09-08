/*
 * API for returning the description, info, reviews of a book, and also the list of all
 * books.
 * Endpoint: /bestreads/description/:book_id
 * Response Format: text
 * Response Example: "Harry Potter is lucky to reach the age of thirteen, since he
 *  has already survived the murderous attacks of the feared Dark Lord on more than
 *  one occasion. But his hopes for a quiet term concentrating on Quidditch are dashed
 *  when a maniacal mass-murderer escapes from Azkaban, pursued by the soul-sucking
 *  Dementors who guard the prison. It's assumed that Hogwarts is the safest place
 *  for Harry to be. But is it a coincidence that he can feel eyes watching him in
 *  the dark, and should he be taking Professor Trelawney's ghoulish predictions seriously?"
 * Returns the description for the book as plain text.
 * Possible errors: "No results found for " + id + ".", "Something went wrong on the server,
 *  try again later."
 * /^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v/
 * Endpoint: /bestreads/info/:book_id
 * Response Format: JSON
 * Response Example: {
 *                      "title": "Harry Potter and the Prisoner of Azkaban (Harry Potter #3)",
 *                      "author": "by J.K. Rowling, Mary GrandPre (Illustrator)",
 *                   }
 * Returns the title and the author of the given book.
 * Possible errors: "No results found for " + id + ".", "Something went wrong on the server,
 *  try again later."
 * /^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v/
 * Endpoint: /bestreads/reviews/:book_id
 * Response Format: JSON
 * Response Example: [
 *                      {
 *                          "name": "Wil Wheaton",
 *                          "rating": 4.1,
 *                          "text": "I'm beginning to wonder if there will ever be a Defense
 *                            Against The Dark Arts teacher who is just a teacher."
 *                      },
 *                      {
 *                          "name": "Zoe",
 *                          "rating": 4.8,
 *                          "text": "Yup yup yup I love this book"
 *                      },
 *                      {
 *                          "name": "Kiki",
 *                          "rating": 5,
 *                          "text": "Literally one of the best books I've ever read. I was
 *                            chained to it for two days. I cried and laughed and yelled
 *                            AHH when all of the action went down."
 *                      }
 *                  ]
 * Returns all the reviews of the given book with the name, rating, and the text.
 * Possible errors: "No results found for " + id + ".", "Something went wrong on the server,
 *  try again later."
 * /^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v/
 * Endpoint: /bestreads/books
 * Response Format: JSON
 * Response Example: {
 *                      "books": [
 *                          {
 *                              "title": "2001: A Space Odyssey",
 *                              "book_id": "2001spaceodyssey"
 *                          },
 *                          {
 *                              "title": "Alanna: The First Adventure (Song of the Lioness #1)",
 *                              "book_id": "alannathefirstadventure"
 *                          },
 *                          {
 *                              "title": "Alice in Wonderland",
 *                              "book_id": "aliceinwonderland"
 *                          },
 *                          ... (one entry like this for each folder inside books/)
 *                      ]
 *                  }
 * Returns a list of all the books with their book ids.
 * Possible errors: "Something went wrong on the server, try again later."
 */

"use strict";

const util = require("util");
const express = require("express");
const glob = require("glob");
const fs = require("fs").promises;

const globPromise = util.promisify(glob);

const app = express();

const INVALID_PARAM_ERROR = 400;
const FILE_ERROR = 500;
const PREFIX_DIR_LENGTH = "books/".length;

app.use(express.static("public"));

app.get("/bestreads/description/:book_id", async (req, res) => {
  let id = req.params["book_id"];
  res.type("text");
  let description;
  try {
    description = await fs.readFile("books/" + id + "/description.txt", "utf8");
    res.send(description);
  } catch (err) {
    if (err.code === "ENOENT") {
      res.status(INVALID_PARAM_ERROR).send("No results found for " + id + ".");
    } else {
      res.status(FILE_ERROR).send("Something went wrong on the server, try again later.");
    }
  }
});

app.get("/bestreads/info/:book_id", async (req, res) => {
  let id = req.params["book_id"];
  let info;
  try {
    info = await fs.readFile("books/" + id + "/info.txt", "utf8");
    info = info.split(/\r?\n/);
    res.json({"title": info[0], "author": info[1]});
  } catch (err) {
    res.type("text");
    if (err.code === "ENOENT") {
      res.status(INVALID_PARAM_ERROR).send("No results found for " + id + ".");
    } else {
      res.status(FILE_ERROR).send("Something went wrong on the server, try again later.");
    }
  }
});

app.get("/bestreads/reviews/:book_id", async (req, res) => {
  let id = req.params["book_id"];
  let reviews;
  try {
    let results = [];
    reviews = await globPromise("books/" + id + "/review*.txt");
    for (let i = 0; i < reviews.length; i++) {
      let review = await fs.readFile(reviews[i], "utf8");
      review = review.split(/\r?\n/);
      let result = '{\"name\":\"' + review[0] + '\",';
      result += '\"rating\":\"' + review[1] + '\",';
      result += '\"text\":\"' + review[2] + '\"}';
      results.push(JSON.parse(result));
    }
    res.json(results);
  } catch (err) {
    res.type("text");
    if (err.code === "ENOENT") {
      res.status(INVALID_PARAM_ERROR).send("No results found for " + id + ".");
    } else {
      res.status(FILE_ERROR).send("Something went wrong on the server, try again later.");
    }
  }
});

app.get("/bestreads/books", async (req, res) => {
  let books;
  try {
    books = await globPromise("books/*");
    let results = [];
    for (let i = 0; i < books.length; i++) {
      let bookId = processPath(books[i]);
      let info = await fs.readFile("books/" + bookId + "/info.txt", "utf8");
      info = info.split(/\r?\n/);
      let result = "{\"title\":\"" + info[0] + "\",";
      result += "\"book_id\":\"" + bookId + "\"}";
      results.push(JSON.parse(result));
    }
    res.json({"books": results});
  } catch (err) {
    res.type("text");
    res.status(FILE_ERROR).send("Something went wrong on the server, try again later.");
  }
});

/**
 * Removes the prefix from the path of the book id.
 * @param {string} name - the entire directory path of the book
 * @return {string} the trimmed book id without the directory and any white spaces.
 */
function processPath(name) {
  let result = "";
  result += name.substring(PREFIX_DIR_LENGTH) + "\n";
  return result.trim();
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
