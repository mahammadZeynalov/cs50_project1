import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Vibration } from 'react-native';

const formatNumber = number => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function App() {

  const [remainingSecs, setRemainingSecs] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [session, setSession] = useState('Work');
  const { mins, secs } = getRemaining(remainingSecs);

  const toggle = () => {
    setIsActive(!isActive);
  }

  useEffect(() => {
    if (!remainingSecs) {
      Vibration.vibrate([500, 500, 500])
      if (session === 'Work') {
        setSession('Break');
        setRemainingSecs(300);
      } else {
        setSession('Work');
        setRemainingSecs(1500)
      }
    }
  }, [remainingSecs])

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
    setRemainingSecs(1500)
    setIsActive(false);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.sessionText}>{session}</Text>
      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      <View style = {styles.buttonGroup}>
      <Button onPress={toggle} title={isActive ? 'Pause' : 'Start'} color='#B83B5E' />
      <Button onPress={reset} title='Reset' color='#6a2c70' />
      </View>
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  timerText: {
    color: '#EF8A5D',
    fontSize: 90,
    marginBottom: 20
  },
  sessionText: {
    fontSize: 35,
    color: '#6a2c70'
  }
});
