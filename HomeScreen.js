import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { analyzeData } from "../utils/analytics";

import StatCard from "../components/StatCard";
import InsightCard from "../components/InsightCard";
import SocialGraph from "../components/SocialGraph";
import FloatingButton from "../components/FloatingButton";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [insights, setInsights] = useState([]);

  const [stats, setStats] = useState({
    business: 0,
    finance: 0,
    project: 0,
    social: 0,
  });

  /* LOAD DATA */
  const loadData = async () => {
    const stored = await AsyncStorage.getItem("xamin_data");

    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed);

      const result = analyzeData(parsed);
      setStats(result.stats);
      setInsights(result.insights);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>

        <Text style={styles.header}>XAMIN</Text>
        <Text style={styles.sub}>Live Business Intelligence</Text>

        {/* STAT CARDS */}
        <View style={styles.grid}>
          <StatCard title="Business" value={stats.business} color="#00ffc8" change={10} />
          <StatCard title="Finance" value={stats.finance} color="#ffb703" change={-5} />
          <StatCard title="Project" value={stats.project} color="#8ac926" change={12} />
          <StatCard title="Social" value={stats.social} color="#c77dff" change={8} />
        </View>

        {/* GRAPH */}
        <Text style={styles.section}>
  Social Media Growth (Followers / Likes / Views)
</Text>
        <SocialGraph data={data} />

        {/* INSIGHTS */}
        <Text style={styles.section}>Insights</Text>

        {insights.length === 0 ? (
          <InsightCard text="No risks detected" color="#00ffc8" />
        ) : (
          insights.map((i, index) => (
            <InsightCard key={index} text={i} color="#ffb703" />
          ))
        )}

      </ScrollView>

      <FloatingButton />
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
    fontSize: 28,
    fontWeight: "bold",
  },
  sub: {
    color: "#aaa",
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  section: {
    color: "#00ffc8",
    marginTop: 20,
    marginBottom: 10,
  },
});