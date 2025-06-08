import dayjs from "dayjs";

// to prevent typos
const MatchStatus = {
  ONGOING: "ONGOING",
  WON: "WON",
  LOST: "LOST",
};

const CardStatus = {
  INITIAL: "INITIAL",
  WON: "WON",
  LOST: "LOST",
};

/**
 * Represents a card in the game, maps the CARDS table in the database
 * @class CARD
 * @property {string} scenario - The scenario associated with the card.
 * @property {string} image - The image URL for the card.
 * @property {number} luck_index PRIVATE - The luck index of the card, used to determine its value
 * @property {number} id - The unique identifier for the card.
 * @method toJSON - Returns a JSON representation of the card, with the luck_index
 * @method toJSONPrivate - Returns a JSON representation of the card, without the luck_index
 * @method getLuckIndex - Returns the luck index of the card.
 * @method isBetween - Checks if the luck index is between two values.
 * @method isGreaterThan - Checks if the luck index is greater than a specified value.
 * @method isLessThan - Checks if the luck index is less than a specified value.
 */
class Card {
  #luck_index;
  constructor(scenario, image, luck_index, id) {
    this.scenario = scenario;
    this.image = image;
    this.#luck_index = luck_index;
    this.id = id;

    this.toJSON = () => {
      return {
        scenario: this.scenario,
        image: this.image,
        luck_index: this.getLuckIndex(),
        id: this.id,
      };
    };

    this.toJSONPrivate = () => {
      return {
        scenario: this.scenario,
        image: this.image,
        id: this.id,
      };
    };

    this.getLuckIndex = () => {
      return this.#luck_index;
    };

    this.isBetween = (min, max) => {
      return this.#luck_index >= min && this.#luck_index <= max;
    };

    this.isGreaterThan = (value) => {
      return this.#luck_index > value;
    };

    this.isLessThan = (value) => {
      return this.#luck_index < value;
    };
  }
}

/**
 * Represents a user in the game. Maps the USERS table in the database.
 * @class User
 * @property {number} id - The unique identifier for the user.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user (stored securely).
 * @property {Array<Match>} matches - The matches associated with the user.
 * @method isCorrectPassword - Checks if the provided password matches the user's password.
 * @method toJSON - Returns a JSON representation of the user, excluding the password.
 */
class User {
  #password;
  constructor(id, username, password, matches) {
    this.id = id;
    this.username = username;
    this.#password = password;
    this.matches = matches;
    // methods
    this.isCorrectPassword = (pass) => {
      pass === this.#password ? true : false;
    };
    this.toJSON = () => {
      return {
        username: this.username,
        matches: this.matches,
      };
    };
  }
}

/**
 * Represents a match in the game. Maps the MATCHES and GAME_CARDS tables in the database.
 * @class Match
 * @property {number} id - The unique identifier for the match.
 * @property {string} username - The username of the player in the match.
 * @property {string} timestamp - The timestamp when the match was created.
 * @property {string} status - The status of the match, can be "ONGOING", "WON", or "LOST".
 * @property {Array<Game_card>} gamecards - The cards used in the match.
 * @method toJSON - Returns a JSON representation of the match.
 * @method outcome - Checks the current status of the match based on the gamecards.
 */
class Match {
  constructor(
    username,
    timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss"),
    id = null,
    status = MatchStatus.ONGOING,
    gamecards = []
  ) {
    this.id = id;
    this.username = username;
    this.timestamp = timestamp;
    this.status = status;
    this.gamecards = gamecards;
    // methods
    this.toJSON = () => {
      return {
        username: this.username,
        timestamp: this.timestamp,
        status: this.status,
        gamecards: this.gamecards.map((card) => {
          card.toJSON();
        }),
      };
    };

    // evaluates if the match is WON, LOST or ONGOING after every card placed
    this.outcome = () => {
      if (
        this.gamecards.filter((card) => card.status === MatchStatus.WON)
          .length >= 3
      )
        return MatchStatus.WON;
      else if (
        this.gamecards.filter((card) => card.status === MatchStatus.LOST)
          .length >= 3
      )
        return MatchStatus.LOST;
      else return MatchStatus.ONGOING;
    };
  }
}

/**
 * Represents a gamecard in the game, maps the GAME_CARDS table in the database
 * @class GAME_CARD
 * @property {Card} card - The base card associated with the game_card.
 * @property {number} round - The round number in which the card has been used.
 * @property {string} status - The status of the card, can be "INITIAL", "WON", or "LOST".
 * @property {number} id - The unique identifier for the card.

 * @method toJSON - Returns a JSON representation of the card
 * @method getLuckIndex - Returns the original card's luck_index
 */
class Game_card {
  constructor(card, match_id, round, status, id = null) {
    this.card = card;
    this.match_id = match_id;
    this.round = round;
    this.status = status;
    this.id = id;

    this.toJSON = () => {
      return {
        card: this.card.toJSON(),
        match_id: this.match_id,
        round: this.round,
        status: this.status,
        id: this.id,
      };
    };
    // forse da togliere perchè compreso nel toJSON
    this.getLuckIndex = () => {
      return this.card.getLuckIndex();
    };
  }
}

export { Card, Match, User, Game_card, MatchStatus, CardStatus };
