import { Card, Match, Game_card, User } from "../models/models.mjs";

const SERVER_URL = "http://localhost:3001/api/v1";

// vota una certa risposta
// POST /api/answers/<id>/vote
const voteUp = async (answerId) => {
  const response = await fetch(`${SERVER_URL}/api/answers/${answerId}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vote: "up" }),
    credentials: "include",
  });

  // TODO: migliorare gestione errori
  if (!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  } else return null;
};

const login = async (credentials) => {
  const response = await fetch(`${SERVER_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getUserInfo = async () => {
  const response = await fetch(`${SERVER_URL}/sessions/current`, {
    credentials: "include",
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user; // an object with the error coming from the server
  }
};


const getQuestions = async () => {
  const response = await fetch(SERVER_URL + "/api/questions");
  if (response.ok) {
    const questionsJson = await response.json();
    return questionsJson.map(
      (q) => new Question(q.id, q.text, q.email, q.userId, q.date)
    );
  } else throw new Error("Internal server error");
};

// GET /api/v1/matches
const getMatches = async () => {
  const response = await fetch(SERVER_URL + "/api/v1/matches", {
    credentials: "include",
  });
  if (response.ok) {
    const matchesJson = await response.json();
    return matchesJson; // Assuming matchesJson is an array of match objects
  } else {
    const errDetails = await response.text();
    throw new Error(errDetails);
  }
};

// POST /api/v1/matches/end

// GET /api/v1/matches/start

// GET /api/v1/matches/next

// GET /api/v1/matches/demo/start

// GET /api/v1/matches/demo/next

const API = { login, getUserInfo };
export default API;
