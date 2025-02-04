import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Para los iconos

const Card = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("https://wisemed-interview.s3.us-east-2.amazonaws.com/react-native/emergency-kinds.json");
        const data = await response.json();
        setOptions(data["emergencyKinds"]);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  return (
    < >
      {/* Tarjeta de información */}
      <View style={styles.card}>
        {/* Encabezado azul */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Traumatología</Text>
          <Text style={styles.headerSubtitle}>Dr. José Pedro Sans</Text>
          <MaterialIcons name="medical-services" size={20} color="#fff" style={styles.icon} />
        </View>

        {/* Información del paciente */}
        <View style={styles.content}>
          <Text style={styles.name}>👤 Jorge Avendaño Pérez</Text>
          <Text style={styles.age}>35 años</Text>

          <Text style={styles.label}><Text style={styles.bold}>Ficha médica:</Text> 77884</Text>
          <Text style={styles.label}><Text style={styles.blue}>Diagnóstico:</Text> Calcificación Talón</Text>
          <Text style={styles.label}><Text style={styles.blue}>Intervención:</Text> Extirpación en talón</Text>
          <Text style={styles.label}><Text style={styles.blue}>Evaluación preanestésica:</Text> Sí</Text>
          <Text style={styles.label}><Text style={styles.blue}>Tiempo de solicitud:</Text> 3 días</Text>
          <Text style={styles.label}><Text style={styles.blue}>Suspensiones:</Text> 2</Text>
        </View>

        {/* Dropdown Tipo de Urgencia */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Tipo de Urgencia</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(!open)}>
            <Text style={styles.dropdownText}>{selected || "Seleccionar"}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#007bff" />
          </TouchableOpacity>

          {loading && <ActivityIndicator size="small" color="#007bff" />}
          {open && (
            <View style={styles.dropdownList}>
              <FlatList
                data={options}
            
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.option} onPress={() => { setSelected(item.name); setOpen(false); }}>
                    <Text style={styles.optionText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    width: 320,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#1956B6",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  headerSubtitle: {
    color: "#fff",
    fontSize: 14,
  },
  icon: {
    marginLeft: 10,
  },
  content: {
    padding: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  age: {
    fontSize: 14,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
  blue: {
    color: "#1956B6",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  dropdownContainer: {
    padding: 15,
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1956B6",
    marginBottom: 5,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#1956B6",
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 14,
    color: "#555",
  },
  dropdownList: {
    marginTop: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "ddd",
  },
  optionText: {
    fontSize: 14,
    color: "black",
  },
});

export default Card;
