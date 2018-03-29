import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import TextButton from './TextButton'

class AddCard extends Component {

  state = {
    question: '',
    answer: '',
  }

  submitCard = () => {
    const { title } = this.props.navigation.state.params
    const card = this.state

    if (!card.question || !card.answer) {
      alert("Please enter a valid question and answer")
      return
    }

    this.props.dispatch(addCard(title, card))

    this.setState({ question: '', answer: '' })

    this.props.navigation.dispatch(NavigationActions.back())

    addCardToDeck(title, card)
  }

  handleQuestion = (text) => {
    this.setState({ question: text })
  }

  handleAnswer = (text) => {
    this.setState({ answer: text })
  }

  render () {
      const { question, answer } = this.state

      return (
        <View style={styles.container}>
          <View>
            <TextInput
              value={question}
              style = {styles.input}
              placeholder = 'Question'
              onChangeText = {this.handleQuestion}
            />
            <TextInput
              value={answer}
              style = {styles.input}
              placeholder = 'Answer'
              onChangeText = {this.handleAnswer}
            />
          </View>
          <View style={styles.footer}>
            <TextButton style={styles.submitButton} onPress={this.submitCard}>Submit</TextButton>
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    margin: 15,
    height: 40,
    marginTop: 30,
    borderRadius: 7,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 2,
    paddingRight: 2,
  },
  footer: {
    height: 100,
  },
  submitButton: {
    fontSize: 15,
    backgroundColor: 'black',
    color: 'white'
  }
})

export default connect()(AddCard)