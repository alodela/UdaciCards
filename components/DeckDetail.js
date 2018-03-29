import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Deck Detail',
    }
  }

  addCard = () => {
    const { title } = this.props.navigation.state.params

    this.props.navigation.navigate(
      'AddCard',
      { title }
    )
  }

  startQuiz = () => {
    this.props.navigation.navigate(
      'Quiz',
      { deck: this.props.deck }
    )
  }

  render() {
    const { title, questions = {} } = this.props.deck

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{Object.keys(questions).length} cards</Text>
        </View>
        <View style={{flex:1}}>
          <TextButton
            style={styles.addCardButton}
            onPress={this.addCard}>
            Add Card
          </TextButton>
          <TextButton
            style={styles.quizButton}
            onPress={this.startQuiz}
            disabled={questions.length === 0} >
            Start Quiz
          </TextButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  details: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',
  },
  quizButton: {
    fontSize: 15,
    color: 'white',
    backgroundColor: 'black',
  },
  addCardButton: {
    fontSize: 15,
  },
})

function mapStateToProps (state, { navigation }) {
  const { title } = navigation.state.params

  return {
    title,
    deck: state[title]
  }
}

export default connect(
  mapStateToProps,
)(DeckDetail)