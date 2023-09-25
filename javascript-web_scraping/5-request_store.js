#!/usr/bin/node

const fs = require('fs');
const url = process.argv[2];
const filepath = process.argv[3];
const request = require('request');

request(url, (error, response, body) => {
  if (error) {
    console.error(error);
  }
  fs.writeFile(filepath, body, (error) => {
    if (error) {
      console.error(error);
    }
  });
});
