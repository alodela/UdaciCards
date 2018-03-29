import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

const DeckItem = ({ title, questions }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subTitle}>{questions} cards</Text>
  </View>
)

const styles = StyleSheet.create({
  item: {
    paddingTop: 50,
    paddingBottom: 50,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
  },
  subTitle: {
    fontSize: 15,
    color: 'gray',
  }
})

export default DeckItem