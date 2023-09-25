#!/usr/bin/node

const url = process.argv[2];
const request = require('request');

request(url, (error, response, body) => {
  const alls = JSON.parse(body);
  const results = {};
  for (all of alls) {
    const id = all.userId.toString();
    if (!results[id]) {
      results[id] = 0;
    }
    if (all.completed) {
      results[id]++;
    }
  }
  for (const k in results) {
    if (!results[k]){
      delete results[k];
    }
  }
  console.log(results);
});
