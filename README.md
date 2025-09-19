# Gioco della Sfortuna

Questo progetto è stato sviluppato per l'esame di **Applicazioni Web I** del corso di Laurea Magistrale in Ingegneria Informatica del Politecnico di Torino.  
L’applicazione permette di giocare a una versione single-player del gioco da tavolo *“Stuff Happens”*, con carte che rappresentano situazioni sfortunate in un determinato campo della vita.

---

## Descrizione del gioco

- Ogni giocatore inizia con 3 carte casuali e deve ottenere un totale di 6 carte per vincere.  
- In ogni round viene presentata una nuova situazione orribile; il giocatore deve indovinare la posizione corretta della carta rispetto a quelle già in suo possesso.  
- I giocatori registrati possono giocare più partite e visualizzare la cronologia completa nel proprio profilo.  
- Gli utenti anonimi possono giocare solo partite demo di un round.  
- La partita termina quando il giocatore raccoglie 6 carte (vittoria) o sbaglia 3 collocazioni (sconfitta).  

---

## Stack Tecnologico

- **Front-end:** React (SPA), JavaScript, React Router, React Hooks, Strict Mode attivo  
- **Back-end:** Node.js 22.x + Express  
- **Database:** SQLite (gestito tramite il pacchetto `sqlite3`)  
- **Autenticazione:** Passport.js con session cookie e password hashed + salt  
- **Altre librerie:** day.js, react-bootstrap  

---

## Struttura del progetto


### React Client Application Routes

- Route `/`: Pagina principale con introduzione al gioco. Mostra istruzioni e permette di accedere alla demo o al login.
- Route `/login`: Pagina di login per accedere alla modalità partita registrata.
- Route `/game`: Schermata di gioco completa (per utenti loggati). Mostra mazzo, carta attuale e mano.
- Route `/demo`: Versione semplificata del gioco (1 turno, senza vite), accessibile a ospiti.
- Route `/user`: Mostra la cronologia delle partite giocate dall’utente autenticato.

### API Server

- POST `/api/v1/sessions`
  - Body: `{ username, password }`
  - Ritorna l'username autenticato o errore
- GET `/api/v1/sessions`
  - Ritorna l'utente loggato, se presente
- GET `/api/v1/matches/start`
  - Avvia una nuova partita per l’utente
  - Ritorna 3 carte iniziali ordinate
- GET `/api/v1/round/next`
  - Ritorna la prossima carta da provare a indovinare
- POST `/api/v1/round/guess`
  - Body: `{ position }` (int tra -1 e 5)
  - _position_ = -1 si applica solo se scade il tempo
  - Ritorna esito, mano aggiornata, status partita
- POST `/api/v1/matches/end`
  - Salva la partita nel database e restituisce il match salvato
- GET `/api/v1/matches`
  - Ritorna la cronologia delle partite dell’utente
- GET `/api/v1/demo/start`
  - Avvia una demo (ospite): ritorna 3 carte iniziali
- GET `/api/v1/demo/next`
  - Ritorna la carta da indovinare nella demo
- POST `/api/v1/demo/guess`
  - Body: `{ position }` (int tra -1 e 3)
  - _position_ = -1 solo se scade il tempo
  - Ritorna esito, mano finale, status demo

### Database Tables

- Table `CARDS`: contiene tutte le carte disponibili nel gioco. Ogni carta ha uno `id`, un `scenario` descrittivo, un `image` (path immagine) e un `luck_index` (indice di sfortuna, univoco).
- Table `USERS`: utenti registrati. Ogni utente ha `id`, `username`, `password` e `salt` per la sicurezza della password.
- Table `MATCHES`: rappresenta una partita completata. Contiene `id`, `user_id` (collegato a USERS), `timestamp` e `match_status` (`WON`, `LOST`, `ONGOING`).
- Table `GAME_CARDS`: carte giocate in una specifica partita. Contiene `id`, `card_id`, `match_id`, `round` e `card_status` (`INITIAL`, `WON`, `LOST`), legate a `CARDS` e `MATCHES`.


### Main React Components

- `Navbar` (in `Navbar.jsx`): barra superiore con login, utente, timer e vite durante il gioco.
- `HomePage` (in `HomePage.jsx`): schermata introduttiva con descrizione e accessi.
- `MatchPage` (in `MatchPage.jsx`): logica completa di una partita, con gestione turni, vite e timer.
- `DemoPage` (in `DemoPage.jsx`): logica semplificata per una partita dimostrativa (1 round, nessuna vita).
- `UserPage` (in `UserPage.jsx`): mostra la cronologia delle partite dell’utente loggato.
- `GameBoard` (in `GameBoard.jsx`): mostra il mazzo e la carta da inserire.
- `Hand` (in `Hand.jsx`): visualizza la mano corrente e permette l’inserimento delle carte.
- `GameCard` (in `GameCard.jsx`): componente grafico di una singola carta.
- `RoundSummary` (in `RoundSummary.jsx`): mostra il risultato di un turno.
- `MatchSummary` (in `MatchSummary.jsx`): mostra l’esito finale della partita.

### Screenshot

#### Partita in corso
![Screenshot Game](./readme/image.png)

#### Cronologia utente
![Screenshot History](./readme/cronologia.png)

### Users Credentials
Utenti con qualche partita già salvata per avere un'idea di come sarà la cronologia.

- `utente1`, `password1`
- `utente2`, `password2`
