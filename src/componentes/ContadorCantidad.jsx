// Control de cantidad (− valor +). Reutilizable en carrito y detalle.

import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../styles/colors";
import { radius } from "../styles/globalStyles";

export default function ContadorCantidad({ valor, onMas, onMenos, tamano = "md" }) {
  const dim = tamano === "sm" ? 26 : 32;
  return (
    <View style={styles.fila}>
      <Pressable onPress={onMenos} style={[styles.btn, { width: dim, height: dim }]} hitSlop={6}>
        <Ionicons name="remove" size={16} color={colors.textoPrimario} />
      </Pressable>
      <Text style={styles.valor}>{valor}</Text>
      <Pressable onPress={onMas} style={[styles.btn, { width: dim, height: dim }]} hitSlop={6}>
        <Ionicons name="add" size={16} color={colors.textoPrimario} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  fila: { flexDirection: "row", alignItems: "center", gap: 12 },
  btn: {
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.bordeFuerte,
    backgroundColor: colors.superficie,
    alignItems: "center",
    justifyContent: "center",
  },
  valor: { fontSize: 15, fontWeight: "700", color: colors.textoPrimario, minWidth: 18, textAlign: "center" },
});
