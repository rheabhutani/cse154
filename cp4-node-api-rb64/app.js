/*
 * API for calculating areas and perimeters for various shapes.
 * /^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v/
 * Endpoint: /circle
 * Response Format: JSON
 * Response Example: {"circumference":6.283185307179586,"area":3.141592653589793}
 * Returns area and circumeference of a circle with given radius
 * /^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v/
 * Endpoint: /rectangle
 * Response Format: JSON
 * Response Example: {"perimeter":30,"area":50}
 * Returns the area and perimeter of a rectangle with given height and width
 * /^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v/
 * Endpoint: /triangle
 * Response Format: JSON
 * Response Example: {"perimeter":3,"area":0.4330127018922193}
 * Returns the area and perimeter of a triangle with given side
 */

"use strict";

const express = require('express');
const app = express();

const INVALID_PARAM_ERROR = 400;

app.get('/circle', function(req, res) {
  if (req.query.radius) {
    if (req.query.radius >= 0) {
      let radius = parseFloat(req.query.radius);
      let circumference = Math.PI * radius * 2;
      let area = Math.PI * radius * radius;
      res.json({"circumference": circumference, "area": area});
    } else {
      res.status(INVALID_PARAM_ERROR).send("Enter a positive number");
    }
  } else {
    res.status(INVALID_PARAM_ERROR).send("Enter a number");
  }
});

app.get('/rectangle', function(req, res) {
  if (req.query.width && req.query.height) {
    if (req.query.width >= 0 && req.query.height >= 0) {
      let width = parseFloat(req.query.width);
      let height = parseFloat(req.query.height);
      let perimeter = (width + height) * 2;
      let area = width * height;
      res.json({"perimeter": perimeter, "area": area});
    } else {
      res.status(INVALID_PARAM_ERROR).send("Enter a positive number");
    }
  } else {
    res.status(INVALID_PARAM_ERROR).send("One or more numbers not entered");
  }
});

app.get('/triangle', function(req, res) {
  if (req.query.side) {
    if (req.query.side >= 0) {
      let side = parseFloat(req.query.side);
      let perimeter = 3 * side;
      let area = (Math.sqrt(3) / 4) * side * side;
      res.json({"perimeter": perimeter, "area": area});
    } else {
      res.status(INVALID_PARAM_ERROR).send("Enter a positive number");
    }
  } else {
    res.status(INVALID_PARAM_ERROR).send("Enter a number");
  }
});

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
