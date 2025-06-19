import db from "./db.js";
import crypto from "crypto";

const cards = [
  {
    scenario: "Ti cade il gelato appena comprato",
    image: "1.png",
    luck_index: 3.5,
  },
  {
    scenario: "Il vento rovescia la bibita sul costume",
    image: "2.png",
    luck_index: 9.0,
  },
  {
    scenario: "Dimentichi l'accappatoio, torni bagnato",
    image: "3.png",
    luck_index: 11.5,
  },
  {
    scenario: "Ti siedi su una sedia rovente",
    image: "4.png",
    luck_index: 14.5,
  },
  {
    scenario: "I sandali si incollano alla sabbia calda",
    image: "5.png",
    luck_index: 18.5,
  },
  {
    scenario: "Scivoli su un'alga in riva",
    image: "6.png",
    luck_index: 20.5,
  },
  {
    scenario: "L'ombrellone vola e colpisce qualcuno",
    image: "7.png",
    luck_index: 21.0,
  },
  {
    scenario: "Senza crema, ti scotti tutto",
    image: "8.png",
    luck_index: 22.5,
  },
  {
    scenario: "Infradito rotte sul lungomare",
    image: "9.png",
    luck_index: 23.0,
  },
  {
    scenario: "Sabbia negli occhi mentre metti la crema",
    image: "10.png",
    luck_index: 24.0,
  },
  {
    scenario: "Asciugamano vola e finisce in mare",
    image: "11.png",
    luck_index: 24.5,
  },
  {
    scenario: "Bevi sabbia dalla bottiglia sbagliata",
    image: "12.png",
    luck_index: 26.5,
  },
  {
    scenario: "Bici a terra sotto il sole a picco",
    image: "13.png",
    luck_index: 27.0,
  },
  {
    scenario: "Trekking e pioggia nel mezzo",
    image: "14.png",
    luck_index: 29.0,
  },
  {
    scenario: "Medusa ti punge mentre nuoti",
    image: "15.png",
    luck_index: 29.5,
  },
  {
    scenario: "Abbronzato a macchie da occhiali",
    image: "16.png",
    luck_index: 31.5,
  },
  {
    scenario: "Dimentichi il portafoglio al lido",
    image: "17.png",
    luck_index: 32.5,
  },
  {
    scenario: "Gelato sciolto mentre fai la foto",
    image: "18.png",
    luck_index: 33.0,
  },
  {
    scenario: "Vicino con musica alta per ore",
    image: "19.png",
    luck_index: 35.5,
  },
  {
    scenario: "Sbagli spiaggia, niente mare",
    image: "20.png",
    luck_index: 36.0,
  },
  {
    scenario: "Gabbiani rubano la focaccia",
    image: "21.png",
    luck_index: 37.0,
  },
  {
    scenario: "Paletta rotta nel beach volley",
    image: "22.png",
    luck_index: 37.5,
  },
  {
    scenario: "Onda ti bagna i pantaloni",
    image: "23.png",
    luck_index: 39.0,
  },
  {
    scenario: "Sabbia ovunque, gratti per giorni",
    image: "24.png",
    luck_index: 39.5,
  },
  {
    scenario: "Zaino aperto, vestiti bagnati",
    image: "25.png",
    luck_index: 42.0,
  },
  {
    scenario: "Spina nel materassino gonfiabile",
    image: "26.png",
    luck_index: 45.0,
  },
  {
    scenario: "GPS ti manda nel posto sbagliato",
    image: "27.png",
    luck_index: 46.5,
  },
  {
    scenario: "Pallone scoppia durante la partita",
    image: "28.png",
    luck_index: 48.0,
  },
  {
    scenario: "Borsa termica rovesciata in auto",
    image: "29.png",
    luck_index: 53.5,
  },
  {
    scenario: "Allergia al polline in vacanza",
    image: "30.png",
    luck_index: 54.0,
  },
  {
    scenario: "Dimentichi il cavo per i dispositivi",
    image: "31.png",
    luck_index: 57.5,
  },
  {
    scenario: "Telefono cade in mare con selfie",
    image: "32.png",
    luck_index: 58.5,
  },
  {
    scenario: "Prendi la sdraio di un bimbo urlante",
    image: "33.png",
    luck_index: 59.5,
  },
  {
    scenario: "Panino cade nella sabbia al primo morso",
    image: "34.png",
    luck_index: 60.5,
  },
  {
    scenario: "Escursione senza acqua a metà strada",
    image: "35.png",
    luck_index: 61.0,
  },
  {
    scenario: "Zanzara ti punge sotto il piede",
    image: "36.png",
    luck_index: 62.0,
  },
  {
    scenario: "Formiche addosso nel pisolino",
    image: "37.png",
    luck_index: 63.0,
  },
  {
    scenario: "Zip del costume rotta",
    image: "38.png",
    luck_index: 65.5,
  },
  {
    scenario: "Finisci il libro il primo giorno",
    image: "39.png",
    luck_index: 68.5,
  },
  {
    scenario: "Hotel senza Wi-Fi promesso",
    image: "40.png",
    luck_index: 75.0,
  },
  {
    scenario: "Pioggia nella tenda lasciata aperta",
    image: "41.png",
    luck_index: 80.5,
  },
  {
    scenario: "Cadi dalla barca e resti solo in mare",
    image: "42.png",
    luck_index: 81.0,
  },
  {
    scenario: "Dormi sulla sabbia, telo stampato in faccia",
    image: "43.png",
    luck_index: 84.0,
  },
  {
    scenario: "Colpito da aquilone durante la gara",
    image: "44.png",
    luck_index: 84.5,
  },
  {
    scenario: "Perdi l'ultimo bus e niente campo",
    image: "45.png",
    luck_index: 86.5,
  },
  {
    scenario: "Vendi-occhiali ti rincorre per strada",
    image: "46.png",
    luck_index: 89.0,
  },
  {
    scenario: "Condizionatore allaga la valigia",
    image: "47.png",
    luck_index: 91.0,
  },
  {
    scenario: "Dimentichi il biglietto del treno",
    image: "48.png",
    luck_index: 94.0,
  },
  {
    scenario: "Birra aperta nel borsone pulito",
    image: "49.png",
    luck_index: 96.5,
  },
  {
    scenario: "Tenda piantata su un formicaio attivo",
    image: "50.png",
    luck_index: 98.0,
  },
];


export default async function initializeDatabase() {
  await new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS CARDS (
        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, 
        scenario TEXT UNIQUE NOT NULL, image TEXT NOT NULL, 
        luck_index REAL UNIQUE NOT NULL
      ) STRICT;`,
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
  await new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS USERS (
        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, 
        username TEXT UNIQUE NOT NULL, 
        password TEXT NOT NULL,
        salt TEXT NOT NULL
      ) STRICT;`,
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
  await new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS MATCHES (
        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, 
        user_id INTEGER NOT NULL REFERENCES USERS(id), 
        timestamp TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP), 
        match_status TEXT NOT NULL, 
        FOREIGN KEY(user_id) REFERENCES USERS(id)
      ) STRICT;`,
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
  await new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS GAME_CARDS (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        card_id INTEGER NOT NULL REFERENCES CARDS(id), 
        match_id INTEGER NOT NULL REFERENCES MATCHES(id), 
        round INTEGER NOT NULL, 
        card_status TEXT, 
        FOREIGN KEY (card_id) REFERENCES CARDS(id),
        FOREIGN KEY (match_id) REFERENCES MATCHES(id)
      ) STRICT;`,
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
  await initializeCards();
  await initializeUsers();
  await initializeMatches();
  await initializeGameCards();
}
async function initializeCards() {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) AS count FROM CARDS", (err, row) => {
      if (err) return reject(err);

      if (row.count > 49) {
        console.log("Carte già inizializzate");
        return resolve();
      }

      const insertStmt = db.prepare(
        "INSERT INTO CARDS (scenario, image, luck_index) VALUES (?, ?, ?)"
      );

      for (const card of cards) {
        insertStmt.run(card.scenario, card.image, card.luck_index);
      }

      insertStmt.finalize((err) => {
        if (err) reject(err);
        else {
          console.log("Carte inizializzate correttamente");
          resolve();
        }
      });
    });
  });
}

async function initializeUsers() {
  const users = [
    { username: "utente1", password: "password1" },
    { username: "utente2", password: "password2" },
  ];

  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) AS count FROM USERS", async (err, row) => {
      if (err) return reject(err);

      if (row.count > 1) {
        console.log("Utenti già inizializzati");
        return resolve();
      }

      const stmt = db.prepare(
        "INSERT INTO USERS (username, password, salt) VALUES (?, ?, ?)"
      );

      for (const user of users) {
        const salt = crypto.randomBytes(16).toString("hex");

        await new Promise((res, rej) => {
          crypto.scrypt(user.password, salt, 16, (err, derivedKey) => {
            if (err) return rej(err);
            const hashedPassword = derivedKey.toString("hex");
            stmt.run(user.username, hashedPassword, salt, (err) => {
              if (err) rej(err);
              else res();
            });
          });
        });
      }

      stmt.finalize((err) => {
        if (err) reject(err);
        else {
          console.log("Utenti di default inseriti con password hash e salt");
          resolve();
        }
      });
    });
  });
}

async function initializeMatches() {
  const matches = [
    { user_id: 1, timestamp: "2025-06-08 18:50:57", status: "WON" },
    { user_id: 1, timestamp: "2025-06-07 16:30:22", status: "WON" },
    { user_id: 1, timestamp: "2024-03-18 07:05:54", status: "LOST" },
  ];

  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) AS count FROM MATCHES", (err, row) => {
      if (err) return reject(err);

      if (row.count > 1) {
        console.log("Match già inizializzati");
        return resolve();
      }

      const stmt = db.prepare(
        "INSERT INTO MATCHES (user_id, timestamp, match_status) VALUES (?, ?, ?)"
      );
      for (const match of matches) {
        stmt.run(match.user_id, match.timestamp, match.status);
      }
      stmt.finalize((err) => {
        if (err) reject(err);
        else {
          console.log("Match di default inseriti");
          resolve();
        }
      });
    });
  });
}

async function initializeGameCards() {
  const cards = [
    //match 1, vinto
    { card_id: 1, match_id: 1, round: 0, card_status: "INITIAL" },
    { card_id: 2, match_id: 1, round: 0, card_status: "INITIAL" },
    { card_id: 3, match_id: 1, round: 0, card_status: "INITIAL" },
    { card_id: 4, match_id: 1, round: 1, card_status: "WON" },
    { card_id: 5, match_id: 1, round: 2, card_status: "WON" },
    { card_id: 6, match_id: 1, round: 3, card_status: "WON" },

    // match 2, vinto
    { card_id: 7, match_id: 2, round: 0, card_status: "INITIAL" },
    { card_id: 8, match_id: 2, round: 0, card_status: "INITIAL" },
    { card_id: 9, match_id: 2, round: 0, card_status: "INITIAL" },
    { card_id: 10, match_id: 2, round: 1, card_status: "LOST" },
    { card_id: 11, match_id: 2, round: 2, card_status: "WON" },
    { card_id: 12, match_id: 2, round: 3, card_status: "WON" },
    { card_id: 13, match_id: 2, round: 4, card_status: "WON" },

    //match 3, perso
    { card_id: 14, match_id: 3, round: 0, card_status: "INITIAL" },
    { card_id: 15, match_id: 3, round: 0, card_status: "INITIAL" },
    { card_id: 16, match_id: 3, round: 0, card_status: "INITIAL" },
    { card_id: 17, match_id: 3, round: 1, card_status: "LOST" },
    { card_id: 18, match_id: 3, round: 1, card_status: "LOST" },
    { card_id: 19, match_id: 3, round: 3, card_status: "LOST" },
  ];

  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) AS count FROM GAME_CARDS", (err, row) => {
      if (err) return reject(err);

      if (row.count > 1) {
        console.log("Game_cards già inizializzate");
        return resolve();
      }

      const stmt = db.prepare(
        "INSERT INTO GAME_CARDS (card_id, match_id, round, card_status) VALUES (?, ?, ?, ?)"
      );
      for (const card of cards) {
        stmt.run(card.card_id, card.match_id, card.round, card.card_status);
      }
      stmt.finalize((err) => {
        if (err) reject(err);
        else {
          console.log("Game_cards di default inserite");
          resolve();
        }
      });
    });
  });
}
