import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const screen = Dimensions.get('window');
const formatNumber = number => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function App() {

  const [remainingSecs, setRemainingSecs] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);

  const toggle = () => {
    setIsActive(!isActive);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs - 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs])

  const reset = () => {
    setRemainingSecs(0);
    setIsActive(false);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 10,
    borderColor: 'blue',
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 45,
    color: 'red'
  },
  timerText: {
    color: 'green',
    fontSize: 90,
    marginBottom: 20
  }
});
