// Encabezado de marca de la Home: logo LUMINE + buscador + carrito con contador.

import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../styles/colors";
import { spacing } from "../styles/globalStyles";

export default function Header({ onBuscar, onCarrito, cantidad = 0 }) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>LUMINE</Text>
      <View style={styles.iconos}>
        <Pressable onPress={onBuscar} hitSlop={8}>
          <Ionicons name="search" size={22} color={colors.textoPrimario} />
        </Pressable>
        <Pressable onPress={onCarrito} hitSlop={8}>
          <Ionicons name="bag-handle-outline" size={22} color={colors.textoPrimario} />
          {cantidad > 0 ? (
            <View style={styles.contador}>
              <Text style={styles.contadorTexto}>{cantidad}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  logo: { fontSize: 22, letterSpacing: 4, fontWeight: "700", color: colors.textoPrimario },
  iconos: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  contador: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: colors.terracota,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  contadorTexto: { color: colors.blanco, fontSize: 9, fontWeight: "700" },
});
