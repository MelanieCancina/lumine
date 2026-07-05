// Botón principal reutilizable (CTA). Variantes de color y opción de ícono.

import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../styles/colors";
import { radius } from "../styles/globalStyles";

export default function CustomButtom({ texto, onPress, icono, variante = "oscuro", estilo }) {
  const fondo = variante === "terracota" ? colors.terracota : colors.oscuro;
  return (
    <Pressable style={[styles.btn, { backgroundColor: fondo }, estilo]} onPress={onPress}>
      {icono ? <Ionicons name={icono} size={18} color={colors.blanco} /> : null}
      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: radius.pill,
  },
  texto: { color: colors.blanco, fontSize: 14, fontWeight: "700" },
});
