import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { loadDecksSuccess } from '../actions'
import DeckItem from './DeckItem';


class DeckList extends Component {
  constructor () {
    super()
    this.springValues = []
  }

  componentDidMount () {
    const { dispatch } = this.props

    getDecks()
      .then(decks => dispatch(loadDecksSuccess(decks)))
      .catch(err => console.log("Error loading decks", err))
  }

  componentWillUpdate(nextProps) {
    const { decks } = nextProps

    Object.keys(decks).map((title) => {
      if (this.springValues[title]) {
        this.springValues[title].setValue(1)
      } else {
        this.springValues[title] = new Animated.Value(1)
      }
    })
  }

  showDeckDetail = (title) => {
    this.springValues[title].setValue(0.3)
    Animated.spring(
      this.springValues[title],
      {
        toValue: 1,
        friction: 6
      }
    ).start(() => {
      this.props.navigation.navigate(
        'DeckDetail',
        { title }
      )
    })
  }

  render() {
    const { decks } = this.props

    return (
      <ScrollView>
        {Object.keys(decks).map((title) => {
          const { questions = {} } = decks[title]

          return (
            <Animated.View
              key={title}
              style={{transform: [{scale: this.springValues[title]}]}} >

              <TouchableOpacity
                onPress={() => this.showDeckDetail(title)} >
                <DeckItem title={title} questions={Object.keys(questions).length} />
              </TouchableOpacity>
            </Animated.View>
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckList)