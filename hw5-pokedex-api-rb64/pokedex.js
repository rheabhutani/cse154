/**
 * NAME: Rhea Bhutani
 * Date: December 4, 2019
 * Section: CSE 154 AA
 * A Pokedex API to return the information necessary for the game to be played.
 * Endpoint: /credentials
 * Request Type: GET
 * Response Format: text
 * Response Example:
 * bricker
 * poketoken_123456789.987654321
 * Returns the user's PID (Player ID) and token.
 * Request Example: /credentials
 * /^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v/
 * Endpoint: /pokedex/list
 * Response Format: JSON
 * Request Type: GET
 * Response Example: (abbreviated) When Pokedex table is not empty
 * {
 * "pokemon" : [
 *    {
 *     "name" : "bulbasaur",
 *     "nickname" : "Bulby",
 *     "datefound" : "2019-28-23T17:52:06.000Z"
 *   },
 * ...
 *  ]
 * }
 * Response Example: When pokedex table is empty
 * {"pokemon": []}
 * Returns an array of all the pokemon in ascending order by the date found.
 * Request Example: /pokedex/list
 * Possible Errors: Database error
 * /^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v/
 * Endpoint: /pokedex/insert
 * Response Format: JSON
 * Request Type: POST
 * Response Example: {"success": "<name> added to your Pokedex!"}
 * Adds name to pokedex if the name is not present, otherwise returns
 * that the name can not be added.
 * Request Example: /pokedex/insert {"name": "bulbasaur", "nickname": "Bulby"}
 * Possible errors: Pokemon already found, Missing parameter(s), Database error
 * /^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v/
 * Endpoint: /pokedex/delete
 * Response Format: JSON
 * Request Type: POST
 * Response Example: {"success": "<name> removed from your Pokedex!"}
 * Deletes name from pokedex if the name is present, otherwise returns
 * that the name can not be deleted.
 * Request Example: /pokedex/delete {"name": "bulbasaur"}
 * Possible errors: Pokemon not found, Missing parameter(s), Database error
 * /^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v/
 * Endpoint: /pokedex/delete/all
 * Response Format: JSON
 * Request Type: POST
 * Response Example: {"success": "All Pokemon removed from your Pokedex!"}
 * Deletes all the names from the pokedex if the name is present.
 * Request Example: /pokedex/delete
 * Possible errors: Database error
 * /^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v/
 * Endpoint: /pokedex/trade
 * Response Format: JSON
 * Request Type: POST
 * Response Example: {"success": "You have traded your <mypokemon> for <theirpokemon>!"}
 * Trades the user's pokemon for the other person's pokemon if the user's pokemon is
 * already present in their Pokedex and they haven't already found the other person's Pokedex.
 * Request Example: /pokedex/trade {"mypokemon": "bulbasaur", "theirpokemon": "charmander"}
 * Possible errors: mypokemon not found in Pokedex, theirpokemon already in Pokedex,
 * Missing parameter(s), Database error
 * /^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v/
 * Endpoint: /pokedex/update
 * Response Format: JSON
 * Request Type: POST
 * Response Example: {"success": "Your <name> is now named <nickname>!"}
 * Changes the nickname of the Pokemon if it's present in the Pokedex.
 * Request Example: /pokedex/update {"name": "bulbasaur", "nickname": "bulby"}
 * Possible errors: Name not found in Pokedex, Missing parameter(s), Database error
 */

"use strict";

const express = require("express");
const mysql = require("mysql2/promise");
const multer = require("multer");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none);

/**
 * Establishes a database connection to the blog database and returns the database object.
 * Any errors that occur during connection should be caught in the function
 * that calls this one.
 * @returns {Object} - The database object for the connection.
 */
const db = mysql.createPool({
  // Variables for connections to the database.
  host: process.env.DB_URL || 'localhost',
  port: process.env.DB_PORT || '8889',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'hw5db'
});

const FILE_ERROR = 500;
const DB_ERROR = "A database error occurred. Please try again later.";
const INVALID_REQUEST = 400;
const PID = 'rb64';
const TOKEN = 'poketoken_5ddec8ff9c1663.19651270';

// endpoint to return player id and token
app.get('/credentials', function(req, res) {
  res.type("text");
  res.send(PID + "\n" + TOKEN);
});

// endpoint to return all the pokemon in the pokedex
app.get('/pokedex/list', async function(req, res) {
  try {
    let query = "SELECT * FROM Pokedex ORDER BY datefound;";
    let list = await db.query(query);
    let result = [];
    for (let i = 0; i < list.length; i++) {
      let name = list[i]["name"];
      let nickname = list[i]["nickname"];
      let datefound = list[i]["datefound"];
      result.push({"name": name, "nickname": nickname, "datefound": datefound});
    }
    res.json({"pokemon": result});
  } catch (err) {
    res.status(FILE_ERROR).json({"error": DB_ERROR});
  }
});

// endpoint to insert a pokemon into the pokedex
app.post('/pokedex/insert', async function(req, res) {
  try {
    try {
      let name = req.body.name;
      name = name.toLowerCase();
      let nickname = name.toUpperCase();
      if (req.body.nickname) {
        nickname = req.body.nickname;
      }
      let datefound = getTime();
      let query = "INSERT INTO Pokedex VALUES (?, ?, ?);";
      try {
        await db.query(query, [name, nickname, datefound]);
        res.json({"success": req.body.name + " added to your Pokedex!"});
      } catch (err) {
        res.status(INVALID_REQUEST).json({"error": req.body.name + " already found."});
      }
    } catch (err) {
      res.status(INVALID_REQUEST).json({"error": "Missing name parameter"});
    }
  } catch (err) {
    res.status(FILE_ERROR).json({"error": DB_ERROR});
  }
});

// endpoint to delete a given pokemon in the pokedex
app.post('/pokedex/delete', async function(req, res) {
  try {
    try {
      let name = req.body.name;
      name = name.toLowerCase();
      let query = "DELETE FROM Pokedex WHERE name = ?;";
      try {
        await db.query(query, [name]);
        res.json({"success": req.body.name + " removed from your Pokedex!"});
      } catch (err) {
        res.status(INVALID_REQUEST).json({"error": req.body.name + " not found in your Pokedex."});
      }
    } catch (err) {
      res.status(INVALID_REQUEST).json({"error": "Missing name parameter"});
    }
  } catch (err) {
    res.status(FILE_ERROR).json({"error": DB_ERROR});
  }
});

// endpoint to delete all the pokemon in the pokedex
app.post('/pokedex/delete/all', async function(req, res) {
  try {
    await db.query("DELETE FROM Pokedex;");
    res.json({"success": "All Pokemon removed from your Pokedex!"});
  } catch (err) {
    res.status(FILE_ERROR).json({"error": DB_ERROR});
  }
});

// endpoint to trade a pokemon with another user's pokemon
app.post('/pokedex/trade', async function(req, res) {
  try {
    try {
      let mypokemon = req.body.mypokemon;
      mypokemon = mypokemon.toLowerCase();
      let theirpokemon = req.body.theirpokemon;
      theirpokemon = theirpokemon.toLowerCase();
      if (!(await checkPokemon(mypokemon))) {
        res.status(INVALID_REQUEST)
          .json({"error": req.body.mypokemon + " not found in your Pokedex."});
      } else if (await checkPokemon(theirpokemon)) {
        res.status(INVALID_REQUEST)
          .json({"error": "You have already found " + req.body.theirpokemon + "."});
      } else {
        let query = "DELETE FROM Pokedex WHERE name = ?; INSERT INTO Pokedex VALUES (?, ?, ?);";
        await db.query(query, [mypokemon, theirpokemon, theirpokemon.toUpperCase(), getTime()]);
        let response = "You have traded your " + req.body.mypokemon;
        response += " for " + req.body.theirpokemon + "!";
        res.json({"success": response});
      }
    } catch (err) {
      res.status(INVALID_REQUEST).json({"error": "Missing mypokemon or theirpokemon parameter."});
    }
  } catch (err) {
    res.status(FILE_ERROR).json({"error": DB_ERROR});
  }
});

// endpoint to update the nickname for a given pokemon
app.post('/pokedex/update', async function(req, res) {
  try {
    try {
      let name = req.body.name;
      name = name.toLowerCase();
      let nickname = name.toUpperCase();
      if (req.body.nickname) {
        nickname = req.body.nickname;
      }
      let query = "UPDATE Pokedex SET nickname = ? WHERE name = ?;";
      try {
        await db.query(query, [nickname, name]);
        res.json({"success": "Your " + req.body.name + " is now named " + nickname + "!"});
      } catch (err) {
        res.status(INVALID_REQUEST).json({"error": req.body.name + " not found in your Pokedex."});
      }
    } catch (err) {
      res.status(INVALID_REQUEST).json({"error": "Missing name parameter."});
    }
  } catch (err) {
    res.status(FILE_ERROR).json({"error": DB_ERROR});
  }
});

/**
 * Gets the current date and time in string format.
 * @return {String} the current date and time
 */
function getTime() {
  let date = new Date();
  const NUM = 10;
  return date.getFullYear() +
    '-' + (date.getMonth() < NUM ? '0' : '') + (date.getMonth() + 1) +
    '-' + (date.getDate() < NUM ? '0' : '') + date.getDate() +
    ' ' + (date.getHours() < NUM ? '0' : '') + date.getHours() +
    ':' + (date.getMinutes() < NUM ? '0' : '') + date.getMinutes() +
    ':' + (date.getSeconds() < NUM ? '0' : '') + date.getSeconds();
}

/**
 * Checks if the passed pokemon is in the Pokedex or not.
 * @param {String} pokemon - the pokemon which is to be found in the Pokedex
 * @return {Boolean} true if the pokemon is in the Pokedex, false otherwise.
 */
async function checkPokemon(pokemon) {
  let rows = await db.query("SELECT name FROM Pokedex;");
  let pokedex = [];
  for (let i = 0; i < rows.length; i++) {
    pokedex.push(rows[i]["name"]);
  }
  return pokedex.includes(pokemon);
}

const PORT_NUM = 8000;

app.use(express.static("public"));
const PORT = process.env.PORT || PORT_NUM;
app.listen(PORT);
