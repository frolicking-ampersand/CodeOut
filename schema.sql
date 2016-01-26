CREATE DATABASE molboard;

USE molboard;

CREATE TABLE users (
 PersonID int,
 LastName varchar(255),
 FirstName varchar(255),
 Address varchar(255),
 City varchar(255)
);

CREATE TABLE boards (
  thing LONGBLOB
);
