#!/usr/bin/node

const id = process.argv[2];
const url = 'https://swapi-api.hbtn.io/api/films/' + id + '/';
const request = require('request');

request(url, (error, response, body) => {
  if (error) {
    console.error(error);
  }
  const resul = JSON.parse(body);
  console.log(resul.title);
});
