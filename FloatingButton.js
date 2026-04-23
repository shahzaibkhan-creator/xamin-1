import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  View,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FloatingButton() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const [inputs, setInputs] = useState({});

  /* FIELD CONFIG */
  const fields = {
    social: ["Followers", "Likes", "Views"],
    finance: ["Revenue", "Expenses", "Profit"],
    business: ["Sales", "Customers", "Growth"],
    project: ["Tasks", "Completed", "Progress"],
  };

  /* SAVE DATA */
  const saveData = async () => {
    const newEntry = {
      type: selected,
      date: new Date().toISOString(),
      data: inputs,
    };

    const existing = await AsyncStorage.getItem("xamin_data");
    const parsed = existing ? JSON.parse(existing) : [];

    parsed.push(newEntry);

    await AsyncStorage.setItem("xamin_data", JSON.stringify(parsed));

    setVisible(false);
    setSelected(null);
    setInputs({});
  };

  return (
    <>
      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>

            {!selected ? (
              <>
                <Text style={styles.title}>Select Category</Text>

                <View style={styles.grid}>
                  {Object.keys(fields).map((key) => (
                    <TouchableOpacity
                      key={key}
                      style={styles.card}
                      onPress={() => setSelected(key)}
                    >
                      <Text style={styles.cardText}>
                        {key.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              <>
                <Text style={styles.title}>
                  {selected.toUpperCase()} INPUT
                </Text>

                {fields[selected].map((field) => (
                  <TextInput
                    key={field}
                    placeholder={field}
                    placeholderTextColor="#555"
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(t) =>
                      setInputs({ ...inputs, [field]: t })
                    }
                  />
                ))}

                <TouchableOpacity style={styles.saveBtn} onPress={saveData}>
                  <Text style={{ color: "#000" }}>Save</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
  onPress={() => {
    setVisible(false);
    setSelected(null);
    setInputs({});
  }}
>
              <Text style={styles.close}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#00ffc8",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    fontSize: 30,
    color: "#000",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#121a24",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    color: "#00ffc8",
    marginBottom: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#0b0f14",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  cardText: {
    color: "#fff",
  },

  input: {
    backgroundColor: "#0b0f14",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  saveBtn: {
    backgroundColor: "#00ffc8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  close: {
    color: "#ff006e",
    textAlign: "center",
    marginTop: 10,
  },
});