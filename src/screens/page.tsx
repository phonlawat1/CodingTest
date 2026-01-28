import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type Props = {};

function Page({}: Props) {

  return (
    <View style={[styles.container]}>
      <Text style={[styles.text]}>
        Page Component
      </Text>
      <Text style={[styles.subText]}>
        Welcome to your new screen!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#4B5563',
  },
});

export default Page;
