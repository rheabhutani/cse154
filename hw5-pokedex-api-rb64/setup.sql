--Name: Rhea Bhutani
--Date: December 4, 2019
--Section: CSE 154 AA
--A SQL code to create a database for Homework 5 and then create
--create a table for the Pokedex table for the name, the nickname
--and the date found.

DROP DATABASE IF EXISTS hw5db;

CREATE DATABASE hw5db;
USE hw5db;

DROP TABLE IF EXISTS Pokedex;

CREATE TABLE Pokedex (
	name VARCHAR(30) PRIMARY KEY,
	nickname VARCHAR(30),
	datefound DATETIME DEFAULT NOW()
);
