// here I put all the utility functions I need for the server


// returns n unique id from 1-50
export function randomIndexes(n) {
  const indexes = [];
  while (indexes.length < n) {
    const index = Math.floor(Math.random() * 50) + 1;
    if (!indexes.includes(index)) {
      indexes.push(index);
    }
  }
  return indexes;
}

export function sortCardsByLuckIndex(cards) {
  return cards.sort((a, b) => a.getLuckIndex() - b.getLuckIndex());
}