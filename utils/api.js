import { AsyncStorage } from 'react-native'
import { UDACICARDS_STORAGE_KEY } from './_decks'

// return all of the decks along with their titles, questions, and answers.
export function getDecks() {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then(data => JSON.parse(data) || {})
    .catch(err => {
      console.log("Error reading data from local storage")
      return {}
    })
}

// take in a single id argument and return the deck associated with that id.
export function getDeck(title) {
  return getDecks()
    .then(decks => decks[title])
    .catch(err => {
      console.log(`Error reading title ${title}`)
      return {}
    })
}

// take in a single title argument and add it to the decks.
export function saveDeckTitle(title) {
  return AsyncStorage
    .mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
      [title]: { title, questions: [] }
    }))
    .catch(err => console.log("Error saving title", err))
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export function addCardToDeck(title, card) {
  return getDeck(title)
    .then(deck => {
      return AsyncStorage
        .mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
          [title]: {
            title, questions: [
              ...deck.questions,
              card
            ]
          }
        }))
        .catch(err => console.log("Error saving title", err))
    })
}