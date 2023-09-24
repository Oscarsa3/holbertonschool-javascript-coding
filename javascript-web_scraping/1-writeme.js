#!/usr/bin/node

const fs = require('fs');

const filePath = process.argv[2];

const txt = process.argv[3];

const escribir = fs.createWriteStream(filePath, 'utf-8');

// Imprimir algun error generado
escribir.on('error', (error) => {
  console.error(error);
});

// Escribir el texto en el archivo
escribir.write(txt);
