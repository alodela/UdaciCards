import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { generateId } from '../utils/helpers'
import { saveDeckTitle } from '../utils/api'
import { newDecksSuccess, addDeck } from '../actions'
import TextButton from './TextButton'

class AddDeck extends Component {

  state = {
    title: ''
  }

  handleTitle = (text) => {
    this.setState({ title: text })
  }

  submitDeck = () => {
    const { title } = this.state

    if (!title) {
      alert("Please enter a title")
      return
    }

    this.props.dispatch(addDeck({
      [title]: { title, questions: [] }
    }))

    this.setState({ title: '' })

    this.toHome()

    saveDeckTitle(title)
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
  }

  render () {
    const { title } = this.state

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>
            What is the title of your new deck?
          </Text>
          <TextInput
            style = {styles.input}
            placeholder = 'Deck Title'
            onChangeText = {this.handleTitle}
            value = {title}
          />
        </View>
        <View style={styles.footer}>
          <TextButton style={styles.submitButton} onPress={this.submitDeck}>Submit</TextButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 50,
    textAlign: 'center',
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

export default connect()(AddDeck)