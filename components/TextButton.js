import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const TextButton = ({ disabled, children, onPress, style = {} }) => {
  return (
    <TouchableOpacity disabled={disabled} style={{margin: 15}} onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: 'black',
    padding: 20,
    borderRadius: 7,
    borderColor: 'black',
    borderWidth: 1,
    overflow: 'hidden',
  }
})

export default TextButton