import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function StatCard({ title, value, color }) {
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
  Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  }).start();
}, [value, scale]);

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color }]}>{value}%</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#121a24",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    color: "#aaa",
    fontSize: 12,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
  },
});