// imports
import express from "express";
import initializeDatabase from "./src/data/seed.js";
import cors from "cors";
import morgan from "morgan";
import { check, validationResult } from "express-validator";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import * as dao from "./src/dao.js";
import {
  Match,
  Game_card,
  Card,
  CardStatus,
  MatchStatus,
} from "./src/models.js";
import { randomIndexes, sortCardsByLuckIndex } from "./src/utils.js";

//init database
try {
  await initializeDatabase();
} catch {
  console.error("Errore nell'inizializzazione del db");
}

// init express
const app = new express();
const port = 3001;
// middleware
app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessState: 200,
  credentials: true,
};

app.use(cors(corsOptions));

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await dao.getUser(username, password);
    if (!user) return cb(null, false, "Incorrect username or password.");

    return cb(null, user);
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "Not authorized" });
};
//validation middleware
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

app.use(
  session({
    secret: "shhhhh... it's a secret!",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

/* ROUTES */

// POST /api/sessions
app.post("/api/sessions", passport.authenticate("local"), (req, res) => {
  res.status(200).json(req.user.username);
});

// GET /api/v1/matches
app.get(
  "/api/v1/matches",
  isLoggedIn,
  [check("username").isString().notEmpty().withMessage("Username is required")],
  async (req, res) => {
    try {
      const username = req.user.username;
      const matches = await dao.getMatches(username);
      for (const match of matches) {
        const cards = await dao.getGameCards(match.id);
        match.gamecards = cards;
      }

      res.status(200).json(matches.map((m) => m.toJSON()));
    } catch (err) {
      console.error("Errore durante il recupero delle partite:", err);
      res.status(500).json({ error: "Errore interno del server" });
    }
  }
);

// POST /api/v1/matches/end
app.post("/api/v1/matches/end", isLoggedIn, async (req, res) => {
  const { match } = req.session;

  if (!match || match.status === MatchStatus.ONGOING)
    return res.status(400).json({ error: "Partita non completata" });

  const savedMatch = new Match(
    req.user.username,
    match.timestamp,
    match.status,
    []
  );

  const matchId = await dao.saveFinishedMatch(savedMatch);

  for (const c of match.gamecards) {
    const gc = new Game_card(
      new Card("", "", 0, c.cardId),
      matchId,
      c.round,
      c.status
    );
    await dao.createGameCard(gc);
  }

  const gamecards = await dao.getGameCards(matchId);
  savedMatch.id = matchId;
  savedMatch.gamecards = gamecards;

  delete req.session.match;

  res.status(201).json(savedMatch.toJSON());
});

// GET /api/v1/matches/start
app.get("/api/v1/matches/start", isLoggedIn, async (req, res) => {
  const ids = randomIndexes(8);
  const initialIds = ids.slice(0, 3);

  const initialCards = await dao.getCards(initialIds);
  const sorted = sortCardsByLuckIndex(initialCards);
  req.session.match = {
    cardIds: ids,
    round: 0,
    status: MatchStatus.ONGOING,
    gamecards: initialCards.map((c) => ({
      cardId: c.id,
      round: null,
      status: CardStatus.INITIAL,
    })),
  };

  res.json(sorted.map((c) => c.toJSON()));
});

// GET /api/v1/matches/next
app.get("/api/v1/round/next", isLoggedIn, async (req, res) => {
  const sessionMatch = req.session.match;

  if (!sessionMatch || sessionMatch.status !== MatchStatus.ONGOING)
    return res
      .status(400)
      .json({ error: "Partita non inizializzata o già conclusa" });

  const cardId = sessionMatch.cardIds[3 + sessionMatch.round];
  const card = await dao.getCard(cardId);

  res.json(card.toJSONPrivate());
});

// POST /api/v1/round/guess
app.post(
  "/api/v1/round/guess",
  [
    body("position")
      .notEmpty()
      .withMessage("La posizione è obbligatoria")
      .isInt({ min: 0, max: 5 })
      .withMessage("La posizione deve essere un numero valido tra 0 e 5"),
  ],
  handleValidation,
  isLoggedIn,
  async (req, res) => {
    const { match } = req.session;
    const { position } = req.body;

    if (!match || match.status !== MatchStatus.ONGOING)
      return res
        .status(400)
        .json({ error: "Partita non inizializzata o già conclusa" });

    const round = match.round;
    const cardId = match.cardIds[3 + round];
    if (!cardId)
      return res
        .status(400)
        .json({ error: "Carta non disponibile per questo round" });

    const card = await dao.getCard(cardId);

    const ownedCards = await dao.getCards(
      match.gamecards
        .filter((c) => c.status !== CardStatus.LOST)
        .map((c) => c.cardId)
    );
    const sorted = sortCardsByLuckIndex(ownedCards);

    let correct;
    if (position < 0 || position > sorted.length) {
      return res.status(400).json({ error: "Posizione non valida" });
    } else if (position === 0) {
      correct = card.isLessThan(sorted[position]);
    } else if (position === sorted.length) {
      correct = card.isGreaterThan(sorted[position - 1]);
    } else {
      correct = card.isBetween(sorted[position - 1], sorted[position]);
    }

    match.gamecards.push({
      cardId: cardId,
      round: round,
      status: correct ? CardStatus.WON : CardStatus.LOST,
    });
    match.round++;

    const myMatch = new Match(
      req.user.username,
      match.timestamp,
      match.status,
      match.gamecards.map(
        (c) =>
          new Game_card(new Card("", "", 0, c.cardId), null, c.round, c.status)
      )
    );

    match.status = myMatch.outcome();

    res.status(200).json({
      correct: correct,
      matchStatus: match.status,
      round: match.round,
      hand: await dao
        .getCards(
          match.gamecards
            .filter(
              (c) =>
                c.status === CardStatus.INITIAL || c.status === CardStatus.WON
            )
            .map((c) => c.cardId)
        )
        .then((c) => sortCardsByLuckIndex(c).map((c) => c.toJSON())),
    });
  }
);

// GET /api/v1/matches/demo/start
app.get("/api/v1/demo/start", async (req, res) => {
  const ids = randomIndexes(4);
  const initialIds = ids.slice(0, 3);

  const initialCards = await dao.getCards(initialIds);

  req.session.demo = {
    cardIds: ids,
    round: 0,
  };

  const sorted = sortCardsByLuckIndex(initialCards).map((c) => c.toJSON());
  res.status(200).json(sorted);
});

// GET /api/v1/matches/demo/next
app.get("/api/v1/demo/next", async (req, res) => {
  if (!req.session.demo)
    return res.status(400).json({ error: "Demo non inizializzata" });

  const cardId = req.session.demo.cardIds[3];
  const card = await dao.getCard(cardId);

  res.status(200).json(card.toJSONPrivate());
});
// POST /api/v1/matches/demo/guess
import { sortCardsByLuckIndex } from "./src/utils.js";

app.post(
  "/api/v1/demo/guess",
  [
    body("position")
      .notEmpty()
      .withMessage("La posizione è obbligatoria")
      .isInt({ min: 0, max: 3 })
      .withMessage("La posizione deve essere un numero valido tra 0 e 3"),
  ],
  handleValidation,
  async (req, res) => {
    const { position } = req.body;
    const demo = req.session.demo;

    if (!demo)
      return res.status(400).json({ error: "Partita demo non inizializzata" });

    const guessCard = await dao.getCard(demo.guessCardId);
    const initialCards = await dao.getCards(demo.cardIds.slice(0, 3));
    const sorted = sortCardsByLuckIndex(initialCards);

    if (position < 0 || position > sorted.length)
      return res.status(400).json({ error: "Posizione non valida" });

    let correct;
    if (position === 0) {
      correct = guessCard.isLessThan(sorted[0]);
    } else if (position === sorted.length) {
      correct = guessCard.isGreaterThan(sorted[sorted.length - 1]);
    } else {
      correct = guessCard.isBetween(sorted[position - 1], sorted[position]);
    }

    sorted.push(guessCard);
    sorted.sort((a, b) => a.getLuckIndex() - b.getLuckIndex());

    const matchStatus = correct ? MatchStatus.WON : MatchStatus.LOST;

    delete req.session.demo;

    res.status(200).json({
      correct,
      matchStatus,
      hand: sorted.map((c) => c.toJSON()),
    });
  }
);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Not authorized" });
  } else {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
