import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database(`C:\\Users\\valer\\Valeria\\Magi\\WebApp1\\esame1-gioco-sfortuna-vmoliterno\\server\\src\\data\\database.sqlite`, (err) => {
  if (err) {
    console.error("Errore di connessione al database:", err.message);
  } else {
    console.log("Connesso al database SQLite.");
  }
});

export default db;
