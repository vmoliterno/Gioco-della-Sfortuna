const API_URL = 'http://localhost:3001/api/v1';

function httpGET(path) {
  return fetch(`${API_URL}${path}`, {
    method: 'GET',
    credentials: 'include',
  }).then(handleResponse);
}

function httpPOST(path, body) {
  return fetch(`${API_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(handleResponse);
}

function handleResponse(response) {
  if (response.ok) return response.json();
  return response.json().then(err => { throw err; });
}

// AUTH
async function login(credentials) {
  return httpPOST('/sessions', credentials);
}

async function getUserInfo() {
  return httpGET('/sessions');
}

// GAME MATCH (utente loggato)
async function startMatch() {
  return httpGET('/matches/start');
}

async function getNextRoundCard() {
  return httpGET('/round/next');
}

async function sendGuess(position) {
  return httpPOST('/round/guess', { position });
}

async function endMatch() {
  return httpPOST('/matches/end', {});
}

async function getMatchHistory() {
  return httpGET('/matches');
}

// GAME DEMO (utente anonimo)
async function startDemo() {
  return httpGET('/demo/start');
}

async function getNextDemoCard() {
  return httpGET('/demo/next');
}

async function sendDemoGuess(position) {
  return httpPOST('/demo/guess', { position });
}

// EXPORT API
export default {
  // Auth
  login,
  getUserInfo,

  // Match (loggato)
  startMatch,
  getNextRoundCard,
  sendGuess,
  endMatch,
  getMatchHistory,

  // Demo (anonimo)
  startDemo,
  getNextDemoCard,
  sendDemoGuess,
};
