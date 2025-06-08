// imports
import express from 'express';
import initializeDatabase from "./src/data/seed.js"

// init express
const app = new express();
const port = 3001;

try {
  await initializeDatabase();
} catch {
  console.error("Errore nell'inizializzazione del db");
}

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});