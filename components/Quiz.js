import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    progress: 0,
    correctAnswers: 0,
    completed: false,
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  showNextQuestion() {
    const { progress } = this.state
    const { deck } = this.props

    if (progress === deck.questions.length - 1 ) {
      this.setState({
        completed: true
      })
      // Clear notification
      clearLocalNotification()
        .then(setLocalNotification)
    } else {
      this.setState({
        progress: progress + 1
      })
    }
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  markAsCorrect = () => {
    const { correctAnswers } = this.state

    this.setState({
      correctAnswers: correctAnswers + 1
    })

    this.showNextQuestion()
  }

  markAsIncorrect = () => {
    this.showNextQuestion()
  }

  restart = () => {
    this.setState({
      progress: 0,
      correctAnswers: 0,
      completed: false,
    })
  }

  backToDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  renderCard(question, answer) {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    return (
      <View style={styles.container}>
        <View style={{flex: 2}}>
          <Animated.View style={[styles.card, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
            <View style={styles.cardFace}>
              <Text style={styles.cardTitle}>
                {question}
              </Text>
              <TouchableOpacity style={styles.flipCardButton} onPress={this.flipCard}>
                <Text style={styles.flipCardText}>Answer</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.card, styles.cardBack, {opacity: this.backOpacity}]}>
            <View style={styles.cardFace}>
              <Text style={styles.cardTitle}>
                {answer}
              </Text>
              <TouchableOpacity style={styles.flipCardButton} onPress={this.flipCard}>
                <Text style={styles.flipCardText}>Question</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
        <View style={{flex:1}}>
          <TextButton style={[styles.button, styles.correctButton]} onPress={this.markAsCorrect}>
            Correct
          </TextButton>
          <TextButton style={[styles.button, styles.incorrectButton]} onPress={this.markAsIncorrect}>
            Incorrect
          </TextButton>
        </View>
      </View>
    )
  }

  renderResults() {
    const { progress, correctAnswers } = this.state
    const result = Math.round(correctAnswers / (progress + 1) * 100)

    return (
      <View style={{flex: 1}}>
        <View style={[styles.cardFace, {flex: 2}]}>
          <Text style={styles.cardTitle}>Your got {result}% answers correct!</Text>
        </View>
        <View style={{flex:1}}>
          <TextButton style={styles.button} onPress={this.restart}>
            Restart Quiz
          </TextButton>
          <TextButton style={styles.button} onPress={this.backToDeck}>
            Back to Deck
          </TextButton>
        </View>
      </View>
    )
  }

  render() {
    const { progress, completed } = this.state
    const { question, answer } = this.props.deck.questions[progress]
    const total = this.props.deck.questions.length

    return (
      <View style={styles.container}>
        <Text style={styles.progress}>{progress + 1}/{total}</Text>
        {!completed ?
          this.renderCard(question, answer)
        :
          this.renderResults()
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    position: 'absolute',
    left: 10,
    top: 10,
    right: 10,
    bottom: 10,
    backfaceVisibility: 'hidden',
  },
  cardFace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  cardTitle: {
    fontSize: 50,
    textAlign: 'center',
  },
  flipCardButton: {
    height: 20,
  },
  flipCardText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
  correctButton: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  incorrectButton: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  button: {
    fontSize: 15,
    color: 'white',
    backgroundColor: 'black',
  },
  progress: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
})

function mapStateToProps (state, { navigation }) {
  const { deck } = navigation.state.params

  return {
    deck
  }
}

export default connect(
  mapStateToProps,
)(Quiz)