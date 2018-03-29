export const LOAD_DECKS_SUCCESS = 'LOAD_DECKS_SUCCESS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function loadDecksSuccess (decks) {
  return {
    type: LOAD_DECKS_SUCCESS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function addCard (title, card) {
  return {
    type: ADD_CARD,
    title,
    card
  }
}