import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function SocialGraph({ data }) {
  const social = data.filter((d) => d.type === "social");

  const labels = social.map((_, i) => `D${i + 1}`);

  const followers = social.map((d) =>
    parseInt(d.data.Followers || 0)
  );
  const likes = social.map((d) =>
    parseInt(d.data.Likes || 0)
  );
  const views = social.map((d) =>
    parseInt(d.data.Views || 0)
  );

  return (
    <View style={{ backgroundColor: "#121a24", borderRadius: 12 }}>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: followers,
              color: () => "#3a86ff",
            },
            {
              data: likes,
              color: () => "#ff006e",
            },
            {
              data: views,
              color: () => "#8338ec",
            },
          ],
          legend: ["Followers", "Likes", "Views"],
        }}
        width={screenWidth - 30}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#121a24",
          backgroundGradientTo: "#121a24",
          color: () => "#00ffc8",
          labelColor: () => "#aaa",
        }}
        bezier
      />
    </View>
  );
}