import db from "./data/db.js";
import { User, Match, Card, Game_card } from "./models.js";
import crypto from "crypto";

//--------------------------------------- USERS -----------------------------------------

/**
 * Gets a user by their username and password
 * This function uses scrypt for password hashing
 * It returns a User object if the credentials are valid, or false if they are not
 * @param {string} username
 * @param {string} password
 * @returns Promise<User | false>
 */
export function getUser(username, password) {
  return new Promise((resolve, reject) => {
    const statement = "SELECT * FROM USERS WHERE username = ?";

    db.get(statement, [username], (err, row) => {
      if (err) return reject(err);
      if (!row) return resolve(false); // user not found

      crypto.scrypt(password, row.salt, 16, (err, hashedPassword) => {
        if (err) return reject(err);
        const isValid = crypto.timingSafeEqual(
          Buffer.from(row.password, "hex"),
          hashedPassword
        );

        if (!isValid) {
          resolve(false);
        } else {
          resolve(new User(row.id, row.username, row.password));
        }
      });
    });
  });
}

//---------------------------------------- MATCHES --------------------------------------
/**
 * Gets all matches of a user by their username
 * assumes the user exists and checks have already been made
 * @param {string} username
 * @returns Promise<Match>
 */
export const getMatches = (username) => {
  return new Promise((resolve, reject) => {
    const statement = `SELECT 
        MATCHES.id as match_id,
        MATCHES.timestamp,
        MATCHES.match_status    
      FROM MATCHES 
      JOIN USERS ON USERS.id = MATCHES.user_id 
      WHERE USERS.username = ?`;
    db.all(statement, [username], (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows === undefined) {
        resolve([]);
      } else {
        const matches = rows.map(
          (match) =>
            new Match(
              username,
              match.timestamp,
              match.match_id,
              match.match_status
            )
        );

        resolve(matches);
      }
    });
  });
};

// utility function to check if a match with given id exists
const getMatchById = (id) => {
  return new Promise((resolve, reject) => {
    const statement = `SELECT * FROM MATCHES WHERE id = ?`;
    db.get(statement, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row) {
        resolve(row);
      } else {
        resolve(null);
      }
    });
  });
};

/**
 * Saves a starded match in the database
 * TODO: decide if it is saved as ongoing or when it's finished
 * @param {Match} match
 * @returns Promise<number> - The ID of the newly created match
 */
export const saveOngoingMatch = (match) => {
  return new Promise((resolve, reject) => {
    const statement =
      "INSERT INTO MATCHES (user_id, timestamp, match_status) VALUES ((SELECT id FROM USERS WHERE username = ?), ?, ?)";
    db.run(
      statement,
      [match.username, match.timestamp, match.status],
      function (err) {
        if (err) {
          reject(err);
        } else {
          // Match created successfully
          resolve(this.lastID);

          // solo per test
          //resolve(getMatches(match.username));
        }
      }
    );
  });
};

/**
 * Saves a finished match in the database
 * This is used when the match is over and we want to save the result
 * @param {Match} match
 * @returns Promise<number> - The ID of the newly created match
 */
export const saveFinishedMatch = (match) => {
  return new Promise((resolve, reject) => {
    const statement =
      "INSERT INTO MATCHES (user_id, timestamp, match_status) VALUES ((SELECT id FROM USERS WHERE username = ?), ?, ?)";
    db.run(
      statement,
      [match.username, match.timestamp, match.status],
      function (err) {
        if (err) {
          reject(err);
        } else {
          // Match created successfully
          resolve(this.lastID);
        }
      }
    );
  });
};

/**
 * Only useful if we save matches as ongoing
 * Updates the match status to finished
 * @param {number} id
 * @param {string} status - "WON", "LOST", "ONGOING"
 * @returns Promise<Void>
 * @throws Error if status is not one of the valid values
 */
export const updateMatch = (id, status) => {
  return new Promise((resolve, reject) => {
    if (status !== "WON" && status !== "LOST" && status !== "ONGOING")
      reject(new Error("Invalid match status"));

    const statement = "UPDATE MATCHES SET match_status = ? WHERE id = ?";
    db.run(statement, [status, id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

//---------------------------------------- CARDS ----------------------------------------
/**
 * Gets a card by its id
 * @param {number} id
 * @returns Promise<Card>
 */
export const getCard = (id) => {
  return new Promise((resolve, reject) => {
    const statement = "SELECT * FROM CARDS WHERE id = ?";
    db.get(statement, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve({ error: "Card not found" });
      } else {
        console.log("scenario: ", row.scenario);
        resolve(new Card(row.scenario, row.image, row.luck_index, row.id));
      }
    });
  });
};

/**
 * Gets cards by their ids
 * @param {Array<number>} ids
 * @returns Promise<Array<Card>>
 */
export const getCards = (ids) => {
  return new Promise((resolve, reject) => {
    if (!ids || ids.length === 0) {
      resolve([]);
      return;
    }
    const placeholders = ids.map(() => "?").join(",");
    const statement = `SELECT * FROM CARDS WHERE id IN (${placeholders})`;
    db.all(statement, ids, (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows === undefined) {
        console.log("No cards found for the given IDs");
        resolve([]);
      } else {
        //
        const cards = rows.map(
          (row) => new Card(row.scenario, row.image, row.luck_index, row.id)
        );
        resolve(cards);
      }
    });
  });
};

/* maybe for later

export const getAllIndexes = () => {
  return new Promise((resolve, reject) => {
    const statement = "SELECT luck_index FROM CARDS";
    db.all(statement, [], (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows === undefined) {
        resolve([]);
      } else {
        const indexes = rows.map((row) => row.luck_index);
        resolve(indexes);
      }
    });
  });
};
*/

//---------------------------------------- GAME_CARDS --------------------------------------
/**
 * Gets all game cards for a specific match
 * @param {number} matchId
 * @returns Promise<Array<Card>>
 */
export const getGameCards = (matchId) => {
  return new Promise((resolve, reject) => {
    const statement =
      "SELECT * FROM GAME_CARDS JOIN CARDS ON GAME_CARDS.card_id = CARDS.id WHERE match_id = ?";
    db.all(statement, [matchId], (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows === undefined) {
        resolve([]);
      } else {
        const cards = rows.map(
          (row) =>
            new Game_card(
              new Card(row.scenario, row.image, row.luck_index, row.card_id),
              row.match_id,
              row.round,
              row.card_status,
              row.id
            )
        );
        resolve(cards);
      }
    });
  });
};

/**
 * Creates a new game card for a match
 * @param {Game_card} card - The card object containing matchId, id, round, and status
 * @returns Promise<number> - The ID of the newly created game card
 */
export const createGameCard = async (gamecard) => {
  const m = await getMatchById(gamecard.match_id);
  const c = await getCard(gamecard.card.id);
  return new Promise((resolve, reject) => {
    if (!m) {
      return reject(new Error("Match inesistente"));
    }
    if (!c || c.error) {
      return reject(new Error("Carta inesistente"));
    }
    const statement =
      "INSERT INTO GAME_CARDS (match_id, card_id, round, card_status) VALUES (?, ?, ?, ?)";
    db.run(
      statement,
      [gamecard.match_id, gamecard.card.id, gamecard.round, gamecard.status],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};
