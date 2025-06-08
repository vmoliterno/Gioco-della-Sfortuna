import db from "./db.js";

const cards = [
  {
    scenario: "Andare a scuola senza pantaloni",
    image: "img/nopants_school.jpg",
    luck_index: 1.0,
  },
  {
    scenario: "Dimenticare di preparare un esame importante",
    image: "img/forgot_exam.jpg",
    luck_index: 2.0,
  },
  {
    scenario: "Essere inseguiti da un mostro invisibile",
    image: "img/invisible_monster.jpg",
    luck_index: 3.0,
  },
  {
    scenario: "Perdere l'autobus e arrivare tardi",
    image: "img/missed_bus.jpg",
    luck_index: 4.0,
  },
  {
    scenario: "Dimenticare la password del telefono",
    image: "img/forgot_password.jpg",
    luck_index: 5.0,
  },
  {
    scenario: "Essere bloccati in ascensore",
    image: "img/elevator_stuck.jpg",
    luck_index: 6.0,
  },
  {
    scenario: "Parlare in pubblico e dimenticare cosa dire",
    image: "img/public_speaking.jpg",
    luck_index: 7.0,
  },
  {
    scenario: "Dimenticare il portafoglio a casa",
    image: "img/forgot_wallet.jpg",
    luck_index: 8.0,
  },
  {
    scenario: "Scordarsi il compleanno di un amico importante",
    image: "img/forgot_birthday.jpg",
    luck_index: 9.0,
  },
  {
    scenario: "Avere i denti che cadono uno dopo l'altro",
    image: "img/falling_teeth.jpg",
    luck_index: 10.0,
  },
  {
    scenario: "Essere inseguiti da un cane feroce",
    image: "img/chasing_dog.jpg",
    luck_index: 11.0,
  },
  {
    scenario: "Essere nudi in pubblico",
    image: "img/naked_public.jpg",
    luck_index: 12.0,
  },
  {
    scenario: "Cadere senza mai fermarsi",
    image: "img/falling.jpg",
    luck_index: 13.0,
  },
  {
    scenario: "Perdere il controllo della macchina",
    image: "img/lost_control_car.jpg",
    luck_index: 14.0,
  },
  {
    scenario: "Essere in ritardo a un appuntamento cruciale",
    image: "img/late_appointment.jpg",
    luck_index: 15.0,
  },
  {
    scenario: "Non riuscire a muovere le gambe",
    image: "img/can't_move_legs.jpg",
    luck_index: 16.0,
  },
  {
    scenario: "Essere intrappolati in un labirinto senza uscita",
    image: "img/labyrinth.jpg",
    luck_index: 17.0,
  },
  {
    scenario: "Dimenticare come parlare",
    image: "img/forgot_how_to_speak.jpg",
    luck_index: 18.0,
  },
  {
    scenario: "Non riuscire a respirare",
    image: "img/can't_breathe.jpg",
    luck_index: 19.0,
  },
  {
    scenario: "Essere inseguiti da un insetto gigante",
    image: "img/giant_bug.jpg",
    luck_index: 20.0,
  },
  {
    scenario: "Perdere la voce proprio durante una presentazione",
    image: "img/lost_voice.jpg",
    luck_index: 21.0,
  },
  {
    scenario: "Essere circondati da gente che ride di te",
    image: "img/laughing_crowd.jpg",
    luck_index: 22.0,
  },
  {
    scenario: "Scordarsi di un documento importantissimo",
    image: "img/forgot_document.jpg",
    luck_index: 23.0,
  },
  {
    scenario: "Non trovare mai l'uscita da una stanza",
    image: "img/no_exit_room.jpg",
    luck_index: 24.0,
  },
  {
    scenario: "Essere bloccati in mezzo al nulla senza telefono",
    image: "img/stranded_no_phone.jpg",
    luck_index: 25.0,
  },
  {
    scenario: "Cadere dal letto e svegliarsi di colpo",
    image: "img/falling_bed.jpg",
    luck_index: 26.0,
  },
  {
    scenario: "Non riuscire a risolvere un problema semplice",
    image: "img/can't_solve_problem.jpg",
    luck_index: 27.0,
  },
  {
    scenario: "Essere inseguiti da un tornado",
    image: "img/tornado.jpg",
    luck_index: 28.0,
  },
  {
    scenario: "Perdere l'equilibrio e cadere da un'altissima altezza",
    image: "img/fall_high.jpg",
    luck_index: 29.0,
  },
  {
    scenario: "Non riuscire a mangiare perché tutto è disgustoso",
    image: "img/can't_eat.jpg",
    luck_index: 30.0,
  },
  {
    scenario: "Essere inseguiti da un'ombra minacciosa",
    image: "img/threatening_shadow.jpg",
    luck_index: 31.0,
  },
  {
    scenario: "Scordarsi il nome proprio in pubblico",
    image: "img/forgot_scenario.jpg",
    luck_index: 32.0,
  },
  {
    scenario: "Perdere tutti i denti in un attimo",
    image: "img/lost_all_teeth.jpg",
    luck_index: 33.0,
  },
  {
    scenario: "Essere inseguiti da uno squalo in piscina",
    image: "img/shark_pool.jpg",
    luck_index: 34.0,
  },
  {
    scenario: "Essere incapaci di scrivere o leggere",
    image: "img/can't_write_read.jpg",
    luck_index: 35.0,
  },
  {
    scenario: "Perdere la memoria per qualche minuto",
    image: "img/forgot_memory.jpg",
    luck_index: 36.0,
  },
  {
    scenario: "Cadere in un buco senza fondo",
    image: "img/bottomless_pit.jpg",
    luck_index: 37.0,
  },
  {
    scenario: "Essere incapaci di alzarsi dal letto",
    image: "img/can't_get_up.jpg",
    luck_index: 38.0,
  },
  {
    scenario: "Avere una voce che non si sente",
    image: "img/silent_voice.jpg",
    luck_index: 39.0,
  },
  {
    scenario: "Perdere la strada e non trovare la via di casa",
    image: "img/lost_way_home.jpg",
    luck_index: 40.0,
  },
  {
    scenario: "Essere inseguiti da fantasmi",
    image: "img/ghosts.jpg",
    luck_index: 41.0,
  },
  {
    scenario: "Scordarsi il codice della cassaforte",
    image: "img/forgot_code.jpg",
    luck_index: 42.0,
  },
  {
    scenario: "Avere un blackout improvviso",
    image: "img/blackout.jpg",
    luck_index: 43.0,
  },
  {
    scenario: "Essere inseguite da una folla arrabbiata",
    image: "img/angry_crowd.jpg",
    luck_index: 44.0,
  },
  {
    scenario: "Non riuscire a svegliarsi",
    image: "img/can't_wake_up.jpg",
    luck_index: 45.0,
  },
  {
    scenario: "Cadere da una scala senza fine",
    image: "img/falling_ladder.jpg",
    luck_index: 46.0,
  },
  {
    scenario: "Essere bloccati in un autobus senza freni",
    image: "img/bus_no_brakes.jpg",
    luck_index: 47.0,
  },
  {
    scenario: "Perdere l'orologio e non sapere che ora è",
    image: "img/lost_watch.jpg",
    luck_index: 48.0,
  },
  {
    scenario: "Essere incapaci di trovare le parole giuste",
    image: "img/can't_find_words.jpg",
    luck_index: 49.0,
  },
  {
    scenario: "Perdere l'equilibrio su una ringhiera",
    image: "img/lost_balance_rail.jpg",
    luck_index: 50.0,
  },
];

export default async function initializeDatabase() {
  await new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS CARDS (
        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, 
        scenario TEXT UNIQUE NOT NULL, image TEXT NOT NULL, 
        luck_index REAL UNIQUE NOT NULL
      ) STRICT;
      CREATE TABLE IF NOT EXISTS USERS (
        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, 
        username TEXT UNIQUE NOT NULL, 
        password TEXT NOT NULL
      ) STRICT;
      CREATE TABLE IF NOT EXISTS MATCHES (
        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, 
        user_id INTEGER NOT NULL REFERENCES USERS(id), 
        timestamp TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP), 
        match_status TEXT NOT NULL, 
          FOREIGN KEY(user) REFERENCES USERS(id)
      ) STRICT;
      CREATE TABLE IF NOT EXISTS GAME_CARDS (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        card_id INTEGER NOT NULL REFERENCES CARDS(id), 
        match_id INTEGER NOT NULL REFERENCES MATCHES(id), 
        round INTEGER NOT NULL, 
        card_status TEXT, 
          FOREIGN KEY (card_id) REFERENCES CARDS(id)
          FOREIGN KEY (match_id) REFERENCES MATCHES(id)
      ) STRICT;`,
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
  initializeCards();
  initializeUsers();
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
    db.get("SELECT COUNT(*) AS count FROM USERS", (err, row) => {
      if (err) return reject(err);

      if (row.count > 1) {
        console.log("Utenti già inizializzati");
        return resolve();
      }

      const stmt = db.prepare(
        "INSERT INTO USERS (username, password) VALUES (?, ?)"
      );
      for (const user of users) {
        stmt.run(user.username, user.password);
      }
      stmt.finalize((err) => {
        if (err) reject(err);
        else {
          console.log("Utenti di default inseriti");
          resolve();
        }
      });
    });
  });
}
