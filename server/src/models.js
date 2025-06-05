import dayjs from "dayjs";
/**
 * Classe CARD, che rappresenta una delle
 */
class Card {
  constructor(scenario, image, luck_index, round = 0, isTaken = false) {
    this.scenario = scenario;
    this.image = image;
    this.luck_index = luck_index;
    this.round = round;
    this.isTaken = isTaken;
    //TODO
    this.toJSON = () => {};
  }
}
class User {
  #password;
  constructor(username, password, matches) {
    this.username = username;
    this.#password = password;
    this.matches = matches;
    this.isCorrectPassword = (pass) => {
      pass === this.#password ? true : false;
    };
    //TODO
    this.toJSON = () => {};
  }
}
class Match {
  constructor(
    username,
    timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss'),
    status = "ONGOING",
    gamecards = []
  ) {
    this.username = username;
    //this.initial_cards = initial_cards;
    this.timestamp = timestamp;
    this.status = status;
    this.gamecards = gamecards;
    //TODO
    this.toJSON = () => {};
  }
}
/*
  class Game_card extends Card {
    constructor(card) {
      this.card = card;
      this.round = round;
      this.isTaken = isTaken;
    }
  }
*/

export { Card, Match, User };
