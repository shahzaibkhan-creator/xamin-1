import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function InsightCard({ text, color }) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={{ color }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#121a24",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
});