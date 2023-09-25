#!/usr/bin/node

const api = process.argv[2];
const request = require('request');

request(api, (error, response, body) => {
  if (error) {
    console.error(error);
  };
  const result = JSON.parse(body);
  let i = 0;
  let x = 0;
  while (result['results'][i]) {
    result['results'][i]['characters'].forEach((value) => {
      if (value.endsWith('/18/')) {
        x++;
      };
    })
    i++;
  };
  console.log(x);
});
