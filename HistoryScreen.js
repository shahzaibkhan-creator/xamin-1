import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sharing from "expo-sharing";

import { generatePDF } from "../utils/reportGenerator";

export default function HistoryScreen() {
  const [data, setData] = useState([]);

  /* LOAD DATA */
  useEffect(() => {
    const loadData = async () => {
      const stored = await AsyncStorage.getItem("xamin_data");
      if (stored) {
        setData(JSON.parse(stored).reverse());
      }
    };

    loadData();
  }, []);

  /* EXPORT REPORT */
  const exportReport = async () => {
    const stored = await AsyncStorage.getItem("xamin_data");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const fileUri = await generatePDF(parsed);

    await Sharing.shareAsync(fileUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>

      {/* EXPORT BUTTON */}
      <Text style={styles.export} onPress={exportReport}>
        📄 Export Report
      </Text>

      <ScrollView>
        {data.length === 0 ? (
          <Text style={styles.empty}>No data yet</Text>
        ) : (
          data.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.type}>
                {item.type.toUpperCase()}
              </Text>

              <Text style={styles.date}>
                {new Date(item.date).toLocaleString()}
              </Text>

              {Object.keys(item.data).map((key) => (
                <Text key={key} style={styles.data}>
                  {key}: {item.data[key]}
                </Text>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
    padding: 15,
  },
  header: {
    color: "#00ffc8",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  export: {
    color: "#00ffc8",
    marginBottom: 15,
    fontSize: 16,
  },
  empty: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 50,
  },
  card: {
    backgroundColor: "#121a24",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  type: {
    color: "#00ffc8",
    fontWeight: "bold",
  },
  date: {
    color: "#888",
    fontSize: 12,
    marginBottom: 5,
  },
  data: {
    color: "#fff",
  },
});