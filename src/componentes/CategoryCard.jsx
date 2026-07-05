// Acceso a categoría: círculo con ícono + nombre. Se usa en la fila de la Home.

import { Pressable, View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../styles/colors";
import { radius } from "../styles/globalStyles";

export default function CategoryCard({ categoria, onPress }) {
  return (
    <Pressable style={styles.contenedor} onPress={onPress}>
      <View style={styles.circulo}>
        <MaterialCommunityIcons name={categoria.icono} size={22} color={colors.textoSecundario} />
      </View>
      <Text style={styles.etiqueta} numberOfLines={2}>
        {categoria.nombre}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contenedor: { alignItems: "center", gap: 6, width: 74 },
  circulo: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.superficie,
    borderWidth: 1,
    borderColor: colors.bordeFuerte,
    alignItems: "center",
    justifyContent: "center",
  },
  // width 100% + textAlign center evita que Android recorte la última letra.
  etiqueta: { width: "100%", fontSize: 11, color: colors.textoSecundario, textAlign: "center" },
});
